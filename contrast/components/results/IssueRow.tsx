"use client"

import { AuditIssue } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IssueRowProps {
  severity: AuditIssue["severity"]
  message: string
  element?: string
  value?: string
}

/**
 * Cleans raw axe-core description strings before display.
 *
 * axe-core returns descriptions like:
 *   "Fix all of the following:\n  Links must have discernible text"
 *   "Fix any of the following:\n  Element has no aria-label"
 *
 * We strip that preamble and return only the human-readable part.
 */
function cleanAxeMessage(raw: string): string {
  if (!raw) return raw

  // Remove "Fix all of the following:\n" and "Fix any of the following:\n"
  const cleaned = raw
    .replace(/^Fix (all|any) of the following:\s*/i, "")
    .replace(/^Element must /i, "Element must ")
    // Collapse multiple newlines into a single space
    .replace(/\n+/g, " · ")
    // Trim bullet-style prefixes axe sometimes adds
    .replace(/^\s*[•·\-]\s*/, "")
    .trim()

  // Capitalise first letter
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

/**
 * Truncates a CSS selector to a readable length.
 * axe-core selectors can be very long e.g.
 * "html > body > div:nth-child(2) > main > section > a[href='...']"
 */
function truncateSelector(selector: string, maxLen = 64): string {
  if (!selector || selector.length <= maxLen) return selector
  return "…" + selector.slice(-maxLen)
}

export function IssueRow({ severity, message, element, value }: IssueRowProps) {
  const displayMessage = cleanAxeMessage(message)
  const displaySelector = element ? truncateSelector(element) : undefined

  const severityStyles: Record<AuditIssue["severity"], string> = {
    critical: "text-grade-critical border-grade-critical bg-grade-critical/8",
    warn:     "text-grade-warn     border-grade-warn     bg-grade-warn/8",
    info:     "text-text-tertiary  border-border          bg-bg-subtle",
  }

  const valueStyles: Record<AuditIssue["severity"], string> = {
    critical: "text-grade-critical",
    warn:     "text-grade-warn",
    info:     "text-text-tertiary",
  }

  const severityLabel: Record<AuditIssue["severity"], string> = {
    critical: "Critical",
    warn:     "Warn",
    info:     "Info",
  }

  return (
    <article
      className="bg-white border border-border rounded-[10px] px-[16px] py-[13px] mb-[6px] flex items-start gap-[14px] transition-colors hover:border-border-subtle hover:shadow-xs"
      aria-label={`${severityLabel[severity]}: ${displayMessage}`}
    >
      {/* Left: category chip + message + selector */}
      <div className="flex-1 min-w-0">
        {/* Severity badge */}
        <span
          className={cn(
            "inline-flex items-center text-[9px] font-mono tracking-[0.06em] uppercase px-[6px] py-[2px] rounded-[4px] border mb-[6px]",
            severityStyles[severity]
          )}
          aria-hidden="true"
        >
          {severityLabel[severity]}
        </span>

        {/* Main message */}
        <p className="text-[13px] font-medium text-text-primary leading-[1.4] mb-[4px]">
          {displayMessage}
        </p>

        {/* CSS selector */}
        {displaySelector && (
          <p
            className="text-[11px] font-mono text-text-tertiary truncate"
            title={element}
          >
            {displaySelector}
          </p>
        )}
      </div>

      {/* Right: value — only if it adds information */}
      {value && value !== "missing" ? (
        <div className="flex-shrink-0 self-center text-right">
          <span className={cn("font-mono text-[15px] font-medium", valueStyles[severity])}>
            {value}
          </span>
        </div>
      ) : value === "missing" ? (
        <div className="flex-shrink-0 self-center">
          <span className={cn("font-mono text-[12px]", valueStyles[severity])}>
            missing
          </span>
        </div>
      ) : null}
    </article>
  )
}
