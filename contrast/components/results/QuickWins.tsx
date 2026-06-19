import React from 'react'
import { AuditIssue } from "@/lib/types"

interface QuickWinsProps {
  wins?: AuditIssue[];
}

export function QuickWins({ wins }: QuickWinsProps) {
  const realWins = (wins ?? []).filter(w => w.message?.trim());
  if (realWins.length === 0) return null

  return (
    <section className="mb-[28px]">
      <div className="text-[9px] font-mono tracking-widest uppercase text-text-quaternary mb-[10px]">
        Quick Wins
      </div>

      <div className="border border-border rounded-[5px] divide-y divide-border overflow-hidden">
        {realWins.slice(0, 2).map((issue, idx) => (
          <div key={idx} className="flex items-center gap-[10px] px-[14px] py-[10px] bg-white hover:bg-[#FAFAF8] transition-colors">
            <div className="w-[6px] h-[6px] rounded-full shrink-0 bg-grade-warn" />
            <div className="flex-1 text-[12px] text-text-primary font-medium leading-[1.35] min-w-0">
              {issue.message}
              {issue.element && issue.element.trim() && (
                <span className="font-mono text-text-quaternary font-normal ml-[6px] text-[10px]">
                  {issue.element.length > 40 ? '…' + issue.element.slice(-40) : issue.element}
                </span>
              )}
            </div>
            {issue.value && (
              <span className="font-mono text-[12px] text-grade-warn shrink-0">{issue.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
