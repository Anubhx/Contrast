import { chromium, Browser } from 'playwright';

export async function connectToBrowserless(retries = 1): Promise<Browser> {
  const token = process.env.BROWSERLESS_API_KEY;
  
  if (!token) {
    throw new Error('BROWSERLESS_API_KEY is missing in environment variables.');
  }

  const endpointURL = `wss://chrome.browserless.io?token=${token}`;

  try {
    const browser = await chromium.connectOverCDP(endpointURL);
    return browser;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Browserless connection failed. Retrying... (${retries} attempts left)`);
      // Brief delay before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      return connectToBrowserless(retries - 1);
    }
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to connect to Browserless after retries: ${msg}`);
  }
}
