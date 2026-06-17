"use client"

import { useState, useEffect } from "react"
import { AuditIssue } from "@/lib/types"
import { IssueRow } from "@/components/ui/IssueRow"
import { cn } from "@/lib/utils"

interface IssueListProps {
  issues: AuditIssue[]
}

type FilterType = "all" | "critical" | "warn" | "info"

const PAGE_SIZE = 10

// How many page buttons to show before using ellipsis
const MAX_VISIBLE_PAGES = 7

/**
 * Builds a page number array with ellipsis markers.
 * e.g. [1, '...', 4, 5, 6, '...', 12]
 */
function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "…")[] = [1]

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) pages.push("…")
  for (let p = left; p <= right; p++) pages.push(p)
  if (right < total - 1) pages.push("…")

  pages.push(total)
  return pages
}

export function IssueList({ issues }: IssueListProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [filter])

  const counts = {
    all:      issues.length,
    critical: issues.filter(i => i.severity === "critical").length,
    warn:     issues.filter(i => i.severity === "warn").length,
    info:     issues.filter(i => i.severity === "info").length,
  }

  const severityOrder = { critical: 0, warn: 1, info: 2 }

  const filteredSorted = [...issues]
    .filter(i => filter === "all" || i.severity === filter)
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  const totalPages = Math.ceil(filteredSorted.length / PAGE_SIZE)
  const paginated  = filteredSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pageRange  = buildPageRange(page, totalPages)

  const rangeStart = (page - 1) * PAGE_SIZE + 1
  const rangeEnd   = Math.min(page * PAGE_SIZE, filteredSorted.length)

  return (
    <div className="mb-[32px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          {issues.length} {issues.length === 1 ? "issue" : "issues"} found
        </h2>
        <span
          className="text-[12px] font-mono text-text-tertiary bg-bg-subtle border border-border px-[10px] py-[3px] rounded-[20px]"
          aria-label={`${issues.length} total issues`}
        >
          {issues.length} total
        </span>
      </div>

      {/* Filter pills */}
      {issues.length > 0 && (
        <div
          className="flex gap-[6px] mb-[22px] flex-wrap"
          role="group"
          aria-label="Filter issues by severity"
        >
          <FilterPill active={filter === "all"}      onClick={() => setFilter("all")}      label={`All (${counts.all})`} />
          <FilterPill active={filter === "critical"} onClick={() => setFilter("critical")} label={`Critical (${counts.critical})`} />
          <FilterPill active={filter === "warn"}     onClick={() => setFilter("warn")}     label={`Warnings (${counts.warn})`} />
          <FilterPill active={filter === "info"}     onClick={() => setFilter("info")}     label={`Info (${counts.info})`} />
        </div>
      )}

      {/* No results */}
      {filteredSorted.length === 0 && (
        <p className="text-[13px] text-text-secondary py-[8px]">
          No issues match this filter.
        </p>
      )}

      {/* Issue groups */}
      {filteredSorted.length > 0 && (
        <div className="flex flex-col">
          {(["critical", "warn", "info"] as const).map(sev => {
            const sevIssues = paginated.filter(i => i.severity === sev)
            if (sevIssues.length === 0) return null

            // Total count for this severity in the full filtered set
            const sevTotal = filteredSorted.filter(i => i.severity === sev).length

            const groupStyles = {
              critical: "bg-grade-critical/10 text-grade-critical",
              warn:     "bg-grade-warn/10 text-grade-warn",
              info:     "bg-bg-subtle text-text-tertiary",
            }

            const groupLabel = {
              critical: "Critical",
              warn:     "Warnings",
              info:     "Info",
            }

            return (
              <div key={sev} className="mb-[22px]" aria-labelledby={`ig-${sev}`}>
                <div
                  id={`ig-${sev}`}
                  className={cn(
                    "text-[10px] font-mono tracking-[0.08em] uppercase px-[10px] py-[5px] rounded-[4px] mb-[8px] inline-flex items-center gap-[6px]",
                    groupStyles[sev]
                  )}
                >
                  {groupLabel[sev]}
                  <span className="opacity-65">· {sevTotal}</span>
                </div>

                {sevIssues.map((issue, i) => (
                  <IssueRow
                    key={`${sev}-${i}`}
                    severity={issue.severity}
                    message={issue.message}
                    element={issue.element}
                    value={issue.value}
                  />
                ))}
              </div>
            )
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-[16px] mt-[4px] border-t border-border">
              <span className="text-[12px] text-text-tertiary font-mono">
                Showing {rangeStart}–{rangeEnd} of {filteredSorted.length}
              </span>

              <div className="flex items-center gap-[6px]">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="text-[12px] font-sans px-[12px] py-[6px] rounded-[6px] border border-border bg-white text-text-secondary transition-colors hover:border-border-subtle hover:bg-bg-subtle disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                <div className="flex gap-[3px]" role="navigation" aria-label="Pagination">
                  {pageRange.map((p, i) =>
                    p === "…" ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="w-[28px] h-[28px] flex items-center justify-center text-[12px] text-text-tertiary select-none"
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? "page" : undefined}
                        className={cn(
                          "w-[28px] h-[28px] flex items-center justify-center rounded-[6px] text-[12px] font-mono transition-colors",
                          p === page
                            ? "bg-text-primary text-white"
                            : "text-text-secondary hover:bg-bg-subtle"
                        )}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="text-[12px] font-sans px-[12px] py-[6px] rounded-[6px] border border-border bg-white text-text-secondary transition-colors hover:border-border-subtle hover:bg-bg-subtle disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "text-[11px] font-mono px-[12px] py-[5px] rounded-[20px] border cursor-pointer transition-all tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        active
          ? "bg-text-primary text-white border-text-primary"
          : "bg-white text-text-tertiary border-border hover:border-border-subtle hover:text-text-secondary"
      )}
    >
      {label}
    </button>
  )
}
