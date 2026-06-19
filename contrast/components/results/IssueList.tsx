"use client"

import { useState, useEffect } from "react"
import { AuditIssue } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IssueListProps {
  issues: AuditIssue[]
}

type FilterType = "all" | "critical" | "warn" | "info"
const PAGE_SIZE = 15

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
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

  useEffect(() => { setPage(1) }, [filter])

  const counts = {
    all:      issues.length,
    critical: issues.filter(i => i.severity === "critical").length,
    warn:     issues.filter(i => i.severity === "warn").length,
    info:     issues.filter(i => i.severity === "info").length,
  }

  const filtered = [...issues]
    .filter(i => filter === "all" || i.severity === filter)
    .sort((a, b) => {
      const order = { critical: 0, warn: 1, info: 2 }
      return order[a.severity] - order[b.severity]
    })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pageRange  = buildPageRange(page, totalPages)
  const rangeStart = (page - 1) * PAGE_SIZE + 1
  const rangeEnd   = Math.min(page * PAGE_SIZE, filtered.length)

  const severityBadgeStyle: Record<AuditIssue["severity"], string> = {
    critical: "text-grade-critical border-grade-critical bg-[#FEF2F2]",
    warn:     "text-grade-warn border-grade-warn bg-[#FFFBEB]",
    info:     "text-text-quaternary border-border bg-bg-subtle",
  }
  const severityLabel: Record<AuditIssue["severity"], string> = {
    critical: "Critical",
    warn:     "Warn",
    info:     "Info",
  }

  return (
    <section className="mb-[28px]">
      {/* Section header */}
      <div className="flex items-center justify-between mb-[10px]">
        <span className="text-[9px] font-mono tracking-widest uppercase text-text-quaternary">
          Issues
        </span>
        <span className="text-[10px] font-mono text-text-quaternary">
          {issues.length} total
        </span>
      </div>

      {/* Filter pills */}
      {issues.length > 0 && (
        <div className="flex gap-[4px] mb-[10px] flex-wrap" role="group" aria-label="Filter issues by severity">
          {(["all", "critical", "warn", "info"] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "text-[10px] font-mono px-[8px] py-[3px] rounded-[4px] border cursor-pointer transition-all tracking-[0.02em]",
                filter === f
                  ? "bg-text-primary text-white border-text-primary"
                  : "bg-white text-text-tertiary border-[#D8D5CE] hover:border-[#B8B5AE]"
              )}
            >
              {f === "all" ? `All (${counts.all})` : f === "critical" ? `Critical (${counts.critical})` : f === "warn" ? `Warn (${counts.warn})` : `Info (${counts.info})`}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-[12px] text-text-tertiary py-[6px]">No issues match this filter.</p>
      )}

      {/* Issue table */}
      {filtered.length > 0 && (
        <div className="border border-border rounded-[5px] overflow-hidden">
          {/* Column header */}
          <div className="grid grid-cols-[80px_1fr_minmax(0,200px)_60px] bg-[#F8F7F4] border-b border-border px-[12px] py-[6px] gap-[12px]">
            <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary">Severity</div>
            <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary">Message</div>
            <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary hidden sm:block">Element</div>
            <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary text-right">Value</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border bg-white">
            {paginated.map((issue, i) => (
              <div
                key={`${issue.severity}-${i}`}
                className="grid grid-cols-[80px_1fr_minmax(0,200px)_60px] px-[12px] py-[9px] gap-[12px] items-center hover:bg-[#FAFAF8] transition-colors"
                role="row"
                aria-label={`${issue.severity}: ${issue.message}`}
              >
                {/* Severity badge */}
                <div>
                  <span className={cn(
                    "text-[8px] font-mono tracking-[0.06em] uppercase px-[5px] py-[2px] rounded-[3px] border inline-block",
                    severityBadgeStyle[issue.severity]
                  )}>
                    {severityLabel[issue.severity]}
                  </span>
                </div>

                {/* Message */}
                <div className="text-[12px] text-text-primary leading-[1.35] min-w-0">
                  {issue.message}
                </div>

                {/* Element selector */}
                <div className="hidden sm:block min-w-0">
                  {issue.element ? (
                    <span
                      className="font-mono text-[10px] text-text-tertiary block truncate"
                      title={issue.element}
                    >
                      {issue.element.length > 40 ? '…' + issue.element.slice(-40) : issue.element}
                    </span>
                  ) : (
                    <span className="text-[10px] text-text-quaternary">—</span>
                  )}
                </div>

                {/* Value */}
                <div className="text-right">
                  {issue.value ? (
                    <span className={cn(
                      "font-mono text-[11px]",
                      issue.severity === "critical" ? "text-grade-critical" :
                      issue.severity === "warn"     ? "text-grade-warn" :
                      "text-text-tertiary"
                    )}>
                      {issue.value}
                    </span>
                  ) : (
                    <span className="text-[11px] text-text-quaternary">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-[12px] py-[8px] border-t border-border bg-[#F8F7F4]">
              <span className="text-[10px] font-mono text-text-quaternary">
                {rangeStart}–{rangeEnd} of {filtered.length}
              </span>
              <div className="flex items-center gap-[4px]">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-[10px] font-mono px-[8px] py-[3px] rounded-[4px] border border-[#D8D5CE] bg-white text-text-secondary hover:bg-[#F5F4F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ←
                </button>
                {pageRange.map((p, i) =>
                  p === "…" ? (
                    <span key={`e${i}`} className="text-[10px] text-text-quaternary px-[4px]">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      aria-current={p === page ? "page" : undefined}
                      className={cn(
                        "w-[24px] h-[24px] flex items-center justify-center rounded-[4px] text-[10px] font-mono transition-colors",
                        p === page ? "bg-text-primary text-white" : "text-text-secondary hover:bg-[#F5F4F0]"
                      )}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="text-[10px] font-mono px-[8px] py-[3px] rounded-[4px] border border-[#D8D5CE] bg-white text-text-secondary hover:bg-[#F5F4F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
