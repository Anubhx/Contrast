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

function getTextColor(s: number) {
  if (s >= 85) return 'text-grade-excellent'
  if (s >= 70) return 'text-grade-good'
  if (s >= 50) return 'text-grade-warn'
  return 'text-grade-critical'
}

function getBgColor(s: number) {
  if (s >= 85) return 'bg-grade-excellent'
  if (s >= 70) return 'bg-grade-good'
  if (s >= 50) return 'bg-grade-warn'
  return 'bg-grade-critical'
}

export function CategoryGrid({ scores, issues }: CategoryGridProps) {
  const cats = [
    { key: 'contrast',   label: 'Contrast',   score: scores.contrast,   issueCount: issues.filter(i => i.category === 'contrast').length   },
    { key: 'altText',    label: 'Alt text',    score: scores.altText,    issueCount: issues.filter(i => i.category === 'altText').length    },
    { key: 'typography', label: 'Type',        score: scores.typography, issueCount: issues.filter(i => i.category === 'typography').length },
    { key: 'spacing',    label: 'Spacing',     score: scores.spacing,    issueCount: issues.filter(i => i.category === 'spacing').length    },
  ]

  return (
    <div
      className="grid grid-cols-2 gap-[1px] bg-[#2A2926] border-b border-border"
      role="list"
      aria-label="Category scores"
    >
      {cats.map(({ key, label, score, issueCount }) => (
        <div
          key={key}
          className="bg-[#1C1B19] px-[16px] py-[16px] flex flex-col justify-between"
          role="listitem"
          aria-label={`${label}: ${score}, ${issueCount} issues`}
        >
          <div>
            <div className="text-[10px] font-mono tracking-[0.06em] uppercase text-[#888888] mb-[8px]">
              {label}
            </div>
            <div className={`font-mono text-[28px] font-semibold leading-none mb-[8px] ${getTextColor(score)}`}>
              {score}
            </div>
          </div>
          <div>
            <div className="h-[3px] bg-[#333] rounded-full overflow-hidden mb-[6px]" aria-hidden="true">
              <div className={`h-full rounded-full ${getBgColor(score)}`} style={{ width: `${score}%` }} />
            </div>
            <div className="text-[11px] text-white">
              {issueCount} {issueCount === 1 ? 'issue' : 'issues'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
