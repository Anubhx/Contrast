import { DetectorResult, Severity } from "./index";

export function detectColorDrift(colors: string[]): DetectorResult {
  if (colors.length === 0) {
    return { variants: 0, message: "0 Colors Found", severity: "low" };
  }
  
  const uniqueColors = new Set(colors);
  const variants = uniqueColors.size;
  
  let severity: Severity = "low";
  if (variants > 5 && variants <= 10) severity = "medium";
  if (variants > 10) severity = "high";
  
  return {
    variants,
    message: `${variants} Unique Color${variants === 1 ? '' : 's'} Found`,
    severity
  };
}
