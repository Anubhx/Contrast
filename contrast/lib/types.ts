export type Severity = 'critical' | 'warn' | 'info';

export interface AuditIssue {
  severity: Severity;
  category: 'contrast' | 'altText' | 'typography' | 'spacing';
  message: string;
  element?: string;
  value?: string;
}

export interface AuditScores {
  contrast: number;
  altText: number;
  typography: number;
  spacing: number;
  overall: number;
}

export interface AuditResult {
  id: string;
  url: string;
  auditedAt: string;
  scores: AuditScores;
  issues: AuditIssue[];
  screenshotUrl?: string | null;
}
