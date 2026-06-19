import { DetectorResult, Severity } from "./index";

export interface TypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
}

export function detectTypographyDrift(textElements: TypographyStyle[]): DetectorResult {
  if (textElements.length === 0) {
    return { variants: 0, message: "No typography detected", severity: "low", samples: [] };
  }

  // Unique font families (most meaningful drift signal)
  const uniqueFamilies = Array.from(
    new Set(textElements.map(t => t.fontFamily.split(",")[0].trim().replace(/['"]/g, "")))
  );

  // Unique full combos for severity
  const uniqueCombinations = new Set(
    textElements.map(t => `${t.fontFamily}|${t.fontSize}|${t.fontWeight}`)
  );
  const variants = uniqueCombinations.size;

  let severity: Severity = "low";
  if (variants > 5 && variants <= 10) severity = "medium";
  if (variants > 10) severity = "high";

  return {
    variants,
    message: `${uniqueFamilies.length} font famil${uniqueFamilies.length === 1 ? "y" : "ies"}, ${variants} unique style combo${variants === 1 ? "" : "s"}`,
    severity,
    samples: uniqueFamilies.slice(0, 8),
  };
}
