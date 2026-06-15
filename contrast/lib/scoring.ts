import { AuditIssue } from './types';

// The scoring engine uses deterministic formulas based on violations.
// Each category starts at 100, and points are deducted based on severity.
// Critical = -20, Warn = -10, Info = -5. (Floor is 0)
// The overall score is weighted.

const WEIGHTS = {
  contrast: 0.40,
  altText: 0.30,
  typography: 0.15,
  spacing: 0.15
};

function calculateSubScore(issues: AuditIssue[], category: string): number {
  const categoryIssues = issues.filter(i => i.category === category);
  let score = 100;
  
  for (const issue of categoryIssues) {
    if (issue.severity === 'critical') score -= 20;
    else if (issue.severity === 'warn') score -= 10;
    else score -= 5;
  }
  
  return Math.max(0, score);
}

export function calculateScores(issues: AuditIssue[]) {
  const contrast = calculateSubScore(issues, 'contrast');
  const altText = calculateSubScore(issues, 'altText');
  const typography = calculateSubScore(issues, 'typography');
  const spacing = calculateSubScore(issues, 'spacing'); // Spacing issues are grouped here if any layout checks fail

  const overall = Math.round(
    (contrast * WEIGHTS.contrast) +
    (altText * WEIGHTS.altText) +
    (typography * WEIGHTS.typography) +
    (spacing * WEIGHTS.spacing)
  );

  return {
    overall,
    contrast,
    altText,
    typography,
    spacing
  };
}
