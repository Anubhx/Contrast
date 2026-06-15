import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { detectButtonDrift } from './lib/detectors/buttonDrift';
import { detectSpacingDrift } from './lib/detectors/spacingDrift';
import { detectTypographyDrift } from './lib/detectors/typographyDrift';
import { detectColorDrift } from './lib/detectors/colorDrift';
import { calculateScores } from './lib/scoring';
import { explainFindings } from './lib/gemini';
import { AuditIssue } from './lib/types';

async function verifyAudit(url: string) {
  console.log(`\n\n============================================================`);
  console.log(`=== VERIFYING: ${url}`);
  console.log(`============================================================\n`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

  const extractedData = await page.evaluate(() => {
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

    const allElements = Array.from(document.querySelectorAll('*'));
    const spacingValues: number[] = [];
    const textElements: {fontFamily: string, fontSize: string, fontWeight: string}[] = [];
    const colors = new Set<string>();

    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].forEach(prop => {
        const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        const val = parseFloat(style.getPropertyValue(cssProp));
        if (!isNaN(val) && val > 0) spacingValues.push(val);
      });
      if (el.textContent && el.textContent.trim().length > 0 && el.children.length === 0) {
        textElements.push({
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight
        });
      }
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

  console.log('--- RAW PLAYWRIGHT EXTRACTION (truncated if > 100 items) ---');
  const d = { ...extractedData };
  d.spacing = d.spacing.slice(0, 5);
  d.typography = d.typography.slice(0, 5);
  console.log(JSON.stringify(d, null, 2));

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  await browser.close();

  console.log('\n--- RAW AXE-CORE OUTPUT (First 2 Violations) ---');
  console.log(JSON.stringify(accessibilityScanResults.violations.slice(0, 2), null, 2));

  const issues: AuditIssue[] = [];
  (accessibilityScanResults.violations as any[]).forEach((v) => {
    v.nodes.forEach((node: any) => {
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

  console.log('\n--- TRANSFORMED AUDIT ISSUES (First 3) ---');
  console.log(JSON.stringify(issues.slice(0, 3), null, 2));

  const buttonDrift = detectButtonDrift(extractedData.buttons);
  const spacingDrift = detectSpacingDrift(extractedData.spacing);
  const typographyDrift = detectTypographyDrift(extractedData.typography);
  const colorDrift = detectColorDrift(extractedData.colors);

  console.log('\n--- RAW DETECTOR OUTPUTS ---');
  console.log('buttonDrift:', JSON.stringify(buttonDrift, null, 2));
  console.log('spacingDrift:', JSON.stringify({...spacingDrift, offGridValues: spacingDrift.offGridValues.slice(0, 3)}, null, 2));
  console.log('typographyDrift:', JSON.stringify(typographyDrift, null, 2));
  console.log('colorDrift:', JSON.stringify(colorDrift, null, 2));

  const scores = calculateScores(issues);
  console.log('\n--- SCORING VERIFICATION ---');
  console.log(JSON.stringify(scores, null, 2));

  const auditDataForGemini = {
    buttonDrift,
    spacingDrift,
    typographyDrift,
    colorDrift,
    issuesCount: issues.length
  };

  console.log('\n--- GEMINI PROMPT INPUT OBJECT ---');
  console.log(JSON.stringify(auditDataForGemini, null, 2));

  const explanation = await explainFindings(auditDataForGemini);
  console.log('\n--- RAW GEMINI RESPONSE ---');
  console.log(JSON.stringify(explanation, null, 2));
}

async function main() {
  await verifyAudit('https://stripe.com');
  await verifyAudit('https://ycombinator.com'); // High chance of issues
}

main().catch(console.error);
