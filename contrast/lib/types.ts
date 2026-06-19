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
  
  // New Value Layer
  designSmells?: {
    buttonDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
    typographyDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
    colorDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
    spacingDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
  };
  prioritizedFixes?: {
    topFixes: AuditIssue[];
    quickWins: AuditIssue[];
  };
  estimatedImpact?: {
    scoreIncrease: number;
  };
}

export interface RecentAuditData {
  id: string;
  domain: string;
  score: number;
  issues: number;
  date: string;
  color: string;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface WhatWeCheckItem {
  id: string;
  title: string;
  description: string;
  threshold: React.ReactNode | string;
  icon: string | React.ReactNode;
}
