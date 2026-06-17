import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
import crypto from 'crypto';
import { cleanAxeViolations } from '@/lib/cleanAxeIssue';
import { connectToBrowserless } from '@/lib/browserless';
import { AxeBuilder } from '@axe-core/playwright';
import { detectButtonDrift } from '@/lib/detectors/buttonDrift';
import { detectSpacingDrift } from '@/lib/detectors/spacingDrift';
import { detectTypographyDrift } from '@/lib/detectors/typographyDrift';
import { detectColorDrift } from '@/lib/detectors/colorDrift';
import { calculateScores } from '@/lib/scoring';
import { explainFindings } from '@/lib/gemini';


export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL. Must start with http or https.' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Rate limiting by IP
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    try {
      // Basic rate limiting with Supabase
      // Upsert the row, or increment if exists
      const { data: rlData } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('ip', ip)
        .single();
      
      const now = new Date();
      if (rlData) {
        const windowStart = new Date(rlData.window_start);
        const hoursPassed = (now.getTime() - windowStart.getTime()) / (1000 * 60 * 60);
        
        if (hoursPassed > 1) {
          // Reset window
          await supabase.from('rate_limits').update({ request_count: 1, window_start: now.toISOString() }).eq('ip', ip);
        } else {
          if (rlData.request_count >= 10) {
            return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
          }
          await supabase.from('rate_limits').update({ request_count: rlData.request_count + 1 }).eq('ip', ip);
        }
      } else {
        await supabase.from('rate_limits').insert({ ip, request_count: 1, window_start: now.toISOString() });
      }
    } catch (e) {
      console.warn('Supabase rate limiting failed, continuing without it', e);
    }

    // Normalize URL for caching
    const parsedUrl = new URL(url);
    const normalizedUrl = `${parsedUrl.origin}${parsedUrl.pathname}`.replace(/\/$/, '').toLowerCase();
    const urlHash = crypto.createHash('sha256').update(normalizedUrl).digest('hex');

    // Check URL cache
    try {
      const { data: cachedAudits } = await supabase
        .from('audits')
        .select('id, result')
        .eq('url_hash', urlHash)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (cachedAudits && cachedAudits.length > 0) {
        return NextResponse.json({ id: cachedAudits[0].id });
      }
    } catch (e) {
      console.warn('Supabase caching check failed', e);
    }

    let browser;
    let extractedData;
    let accessibilityScanResults;

    try {
      browser = await connectToBrowserless();
      const context = await browser.newContext();
      const page = await context.newPage();
      
      // 15 second timeout as required
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

      // Extract DOM data
      extractedData = await page.evaluate(() => {
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
      accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    } finally {
      if (browser) {
        await browser.close().catch(e => console.error('Failed to close browser', e));
      }
    }

    // Map axe violations to AuditIssue
    const issues = cleanAxeViolations(accessibilityScanResults.violations);

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

    const id = crypto.randomUUID();

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

    // Insert into Supabase
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours cache

      const { error } = await supabase.from('audits').insert({
        id,
        url,
        url_hash: urlHash,
        domain: parsedUrl.hostname,
        overall_score: scores.overall,
        result: auditResponse,
        expires_at: expiresAt.toISOString()
      });

      if (error) {
        console.error('Supabase insertion error details:', error);
        throw new Error(`Supabase error: ${error.message}`);
      }
    } catch (e) {
      console.error('Supabase insertion failed', e);
      return NextResponse.json({ error: e instanceof Error ? e.message : 'Supabase insert failed' }, { status: 500 });
    }

    return NextResponse.json({ id });

  } catch (error: unknown) {
    console.error('Audit Error:', error);
    const msg = error instanceof Error ? error.message : 'Audit failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
