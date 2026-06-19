export type Severity = "low" | "medium" | "high";

export interface DetectorResult {
  variants: number;
  message: string;
  severity: Severity;
  samples?: string[]; // up to 8 representative sample values
}
