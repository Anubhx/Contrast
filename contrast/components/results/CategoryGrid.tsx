import React from 'react'
import { AuditIssue } from "@/lib/types"

interface CategoryGridProps {
  scores: {
    contrast: number;
    altText: number;
    typography: number;
    spacing: number;
  };
  issues: AuditIssue[];
}

function getTextColor(score: number) {
  if (score >= 85) return 'text-grade-excellent'
  if (score >= 70) return 'text-grade-good'
  if (score >= 50) return 'text-grade-warn'
  return 'text-grade-critical'
}

function getBgColor(score: number) {
  if (score >= 85) return 'bg-grade-excellent'
  if (score >= 70) return 'bg-grade-good'
  if (score >= 50) return 'bg-grade-warn'
  return 'bg-grade-critical'
}

export function CategoryGrid({ scores, issues }: CategoryGridProps) {
  const contrastIssues = issues.filter(i => i.category === 'contrast').length
  const altTextIssues = issues.filter(i => i.category === 'altText').length
  const typeIssues = issues.filter(i => i.category === 'typography').length
  const spacingIssues = issues.filter(i => i.category === 'spacing').length

  return (
    <div className="grid grid-cols-2 gap-[1px] bg-border border-y border-border" role="list" aria-label="Category scores">
      <div className="bg-white p-[16px_18px]" role="listitem" aria-label={`Contrast: ${scores.contrast}, ${contrastIssues} issues`}>
        <div className="text-[10px] font-mono tracking-[0.06em] uppercase text-text-tertiary mb-[8px]">Contrast</div>
        <div className={`font-mono text-[24px] font-medium mb-[6px] leading-none ${getTextColor(scores.contrast)}`}>{scores.contrast}</div>
        <div className="h-[3px] bg-bg-subtle rounded-[2px] overflow-hidden mb-[5px]" aria-hidden="true">
          <div className={`h-full rounded-[2px] ${getBgColor(scores.contrast)}`} style={{ width: `${scores.contrast}%` }}></div>
        </div>
        <div className="text-[11px] text-text-tertiary">{contrastIssues} {contrastIssues === 1 ? 'issue' : 'issues'}</div>
      </div>
      
      <div className="bg-white p-[16px_18px]" role="listitem" aria-label={`Alt text: ${scores.altText}, ${altTextIssues} issues`}>
        <div className="text-[10px] font-mono tracking-[0.06em] uppercase text-text-tertiary mb-[8px]">Alt text</div>
        <div className={`font-mono text-[24px] font-medium mb-[6px] leading-none ${getTextColor(scores.altText)}`}>{scores.altText}</div>
        <div className="h-[3px] bg-bg-subtle rounded-[2px] overflow-hidden mb-[5px]" aria-hidden="true">
          <div className={`h-full rounded-[2px] ${getBgColor(scores.altText)}`} style={{ width: `${scores.altText}%` }}></div>
        </div>
        <div className="text-[11px] text-text-tertiary">{altTextIssues} {altTextIssues === 1 ? 'issue' : 'issues'}</div>
      </div>
      
      <div className="bg-white p-[16px_18px]" role="listitem" aria-label={`Typography: ${scores.typography}, ${typeIssues} issues`}>
        <div className="text-[10px] font-mono tracking-[0.06em] uppercase text-text-tertiary mb-[8px]">Typography</div>
        <div className={`font-mono text-[24px] font-medium mb-[6px] leading-none ${getTextColor(scores.typography)}`}>{scores.typography}</div>
        <div className="h-[3px] bg-bg-subtle rounded-[2px] overflow-hidden mb-[5px]" aria-hidden="true">
          <div className={`h-full rounded-[2px] ${getBgColor(scores.typography)}`} style={{ width: `${scores.typography}%` }}></div>
        </div>
        <div className="text-[11px] text-text-tertiary">{typeIssues} {typeIssues === 1 ? 'issue' : 'issues'}</div>
      </div>
      
      <div className="bg-white p-[16px_18px]" role="listitem" aria-label={`Spacing: ${scores.spacing}, ${spacingIssues} issues`}>
        <div className="text-[10px] font-mono tracking-[0.06em] uppercase text-text-tertiary mb-[8px]">Spacing</div>
        <div className={`font-mono text-[24px] font-medium mb-[6px] leading-none ${getTextColor(scores.spacing)}`}>{scores.spacing}</div>
        <div className="h-[3px] bg-bg-subtle rounded-[2px] overflow-hidden mb-[5px]" aria-hidden="true">
          <div className={`h-full rounded-[2px] ${getBgColor(scores.spacing)}`} style={{ width: `${scores.spacing}%` }}></div>
        </div>
        <div className="text-[11px] text-text-tertiary">{spacingIssues} {spacingIssues === 1 ? 'issue' : 'issues'}</div>
      </div>
    </div>
  )
}
