import { Severity } from "@/lib/types"
import { SeverityBadge } from "./SeverityBadge"
import { cn } from "@/lib/utils"

interface IssueRowProps {
  severity: Severity
  message: string
  element?: string
  value?: string
}

export function IssueRow({ severity, message, element, value }: IssueRowProps) {
  return (
    <div className="flex items-center gap-[10px] py-[7px] border-b border-border last:border-b-0">
      <SeverityBadge severity={severity} />
      <div className="flex-1 text-[12px] text-text-primary truncate">
        {message}
        {element && (
          <span className="text-text-secondary font-mono ml-2 text-[11px] truncate inline-block max-w-[200px] align-bottom">
            {element}
          </span>
        )}
      </div>
      {value && (
        <div className={cn(
          "font-mono text-[12px] font-medium shrink-0",
          {
            "text-grade-critical": severity === 'critical',
            "text-grade-warn": severity === 'warn',
            "text-text-primary": severity === 'info',
          }
        )}>
          {value}
        </div>
      )}
    </div>
  )
}
