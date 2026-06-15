import { GoogleGenAI } from '@google/genai';

export interface GeminiResponse {
  summary: string;
  recommendations: string[];
  designerInsights: string[];
}

export async function explainFindings(auditData: Record<string, unknown>): Promise<GeminiResponse> {
  const fallbackResponse: GeminiResponse = {
    summary: "The automated audit detected several accessibility and design consistency issues that impact the overall user experience.",
    recommendations: [
      "Address contrast violations to improve legibility for visually impaired users.",
      "Fix missing alt text to ensure screen readers can navigate images.",
      "Consolidate typography, color, and button styles to enforce design system consistency.",
      "Check the DOM layout for missing landmarks and correct spacing rhythm."
    ],
    designerInsights: [
      "Multiple color and button variants suggest a deviation from the core design tokens. Unifying these will create a more cohesive brand experience.",
      "Inconsistent spacing throws off the vertical rhythm. Sticking to a strict 8px grid will tighten the layout."
    ]
  };

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.warn("No GOOGLE_GENERATIVE_AI_API_KEY found, using fallback explanation.");
    return fallbackResponse;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
You are a Staff Product Designer. Explain the following design audit findings to a product designer.
Prioritize the fixes and describe the likely impact in clear, concise language.
Do NOT calculate scores or add new violations.

Audit Findings:
${JSON.stringify(auditData, null, 2)}

Return a strict JSON object with this exact structure:
{
  "summary": "2-3 sentences explaining the overall state.",
  "recommendations": ["string array of prioritized fixes"],
  "designerInsights": ["string array of insights regarding the design smells"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeminiResponse;
    }
    
    return fallbackResponse;
  } catch (error) {
    console.error("Gemini explanation failed, falling back:", error);
    return fallbackResponse;
  }
}
