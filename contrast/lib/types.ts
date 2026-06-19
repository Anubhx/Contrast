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
  
  designSmells?: {
    buttonDrift:    { variants: number; message: string; severity: "low" | "medium" | "high"; samples?: string[] };
    typographyDrift: { variants: number; message: string; severity: "low" | "medium" | "high"; samples?: string[] };
    colorDrift:     { variants: number; message: string; severity: "low" | "medium" | "high"; samples?: string[] };
    spacingDrift:   { variants: number; message: string; severity: "low" | "medium" | "high"; samples?: string[] };
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
