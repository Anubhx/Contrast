import { chromium } from 'playwright';
import { detectButtonDrift } from './lib/detectors/buttonDrift';
import { detectSpacingDrift } from './lib/detectors/spacingDrift';
import { detectTypographyDrift } from './lib/detectors/typographyDrift';
import { detectColorDrift } from './lib/detectors/colorDrift';

async function run() {
  console.log("Starting Playwright...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const url = "https://example.com";
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

  console.log("Extracting CSS...");
  const extractedData = await page.evaluate(() => {
    // Buttons
    const buttonElements = Array.from(document.querySelectorAll('button, a[role="button"], input[type="button"], input[type="submit"], a'));
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
    const textElements: any[] = [];
    const colors = new Set<string>();

    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      
      ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].forEach(prop => {
        const val = parseFloat((style as any)[prop]);
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

  await browser.close();

  console.log("Running detectors...");
  const buttonDrift = detectButtonDrift(extractedData.buttons);
  const spacingDrift = detectSpacingDrift(extractedData.spacing);
  const typographyDrift = detectTypographyDrift(extractedData.typography);
  const colorDrift = detectColorDrift(extractedData.colors);

  console.log("\n--- Playwright Extraction Results ---");
  console.log("Button Drift:", buttonDrift);
  console.log("Spacing Drift:", spacingDrift);
  console.log("Typography Drift:", typographyDrift);
  console.log("Color Drift:", colorDrift);
}

run().catch(console.error);
