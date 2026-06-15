"use client"

import { useState } from "react"
import { AuditIssue } from "@/lib/types"
import { IssueRow } from "@/components/ui/IssueRow"
import { cn } from "@/lib/utils"

interface IssueListProps {
  issues: AuditIssue[]
}

type FilterType = 'all' | 'critical' | 'warn' | 'info'

export function IssueList({ issues }: IssueListProps) {
  const [filter, setFilter] = useState<FilterType>('all')

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

  return (
    <div className="px-[24px] py-[32px]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          Issues found
        </h2>
        <span className="text-[12px] font-mono text-text-secondary bg-bg-subtle border border-border px-[10px] py-[3px] rounded-[20px]">
          {issues.length} total
        </span>
      </div>

      {issues.length > 5 && (
        <div className="flex gap-[6px] mb-[22px] flex-wrap">
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
            label={`Warn (${counts.warn})`}
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
          {sortedIssues.map((issue, i) => (
            <IssueRow 
              key={i}
              severity={issue.severity}
              message={issue.message}
              element={issue.element}
              value={issue.value}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-[11px] font-mono px-[12px] py-[5px] rounded-[20px] border cursor-pointer transition-all tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        active 
          ? "bg-text-primary text-[#0C0C0D] border-text-primary" 
          : "bg-white  text-text-secondary border-border hover:border-border-subtle hover:text-text-primary"
      )}
    >
      {label}
    </button>
  )
}
