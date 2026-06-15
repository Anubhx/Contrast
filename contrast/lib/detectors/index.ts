export type Severity = "low" | "medium" | "high";

export interface DetectorResult {
  variants: number;
  message: string;
  severity: Severity;
}
