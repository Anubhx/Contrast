"use client"

import { useState, useEffect } from "react"
import { AuditIssue } from "@/lib/types"
import { IssueRow } from "@/components/ui/IssueRow"
import { cn } from "@/lib/utils"

interface IssueListProps {
  issues: AuditIssue[]
}

type FilterType = 'all' | 'critical' | 'warn' | 'info'

const PAGE_SIZE = 10

export function IssueList({ issues }: IssueListProps) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [page, setPage] = useState(1)

  // Reset page when filter changes
  useEffect(() => {
    setPage(1)
  }, [filter])

  const filteredIssues = issues.filter(issue => 
    filter === 'all' || issue.severity === filter
  )

  const counts = {
    all: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length,
    warn: issues.filter(i => i.severity === 'warn').length,
    info: issues.filter(i => i.severity === 'info').length,
  }

  // Sort: critical -> warn -> info
  const severityOrder = { critical: 0, warn: 1, info: 2 }
  const sortedIssues = [...filteredIssues].sort((a, b) => 
    severityOrder[a.severity] - severityOrder[b.severity]
  )

  const totalPages = Math.ceil(sortedIssues.length / PAGE_SIZE)
  const paginatedIssues = sortedIssues.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mb-[32px]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          {issues.length} issues found
        </h2>
        <span className="text-[12px] font-mono text-text-tertiary bg-bg-subtle border border-border px-[10px] py-[3px] rounded-[20px]" aria-label={`${issues.length} total`}>
          {issues.length} total
        </span>
      </div>

      {issues.length > 0 && (
        <div className="flex gap-[6px] mb-[22px] flex-wrap" role="group" aria-label="Filter by severity">
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            label={`All (${counts.all})`}
          />
          <FilterButton 
            active={filter === 'critical'} 
            onClick={() => setFilter('critical')}
            label={`Critical (${counts.critical})`}
          />
          <FilterButton 
            active={filter === 'warn'} 
            onClick={() => setFilter('warn')}
            label={`Warnings (${counts.warn})`}
          />
          <FilterButton 
            active={filter === 'info'} 
            onClick={() => setFilter('info')}
            label={`Info (${counts.info})`}
          />
        </div>
      )}

      {sortedIssues.length === 0 ? (
        <p className="text-[13px] text-text-secondary">No issues match this filter.</p>
      ) : (
        <div className="flex flex-col">
          {/* We will group issues by severity as shown in the prototype */}
          {(['critical', 'warn', 'info'] as const).map(sev => {
            const sevIssues = paginatedIssues.filter(i => i.severity === sev)
            if (sevIssues.length === 0) return null

            let label = ''
            let colorClass = ''

            if (sev === 'critical') {
              label = 'Critical'
              colorClass = 'bg-grade-critical/10 text-grade-critical'
            } else if (sev === 'warn') {
              label = 'Warnings'
              colorClass = 'bg-grade-warn/10 text-grade-warn'
            } else {
              label = 'Info'
              colorClass = 'bg-bg-subtle text-text-tertiary'
            }

            return (
              <div key={sev} className="mb-[22px]" aria-labelledby={`ig-${sev}`}>
                <div className={`text-[10px] font-mono tracking-[0.08em] uppercase px-[10px] py-[5px] rounded-[4px] mb-[8px] inline-flex items-center gap-[6px] ${colorClass}`} id={`ig-${sev}`}>
                  {label} <span className="text-[10px] font-mono opacity-65">· {sevIssues.length} on this page</span>
                </div>
                {sevIssues.map((issue, i) => (
                  <IssueRow 
                    key={i}
                    severity={issue.severity}
                    message={issue.message}
                    element={issue.element}
                    value={issue.value}
                  />
                ))}
              </div>
            )
          })}
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-[16px] mt-[8px] border-t border-border">
              <span className="text-[12px] text-text-tertiary font-mono">
                Showing {((page - 1) * PAGE_SIZE) + 1}-{Math.min(page * PAGE_SIZE, sortedIssues.length)} of {sortedIssues.length}
              </span>
              <div className="flex items-center gap-[8px]">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-[12px] font-sans px-[12px] py-[6px] rounded-[6px] border border-border bg-white text-text-secondary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <div className="flex gap-[4px]">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={cn(
                        "w-[28px] h-[28px] flex items-center justify-center rounded-[6px] text-[12px] font-mono transition-colors",
                        p === page 
                          ? "bg-text-primary text-white" 
                          : "text-text-secondary hover:bg-bg-subtle"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="text-[12px] font-sans px-[12px] py-[6px] rounded-[6px] border border-border bg-white text-text-secondary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle disabled:opacity-50 disabled:cursor-not-allowed"
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

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "text-[11px] font-mono px-[12px] py-[5px] rounded-[20px] border cursor-pointer transition-all tracking-[0.02em] bg-white text-text-tertiary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        active 
          ? "bg-text-primary text-white border-text-primary" 
          : "border-border hover:border-border-subtle hover:text-text-secondary"
      )}
    >
      {label}
    </button>
  )
}
