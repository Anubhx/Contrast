import { DetectorResult, Severity } from "./index";

export interface SpacingResult extends DetectorResult {
  offGridValues: number[];
}

export function detectSpacingDrift(spacingValues: number[]): SpacingResult {
  if (spacingValues.length === 0) {
    return { offGridValues: [], variants: 0, message: "0 Spacing Values Outside 8px Rhythm", severity: "low" };
  }
  
  const uniqueValues = new Set(spacingValues);
  const offGridValues = Array.from(uniqueValues).filter(v => v > 0 && v % 8 !== 0);
  const variants = offGridValues.length;
  
  let severity: Severity = "low";
  if (variants > 0 && variants <= 3) severity = "medium";
  if (variants > 3) severity = "high";
  
  return {
    offGridValues,
    variants,
    message: `${variants} Spacing Value${variants === 1 ? '' : 's'} Outside 8px Rhythm`,
    severity
  };
}
