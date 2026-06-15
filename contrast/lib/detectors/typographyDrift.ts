import { DetectorResult, Severity } from "./index";

export interface TypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
}

export function detectTypographyDrift(textElements: TypographyStyle[]): DetectorResult {
  if (textElements.length === 0) {
    return { variants: 0, message: "0 Typography Variants Found", severity: "low" };
  }
  
  const uniqueCombinations = new Set(textElements.map(t => `${t.fontFamily}|${t.fontSize}|${t.fontWeight}`));
  const variants = uniqueCombinations.size;
  
  let severity: Severity = "low";
  if (variants > 5 && variants <= 10) severity = "medium";
  if (variants > 10) severity = "high";
  
  return {
    variants,
    message: `${variants} Unique Typography Variant${variants === 1 ? '' : 's'} Found`,
    severity
  };
}
