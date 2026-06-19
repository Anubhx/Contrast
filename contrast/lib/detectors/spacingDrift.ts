import { DetectorResult, Severity } from "./index";

export interface SpacingResult extends DetectorResult {
  offGridValues: number[];
}

export function detectSpacingDrift(spacingValues: number[]): SpacingResult {
  if (spacingValues.length === 0) {
    return { offGridValues: [], variants: 0, message: "No spacing values detected", severity: "low", samples: [] };
  }

  const uniqueValues = new Set(spacingValues);
  const offGridValues = Array.from(uniqueValues).filter(v => v > 0 && v % 8 !== 0).sort((a, b) => a - b);
  const variants = offGridValues.length;

  let severity: Severity = "low";
  if (variants > 0 && variants <= 3) severity = "medium";
  if (variants > 3) severity = "high";

  return {
    offGridValues,
    variants,
    message: `${variants} value${variants === 1 ? '' : 's'} outside 8px grid`,
    severity,
    samples: offGridValues.slice(0, 8).map(v => `${v}px`),
  };
}
