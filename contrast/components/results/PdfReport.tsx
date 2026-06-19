import React from 'react'
import { AuditResult } from "@/lib/types"

interface PdfReportProps {
  result: AuditResult
}

function getGradeInfo(score: number) {
  if (score >= 85) return { grade: 'Excellent', colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent', borderClass: 'border-grade-excellent', bgLight: 'bg-grade-excellent/10' }
  if (score >= 70) return { grade: 'Good', colorClass: 'text-grade-good', bgClass: 'bg-grade-good', borderClass: 'border-grade-good', bgLight: 'bg-grade-good/10' }
  if (score >= 50) return { grade: 'Needs work', colorClass: 'text-grade-warn', bgClass: 'bg-grade-warn', borderClass: 'border-grade-warn', bgLight: 'bg-grade-warn/10' }
  return { grade: 'Critical', colorClass: 'text-grade-critical', bgClass: 'bg-grade-critical', borderClass: 'border-grade-critical', bgLight: 'bg-grade-critical/10' }
}

export function PdfReport({ result }: PdfReportProps) {
  const dateObj = new Date(result.auditedAt)
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const overall = getGradeInfo(result.scores.overall)
  const contrast = getGradeInfo(result.scores.contrast)
  const altText = getGradeInfo(result.scores.altText)
  const typography = getGradeInfo(result.scores.typography)
  const spacing = getGradeInfo(result.scores.spacing)

  // Prioritize critical and warn issues for the print report
  const severityOrder = { critical: 0, warn: 1, info: 2 }
  const sortedIssues = [...result.issues].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]).slice(0, 10) // Show top 10

  return (
    <div className="hidden print:block bg-white max-w-[794px] mx-auto p-[64px_72px] border border-border rounded-[14px] shadow-[0_2px_8px_rgba(16,15,10,0.08),0_1px_2px_rgba(16,15,10,0.04)]">
      <div className="flex justify-between items-start pb-[24px] border-b-[1.5px] border-text-primary mb-[40px]">
        <div>
          <div className="font-display italic text-[20px] text-text-primary">Contrast</div>
          <div className="text-[10px] font-mono text-text-tertiary tracking-[0.08em] uppercase mt-[4px]">Design Accessibility Report</div>
        </div>
        <div className="text-right">
          <div className="text-[22px] font-semibold text-text-primary tracking-[-0.02em]">{result.url}</div>
          <div className="text-[11px] font-mono text-text-tertiary mt-[3px]">{dateStr} · audit.contrast.app</div>
        </div>
      </div>

      <div className="flex items-center gap-[40px] p-[28px] bg-bg-subtle border border-border rounded-[10px] mb-[40px]">
        <div>
          <div className={`font-display text-[80px] font-normal leading-[0.9] ${overall.colorClass}`}>{result.scores.overall}</div>
          <div className={`text-[11px] font-mono tracking-[0.08em] uppercase mt-[6px] ${overall.colorClass}`}>{overall.grade}</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-[12px]">
          <div className="bg-white border border-border rounded-[8px] p-[14px]">
            <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Color contrast</div>
            <div className={`font-mono text-[22px] font-medium mb-[6px] ${contrast.colorClass}`}>{result.scores.contrast}</div>
            <div className="h-[3px] bg-border rounded-[2px] overflow-hidden">
              <div className={`h-full rounded-[2px] ${contrast.bgClass}`} style={{ width: `${result.scores.contrast}%` }}></div>
            </div>
          </div>
          <div className="bg-white border border-border rounded-[8px] p-[14px]">
            <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Alt text</div>
            <div className={`font-mono text-[22px] font-medium mb-[6px] ${altText.colorClass}`}>{result.scores.altText}</div>
            <div className="h-[3px] bg-border rounded-[2px] overflow-hidden">
              <div className={`h-full rounded-[2px] ${altText.bgClass}`} style={{ width: `${result.scores.altText}%` }}></div>
            </div>
          </div>
          <div className="bg-white border border-border rounded-[8px] p-[14px]">
            <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Typography</div>
            <div className={`font-mono text-[22px] font-medium mb-[6px] ${typography.colorClass}`}>{result.scores.typography}</div>
            <div className="h-[3px] bg-border rounded-[2px] overflow-hidden">
              <div className={`h-full rounded-[2px] ${typography.bgClass}`} style={{ width: `${result.scores.typography}%` }}></div>
            </div>
          </div>
          <div className="bg-white border border-border rounded-[8px] p-[14px]">
            <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Spacing</div>
            <div className={`font-mono text-[22px] font-medium mb-[6px] ${spacing.colorClass}`}>{result.scores.spacing}</div>
            <div className="h-[3px] bg-border rounded-[2px] overflow-hidden">
              <div className={`h-full rounded-[2px] ${spacing.bgClass}`} style={{ width: `${result.scores.spacing}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-text-tertiary m-[28px_0_12px] pb-[10px] border-b border-border">
        Issues found · {result.issues.length} total
      </div>
      
      <div role="list">
        {sortedIssues.map((issue, idx) => {
          let badgeClass = ''
          let label = ''
          if (issue.severity === 'critical') { badgeClass = 'text-grade-critical border-grade-critical bg-grade-critical/10'; label = 'Critical' }
          if (issue.severity === 'warn') { badgeClass = 'text-grade-warn border-grade-warn bg-grade-warn/10'; label = 'Warn' }
          if (issue.severity === 'info') { badgeClass = 'text-text-tertiary border-border bg-bg-subtle'; label = 'Info' }

          return (
            <div key={idx} className="flex items-start gap-[12px] py-[10px] border-b border-[#F0EEE8] last:border-b-0" role="listitem">
              <div className={`text-[9px] font-mono px-[6px] py-[2px] rounded-[4px] border whitespace-nowrap mt-[2px] tracking-[0.04em] uppercase ${badgeClass}`}>
                {label}
              </div>
              <div className="flex-1">
                <div className="text-[12px] text-text-primary font-medium mb-[2px]">{issue.message}</div>
                <div className="text-[10px] font-mono text-text-tertiary">{issue.element}</div>
              </div>
              <div className="font-mono text-[13px] text-text-primary self-center shrink-0">
                {issue.value}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-[48px] pt-[20px] border-t border-border flex justify-between">
        <div className="text-[10px] font-mono text-text-tertiary">Generated by Contrast · audit.contrast.app</div>
        <div className="text-[10px] font-mono text-text-tertiary">audit/{result.id} · {dateStr} · WCAG 2.1 AA</div>
      </div>
    </div>
  )
}
