import React from 'react'
import { AuditIssue } from "@/lib/types"

interface TopFixesProps {
  fixes?: AuditIssue[];
  estimatedImpact?: { scoreIncrease: number };
}

export function TopFixes({ fixes, estimatedImpact }: TopFixesProps) {
  if (!fixes || fixes.length === 0) return null

  return (
    <div className="mb-[40px]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          Top Fixes
        </h2>
        {estimatedImpact && (
          <span className="text-[12px] font-mono text-grade-good bg-grade-good/10 border border-grade-good px-[10px] py-[3px] rounded-[20px]">
            Estimated impact: +{estimatedImpact.scoreIncrease} score
          </span>
        )}
      </div>

      <div className="flex flex-col">
        {fixes.map((issue, idx) => (
          <div key={idx} className="flex items-start gap-[12px] py-[10px] border-b border-[#F0EEE8] last:border-b-0">
            <div className="text-[9px] font-mono px-[6px] py-[2px] rounded-[4px] border whitespace-nowrap mt-[2px] tracking-[0.04em] uppercase text-grade-critical border-grade-critical bg-grade-critical/10">
              Critical
            </div>
            <div className="flex-1">
              <div className="text-[13px] text-text-primary font-medium mb-[2px]">{issue.message}</div>
              <div className="text-[11px] font-mono text-text-tertiary">Element: {issue.element}</div>
            </div>
            <div className="font-mono text-[13px] text-text-primary self-center shrink-0">
              {issue.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
