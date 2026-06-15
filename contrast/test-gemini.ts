import { explainFindings } from './lib/gemini';

async function run() {
  const dummyData = {
    buttonDrift: { variants: 5, severity: "high" },
    spacingDrift: { variants: 4, severity: "medium" },
    topFixes: []
  };

  console.log("--- Testing Fallback (No API Key) ---");
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = "";
  const fallback = await explainFindings(dummyData);
  console.log(fallback);

  console.log("\n--- Testing Gemini Response ---");
  // Assuming the user has not injected a real key in my shell environment, this might still fallback,
  // but if the user provides an environment variable, it will work. I'll test the fallback at least.
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = "fake-key-to-trigger-error-and-fallback";
  const errorFallback = await explainFindings(dummyData);
  console.log(errorFallback);
}

run().catch(console.error);
