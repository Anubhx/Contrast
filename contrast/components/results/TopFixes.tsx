import React from 'react'
import { AuditIssue } from "@/lib/types"

interface TopFixesProps {
  fixes?: AuditIssue[];
  estimatedImpact?: { scoreIncrease: number };
}

export function TopFixes({ fixes, estimatedImpact }: TopFixesProps) {
  const realFixes = (fixes ?? []).filter(f => f.message?.trim());
  if (realFixes.length === 0) return null

  return (
    <section className="mb-[28px]">
      {/* Section label */}
      <div className="flex items-center justify-between mb-[10px]">
        <span className="text-[9px] font-mono tracking-widest uppercase text-text-quaternary">
          Top Fixes
        </span>
        {estimatedImpact && estimatedImpact.scoreIncrease > 0 && (
          <span className="text-[10px] font-mono text-grade-good">
            +{estimatedImpact.scoreIncrease} pts if fixed
          </span>
        )}
      </div>

      <div className="border border-border rounded-[5px] divide-y divide-border overflow-hidden">
        {realFixes.slice(0, 3).map((issue, idx) => {
          const isCritical = issue.severity === 'critical';
          const dot = isCritical ? 'bg-grade-critical' : 'bg-grade-warn';
          return (
            <div key={idx} className="flex items-center gap-[10px] px-[14px] py-[10px] bg-white hover:bg-[#FAFAF8] transition-colors">
              {/* Severity dot */}
              <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${dot}`} aria-label={issue.severity} />
              {/* Message */}
              <div className="flex-1 text-[12px] text-text-primary font-medium leading-[1.35] min-w-0">
                {issue.message}
                {issue.element && issue.element.trim() && (
                  <span className="font-mono text-text-quaternary font-normal ml-[6px] text-[10px]">
                    {issue.element.length > 40 ? '…' + issue.element.slice(-40) : issue.element}
                  </span>
                )}
              </div>
              {/* Value */}
              {issue.value && (
                <span className={`font-mono text-[12px] shrink-0 ${isCritical ? 'text-grade-critical' : 'text-grade-warn'}`}>
                  {issue.value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )
}
