import React from 'react'
import { AuditResult } from "@/lib/types"

interface OgCardProps {
  result: AuditResult
}

export function OgCard({ result }: OgCardProps) {
  return (
    <div className="w-[1200px] h-[630px] bg-bg-subtle border border-border flex overflow-hidden">
      <div className="w-[60%] p-[56px_64px] flex flex-col justify-between border-r border-border bg-white">
        <div className="font-display italic text-[15px] text-text-tertiary">Contrast</div>
        <div className="flex-1 flex flex-col justify-center py-[32px]">
          <p className="text-[11px] tracking-[0.1em] uppercase font-mono text-text-tertiary mb-[10px]">Design audit for</p>
          <p className="text-[52px] font-semibold tracking-[-0.04em] text-text-primary leading-none mb-[28px]">{result.url}</p>
          <div>
            <div className="font-display text-[128px] font-normal leading-[0.88] tracking-[-0.02em] text-grade-good">{result.scores.overall}</div>
            <p className="text-[13px] font-mono text-text-tertiary mt-[8px]">Good · Jun 14, 2025 · {result.issues.length} issues found</p>
          </div>
        </div>
        <p className="text-[12px] font-mono text-text-tertiary">audit.contrast.app/audit/{result.id}</p>
      </div>
      
      <div className="flex-1 p-[56px_48px] flex flex-col justify-center gap-0">
        <div className="py-[18px] border-b border-border flex flex-col gap-[6px]">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-tertiary">Color contrast</span>
            <span className="font-mono text-[18px] font-medium text-grade-excellent">{result.scores.contrast}</span>
          </div>
          <div className="h-[2px] bg-border rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-excellent" style={{ width: `${result.scores.contrast}%` }}></div>
          </div>
        </div>

        <div className="py-[18px] border-b border-border flex flex-col gap-[6px]">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-tertiary">Alt text</span>
            <span className="font-mono text-[18px] font-medium text-grade-critical">{result.scores.altText}</span>
          </div>
          <div className="h-[2px] bg-border rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-critical" style={{ width: `${result.scores.altText}%` }}></div>
          </div>
        </div>

        <div className="py-[18px] border-b border-border flex flex-col gap-[6px]">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-tertiary">Typography</span>
            <span className="font-mono text-[18px] font-medium text-grade-excellent">{result.scores.typography}</span>
          </div>
          <div className="h-[2px] bg-border rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-excellent" style={{ width: `${result.scores.typography}%` }}></div>
          </div>
        </div>

        <div className="py-[18px] flex flex-col gap-[6px]">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-tertiary">Spacing</span>
            <span className="font-mono text-[18px] font-medium text-grade-excellent">{result.scores.spacing}</span>
          </div>
          <div className="h-[2px] bg-border rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-excellent" style={{ width: `${result.scores.spacing}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
