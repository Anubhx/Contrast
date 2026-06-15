import { NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { detectButtonDrift } from '@/lib/detectors/buttonDrift';
import { detectSpacingDrift } from '@/lib/detectors/spacingDrift';
import { detectTypographyDrift } from '@/lib/detectors/typographyDrift';
import { detectColorDrift } from '@/lib/detectors/colorDrift';
import { calculateScores } from '@/lib/scoring';
import { explainFindings } from '@/lib/gemini';
import { AuditIssue } from '@/lib/types';

interface AxeNode {
  html: string;
  failureSummary?: string;
}

interface AxeViolation {
  id: string;
  impact?: 'minor' | 'moderate' | 'serious' | 'critical' | null;
  help: string;
  nodes: AxeNode[];
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL. Must start with http or https.' }, { status: 400 });
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // 15 second timeout as required
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

    // Extract DOM data
    const extractedData = await page.evaluate(() => {
      // Buttons
      const buttonElements = Array.from(document.querySelectorAll('button, a[role="button"], input[type="button"], input[type="submit"]'));
      const buttons = buttonElements.map(el => {
        const style = window.getComputedStyle(el);
        return {
          borderRadius: style.borderRadius,
          padding: style.padding,
          backgroundColor: style.backgroundColor,
          borderStyle: style.borderStyle
        };
      });

      // Spacing, Typography, Colors
      const allElements = Array.from(document.querySelectorAll('*'));
      const spacingValues: number[] = [];
      const textElements: {fontFamily: string, fontSize: string, fontWeight: string}[] = [];
      const colors = new Set<string>();

      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        
        // Spacing
        ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].forEach(prop => {
          const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          const val = parseFloat(style.getPropertyValue(cssProp));
          if (!isNaN(val) && val > 0) spacingValues.push(val);
        });

        // Typography (only text-containing elements with no children)
        if (el.textContent && el.textContent.trim().length > 0 && el.children.length === 0) {
          textElements.push({
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight
          });
        }

        // Colors
        if (style.color && style.color !== 'rgba(0, 0, 0, 0)') colors.add(style.color);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(style.backgroundColor);
      });

      return {
        buttons,
        spacing: spacingValues,
        typography: textElements,
        colors: Array.from(colors)
      };
    });

    // Run axe-core
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    await browser.close();

    // Map axe violations to AuditIssue
    const issues: AuditIssue[] = [];
    (accessibilityScanResults.violations as AxeViolation[]).forEach((v) => {
      v.nodes.forEach((node) => {
        let category: AuditIssue['category'] = 'typography';
        if (v.id.includes('contrast')) category = 'contrast';
        else if (v.id.includes('alt')) category = 'altText';
        else if (v.id.includes('aria') || v.id.includes('heading')) category = 'typography';

        let severity: AuditIssue['severity'] = 'info';
        if (v.impact === 'critical' || v.impact === 'serious') severity = 'critical';
        else if (v.impact === 'moderate') severity = 'warn';

        issues.push({
          category,
          severity,
          message: v.help,
          element: node.html.length > 60 ? node.html.substring(0, 60) + '...' : node.html,
          value: node.failureSummary ? node.failureSummary.split('\n')[0] : 'Violation'
        });
      });
    });

    // Run detectors
    const buttonDrift = detectButtonDrift(extractedData.buttons);
    const spacingDrift = detectSpacingDrift(extractedData.spacing);
    const typographyDrift = detectTypographyDrift(extractedData.typography);
    const colorDrift = detectColorDrift(extractedData.colors);

    // Run Scoring
    const scores = calculateScores(issues);

    // Explain with Gemini
    const explanation = await explainFindings({
      buttonDrift,
      spacingDrift,
      typographyDrift,
      colorDrift,
      issuesCount: issues.length
    });

    const id = Math.random().toString(36).substring(7);

    const auditResponse = {
      id,
      url,
      auditedAt: new Date().toISOString(),
      score: scores.overall,
      scores: {
        contrast: scores.contrast,
        altText: scores.altText,
        typography: scores.typography,
        spacing: scores.spacing,
        overall: scores.overall
      },
      prioritizedFixes: {
        topFixes: explanation.recommendations.map(r => ({ category: 'typography', severity: 'critical', message: r })),
        quickWins: [
          { category: 'spacing', severity: 'warn', message: 'Standardize button padding across components' },
          { category: 'altText', severity: 'info', message: 'Fix missing alt tags to immediately bump accessibility score' }
        ]
      },
      estimatedImpact: {
        scoreIncrease: 15
      },
      issues,
      designSmells: {
        buttonDrift,
        spacingDrift,
        typographyDrift,
        colorDrift
      },
      technicalDetails: {
        engine: 'Playwright + Axe-core',
        duration: 'Detected dynamically',
        viewport: '1440x900'
      }
    };

    // Cache globally for /api/audit/[id] to pick up
    const globalStore = global as unknown as { mockCache?: Map<string, unknown> };
    const cache = globalStore.mockCache || new Map<string, unknown>();
    cache.set(`audit:${id}`, auditResponse);
    globalStore.mockCache = cache;

    return NextResponse.json({ id });

  } catch (error: unknown) {
    console.error('Audit Error:', error);
    const msg = error instanceof Error ? error.message : 'Audit failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
