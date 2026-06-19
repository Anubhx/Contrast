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
- Every fix MUST reference the EXACT selector from the violation nodes.
- Be terse. No motivational language. No "to improve X for Y users."
- Format: what is broken, where it is (the selector), the measured value if present.
- Example good message: "contrast ratio 2.1:1 on .navbar-text — needs 4.5:1 minimum"
- Example bad message: "Address contrast violations to improve legibility"
- topFixes: critical/serious violations only.
- quickWins: moderate/minor violations that are easy to fix.
- If there are no real issues for a section, return an empty array. Do NOT invent.
- estimatedScoreGain: realistic integer 0-20 based on violation count.

Violations:
${JSON.stringify(topViolations, null, 2)}

Return JSON only, no markdown, no prose:
{
  "topFixes": [
    { "severity": "critical", "message": "...", "element": ".actual-selector", "value": "2.1:1" }
  ],
  "quickWins": [
    { "severity": "warn", "message": "...", "element": ".actual-selector" }
  ],
  "estimatedScoreGain": 12
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
