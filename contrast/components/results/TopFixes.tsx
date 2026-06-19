import React from 'react'
import { AuditIssue } from "@/lib/types"

interface TopFixesProps {
  fixes?: AuditIssue[];
  estimatedImpact?: { scoreIncrease: number };
}

export function TopFixes({ fixes, estimatedImpact }: TopFixesProps) {
  // Only render if we have real fixes with non-empty elements
  const realFixes = (fixes ?? []).filter(f => f.message?.trim());
  if (realFixes.length === 0) return null

  return (
    <div className="mb-[40px]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          Top Fixes
        </h2>
        {estimatedImpact && estimatedImpact.scoreIncrease > 0 && (
          <span className="text-[12px] font-mono text-grade-good bg-grade-good/10 border border-grade-good px-[10px] py-[3px] rounded-[20px]">
            +{estimatedImpact.scoreIncrease} pts if fixed
          </span>
        )}
      </div>

      <div className="flex flex-col divide-y divide-[#F0EEE8]">
        {realFixes.slice(0, 3).map((issue, idx) => {
          const isCritical = issue.severity === 'critical';
          const badgeStyle = isCritical
            ? "text-grade-critical border-grade-critical bg-grade-critical/10"
            : "text-grade-warn border-grade-warn bg-grade-warn/10";
          const badgeLabel = isCritical ? "Critical" : "Warn";

          return (
            <div key={idx} className="flex items-start gap-[12px] py-[12px]">
              <div className={`text-[9px] font-mono px-[6px] py-[2px] rounded-[4px] border whitespace-nowrap mt-[2px] tracking-[0.04em] uppercase ${badgeStyle}`}>
                {badgeLabel}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-text-primary font-medium leading-[1.4] mb-[2px]">
                  {issue.message}
                </div>
                {/* Only show element if it's a non-empty real selector */}
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
          );
        })}
      </div>
    </div>
  )
}
