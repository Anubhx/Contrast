import { DetectorResult, Severity } from "./index";

export interface ButtonStyle {
  borderRadius: string;
  padding: string;
  backgroundColor: string;
  borderStyle: string;
}

export function detectButtonDrift(buttons: ButtonStyle[]): DetectorResult {
  if (buttons.length === 0) {
    return { variants: 0, message: "No buttons detected", severity: "low", samples: [] };
  }

  const uniqueStyles = new Map<string, ButtonStyle>();
  for (const b of buttons) {
    const key = `${b.borderRadius}|${b.padding}|${b.backgroundColor}|${b.borderStyle}`;
    if (!uniqueStyles.has(key)) uniqueStyles.set(key, b);
  }

  const variants = uniqueStyles.size;

  let severity: Severity = "low";
  if (variants > 2 && variants <= 4) severity = "medium";
  if (variants > 4) severity = "high";

  // Build readable summaries of each unique style
  const samples = Array.from(uniqueStyles.values())
    .slice(0, 6)
    .map(b => `r:${b.borderRadius} p:${b.padding}`);

  return {
    variants,
    message: `${variants} distinct button style${variants === 1 ? "" : "s"} detected`,
    severity,
    samples,
  };
}
