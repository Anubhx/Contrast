import { Severity } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SeverityBadgeProps {
  severity: Severity
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span className={cn(
      "text-[9px] font-mono tracking-[0.06em] px-1.5 py-0.5 rounded-[4px] border uppercase shrink-0",
      {
        "text-grade-critical border-grade-critical bg-[#FDEAEA] ": severity === 'critical',
        "text-grade-warn border-grade-warn bg-[#FEF0EA] ": severity === 'warn',
        "text-text-tertiary border-border bg-bg-subtle ": severity === 'info',
      }
    )}>
      {severity}
    </span>
  )
}
