"use client"

import { AuditResult } from "@/lib/types"
import { getGradeText, getGradeColor } from "@/lib/utils"
import { Footer } from "@/components/layout/Footer"

import { useEffect, useState } from "react"

export default function ReportPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/audit/${params.id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);
  
  if (loading) {
    return <div className="p-8 font-mono text-sm text-text-tertiary">Loading report...</div>
  }

  if (!result) {
    return <div className="p-8 font-mono text-sm text-text-tertiary">Report not found.</div>
  }

  const dateObj = new Date(result.auditedAt)
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const overallGradeText = getGradeText(result.scores.overall)
  const overallGradeColor = getGradeColor(result.scores.overall)

  // Sort issues
  const severityOrder = { critical: 0, warn: 1, info: 2 }
  const sortedIssues = [...result.issues].sort((a, b) => 
    severityOrder[a.severity] - severityOrder[b.severity]
  )

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <div className="flex-1 text-[#16150F] p-8 print:p-0 max-w-[794px] w-full mx-auto relative">
        <div className="absolute top-8 right-8 print:hidden hide-on-print">
        <button 
          onClick={() => window.print()}
          className="text-[12px] font-sans px-[16px] py-[8px] rounded-[8px] border border-border bg-white text-text-primary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle inline-flex items-center gap-[6px] shadow-sm font-medium"
        >
          <svg viewBox="0 0 13 13" className="w-[13px] h-[13px] stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
            <path d="M3.5 4V1.5h6V4M3 9.5H1.5v-5h10v5H10M3 7.5h7v4H3v-4z"/>
          </svg>
          Print PDF
        </button>
      </div>

      {/* Container simulating A4 for screen */}
      <div className="bg-white p-[64px_72px] border border-border rounded-[14px] shadow-sm print:border-none print:shadow-none print:p-0 mt-12 print:mt-0">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-[24px] border-b-[1.5px] border-[#16150F] mb-[40px]">
          <div>
            <div className="font-display italic text-[20px] text-[#16150F]">Contrast</div>
            <div className="text-[10px] font-mono text-[#8A8880] tracking-[0.08em] uppercase mt-[4px]">
              Design Accessibility Report
            </div>
          </div>
          <div className="text-right">
            <div className="text-[22px] font-semibold text-[#16150F] tracking-[-0.02em]">
              {result.url}
            </div>
            <div className="text-[11px] font-mono text-[#8A8880] mt-[3px]">
              {dateStr} · audit.anubhxv.design
            </div>
          </div>
        </div>

        {/* Big Score Band */}
        <div className="flex items-center gap-[40px] p-[28px] bg-[#FAFAF8] rounded-[10px] border border-[#E2E0D8] mb-[40px] print-bg-force">
          <div>
            <div className="font-display text-[80px] font-normal leading-[0.9]" style={{ color: overallGradeColor }}>
              {result.scores.overall}
            </div>
            <div className="text-[11px] font-mono tracking-[0.08em] uppercase mt-[6px]" style={{ color: overallGradeColor }}>
              {overallGradeText}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-[12px]">
            <MetricCard label="Color contrast" score={result.scores.contrast} />
            <MetricCard label="Alt text" score={result.scores.altText} />
            <MetricCard label="Typography" score={result.scores.typography} />
            <MetricCard label="Spacing" score={result.scores.spacing} />
          </div>
        </div>

        {/* Issues section */}
        <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-[#8A8880] my-[28px] pb-[10px] border-b border-[#E2E0D8]">
          Issues found · {result.issues.length} total
        </div>
        
        <div className="flex flex-col">
          {sortedIssues.map((issue, i) => (
            <div key={i} className="flex items-start gap-[12px] py-[10px] border-b border-[#F0EEE8] last:border-b-0 break-inside-avoid">
              <span className={`text-[9px] font-mono px-[6px] py-[2px] rounded-[4px] border whitespace-nowrap mt-[2px] tracking-[0.04em] uppercase ${
                issue.severity === 'critical' ? 'text-[#B31B1B] border-[#B31B1B] bg-[#FDEAEA] print-bg-force' :
                issue.severity === 'warn' ? 'text-[#CC4400] border-[#CC4400] bg-[#FEF0EA] print-bg-force' :
                'text-[#8A8880] border-[#E2E0D8] bg-[#F4F3EF] print-bg-force'
              }`}>
                {issue.severity}
              </span>
              <div className="flex-1">
                <div className="text-[12px] text-[#16150F] font-medium mb-[2px]">
                  {issue.message}
                </div>
                {issue.element && (
                  <div className="text-[10px] font-mono text-[#8A8880] break-all">
                    {issue.element}
                  </div>
                )}
              </div>
              {issue.value && (
                <div className="font-mono text-[13px] text-[#16150F] self-center shrink-0">
                  {issue.value}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-[48px] pt-[20px] border-t border-[#E2E0D8] flex justify-between">
          <div className="text-[10px] font-mono text-[#8A8880]">
            Generated by Contrast · audit.anubhxv.design
          </div>
          <div className="text-[10px] font-mono text-[#8A8880]">
            audit/{result.id} · {dateStr} · WCAG 2.1 AA
          </div>
        </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

function MetricCard({ label, score }: { label: string, score: number }) {
  const color = getGradeColor(score)
  return (
    <div className="bg-white border border-[#E2E0D8] rounded-[8px] p-[14px]">
      <div className="text-[10px] font-mono tracking-[0.06em] text-[#8A8880] uppercase mb-[6px]">
        {label}
      </div>
      <div className="font-mono text-[22px] font-medium mb-[6px]" style={{ color }}>
        {score}
      </div>
      <div className="h-[3px] bg-[#E2E0D8] rounded-[2px] overflow-hidden">
        <div className="h-full rounded-[2px] print-bg-force" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  )
}
