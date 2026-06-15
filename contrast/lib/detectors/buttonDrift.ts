import { DetectorResult, Severity } from "./index";

export interface ButtonStyle {
  borderRadius: string;
  padding: string;
  backgroundColor: string;
  borderStyle: string;
}

export function detectButtonDrift(buttons: ButtonStyle[]): DetectorResult {
  if (buttons.length === 0) {
    return { variants: 0, message: "0 Button Styles Found", severity: "low" };
  }
  
  const uniqueStyles = new Set(buttons.map(b => 
    `${b.borderRadius}|${b.padding}|${b.backgroundColor}|${b.borderStyle}`
  ));
  
  const variants = uniqueStyles.size;
  
  let severity: Severity = "low";
  if (variants > 2 && variants <= 4) severity = "medium";
  if (variants > 4) severity = "high";
  
  return {
    variants,
    message: `${variants} Button Style${variants === 1 ? '' : 's'} Found`,
    severity
  };
}
