import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

async function run() {
  console.log("Starting Playwright...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const url = "https://example.com";
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

  console.log("Running Axe-core...");
  const results = await new AxeBuilder({ page }).analyze();
  
  const issues: any[] = [];
  results.violations.forEach(v => {
    v.nodes.forEach(node => {
      let category = 'typography';
      if (v.id.includes('contrast')) category = 'contrast';
      else if (v.id.includes('alt')) category = 'altText';
      
      issues.push({
        id: v.id,
        category,
        severity: v.impact,
        message: v.help,
        element: node.html
      });
    });
  });

  await browser.close();

  console.log("\n--- Axe-core Violations ---");
  console.log(`Found ${issues.length} issues.`);
  console.log(issues);
}

run().catch(console.error);
