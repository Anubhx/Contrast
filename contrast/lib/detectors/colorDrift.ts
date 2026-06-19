import { DetectorResult, Severity } from "./index";

export function detectColorDrift(colors: string[]): DetectorResult {
  if (colors.length === 0) {
    return { variants: 0, message: "No colors detected", severity: "low", samples: [] };
  }

  // Convert rgb() strings to approximate hex for readability
  const toHexApprox = (color: string): string => {
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return color;
    const hex = [m[1], m[2], m[3]]
      .map(n => parseInt(n).toString(16).padStart(2, "0"))
      .join("");
    return `#${hex}`;
  };

  const uniqueColors = Array.from(new Set(colors.map(toHexApprox)));
  const variants = uniqueColors.length;

  let severity: Severity = "low";
  if (variants > 5 && variants <= 10) severity = "medium";
  if (variants > 10) severity = "high";

  return {
    variants,
    message: `${variants} unique color${variants === 1 ? "" : "s"} found`,
    severity,
    samples: uniqueColors.slice(0, 8),
  };
}
