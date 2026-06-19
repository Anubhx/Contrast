import React from 'react'
import { AuditIssue } from "@/lib/types"

interface QuickWinsProps {
  wins?: AuditIssue[];
}

export function QuickWins({ wins }: QuickWinsProps) {
  const realWins = (wins ?? []).filter(w => w.message?.trim());
  if (realWins.length === 0) return null

  return (
    <div className="mb-[40px]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          Quick Wins
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-[#F0EEE8]">
        {realWins.slice(0, 2).map((issue, idx) => (
          <div key={idx} className="flex items-start gap-[12px] py-[12px]">
            <div className="text-[9px] font-mono px-[6px] py-[2px] rounded-[4px] border whitespace-nowrap mt-[2px] tracking-[0.04em] uppercase text-grade-warn border-grade-warn bg-grade-warn/10">
              Warn
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-text-primary font-medium leading-[1.4] mb-[2px]">
                {issue.message}
              </div>
              {/* Only show element if it's a real selector */}
              {issue.element && issue.element.trim().length > 0 && (
                <div className="text-[11px] font-mono text-text-tertiary truncate" title={issue.element}>
                  {issue.element}
                </div>
              )}
            </div>
            {issue.value && (
              <div className="font-mono text-[13px] text-text-primary self-center shrink-0">
                {issue.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
