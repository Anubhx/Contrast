import { GoogleGenAI } from '@google/genai';

export interface GeminiFixItem {
  severity: 'critical' | 'warn';
  message: string;
  element: string;
  value?: string;
}

export interface GeminiResponse {
  topFixes: GeminiFixItem[];
  quickWins: GeminiFixItem[];
  estimatedScoreGain: number;
}

/**
 * Takes real axe violations and produces terse, selector-specific fixes.
 * Never invents issues — every fix must reference an actual violation node.
 */
export async function explainFindings(
  violations: Array<{
    id: string;
    impact?: string | null;
    help: string;
    nodes: Array<{ target?: string[]; failureSummary?: string; html?: string }>;
  }>
): Promise<GeminiResponse> {
  const fallback: GeminiResponse = { topFixes: [], quickWins: [], estimatedScoreGain: 0 };

  // If no violations, return empty — never pad with invented ones
  if (!violations || violations.length === 0) return fallback;

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.warn('No GOOGLE_GENERATIVE_AI_API_KEY — skipping Gemini explanation.');
    return fallback;
  }

  // Distill violations to the most useful shape for the prompt
  const topViolations = violations.slice(0, 10).map(v => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.slice(0, 3).map(n => ({
      selector: n.target?.[0] ?? n.html?.slice(0, 80) ?? null,
      failureSummary: n.failureSummary?.slice(0, 200) ?? null,
    })),
  }));

  const prompt = `You are a senior accessibility engineer writing an audit summary.
You have real axe-core violations below. Write at most 3 top fixes and at most 2 quick wins.

Rules:
- topFixes: impact === "critical" or "serious" only, max 3. If fewer real violations exist, return fewer — never pad.
- quickWins: impact === "moderate" or "minor" only, max 2.
- Every entry MUST use the exact selector from nodes[0].target[0]. No invented selectors.
- message format: "<what is broken> on <element description> — <fix action or measured value>". E.g.: "contrast ratio 2.1:1 on .cta-button — minimum 4.5:1 required"
- Do NOT write motivation ("to improve readability for low-vision users"). State facts only.
- estimatedScoreGain: integer 0–20. Base on: critical=5pts, serious=3pts, moderate=1pt, minor=0.5pt per violation, capped at 20.
- If topFixes or quickWins have zero real violations, return an empty array []. Never invent issues.

Violations:
${JSON.stringify(topViolations, null, 2)}

Return JSON only, no markdown, no prose. Follow this exact schema:
{
  "topFixes": [
    { "severity": "critical", "message": "...", "element": ".exact-selector", "value": "optional measured value e.g. 2.1:1" }
  ],
  "quickWins": [
    { "severity": "warn", "message": "...", "element": ".exact-selector" }
  ],
  "estimatedScoreGain": 0
}`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text) as GeminiResponse;
      // Sanitise: never show a fix with a missing/empty element
      parsed.topFixes = (parsed.topFixes ?? [])
        .filter(f => f.element && f.element.trim().length > 0 && f.message?.trim().length > 0)
        .slice(0, 3);
      parsed.quickWins = (parsed.quickWins ?? [])
        .filter(f => f.element && f.element.trim().length > 0 && f.message?.trim().length > 0)
        .slice(0, 2);
      return parsed;
    }
    return fallback;
  } catch (error) {
    console.error('Gemini explanation failed:', error);
    return fallback;
  }
}
