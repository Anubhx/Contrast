"use client"

import { AuditResult } from "@/lib/types"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { ScoreHeader } from "@/components/audit/ScoreHeader"
import { CategoryGrid } from "@/components/audit/CategoryGrid"
import { IssueList } from "@/components/audit/IssueList"
import { ScreenshotViewer } from "@/components/audit/ScreenshotViewer"

interface AuditResultsProps {
  result: AuditResult
}

export function AuditResults({ result }: AuditResultsProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <div className="hide-on-print">
        <Nav />
      </div>

      <main className="flex-1 flex justify-center pb-[96px] pt-[40px] px-[40px] hide-on-print">
        <div className="w-full max-w-[1440px] border border-border rounded-[16px] overflow-hidden shadow-sm bg-white  grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-[900px]">
          {/* Left Sidebar (Score and Categories) */}
          <aside className="border-r border-border flex flex-col">
            <ScoreHeader 
              score={result.scores.overall} 
              url={result.url} 
              auditedAt={result.auditedAt} 
            />
            <CategoryGrid 
              scores={result.scores} 
              issues={result.issues} 
            />
            
            {/* Summary Panel */}
            <div className="p-[20px_24px] border-b border-border">
              <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-text-secondary mb-[14px]">
                What we checked
              </div>
              <SummaryRow label="Text pairs checked" value="142" />
              <SummaryRow label="Images checked" value="38" />
              <SummaryRow label="Images with alt text" value="38 / 38" />
              <SummaryRow label="Font families" value="2" />
              <SummaryRow label="Spacing values sampled" value="96" />
              <SummaryRow label="On-grid values" value="96 / 96" />
            </div>
          </aside>

          {/* Right Main Content (Issues and Screenshot) */}
          <div className="flex flex-col">
            <IssueList issues={result.issues} />
            <ScreenshotViewer screenshotUrl={result.screenshotUrl} url={result.url} />
          </div>
        </div>
      </main>

      {/* Very basic print layout fallback */}
      <div className="hidden print-only p-8 text-black bg-white">
        <h1 className="text-2xl font-bold mb-4">{result.url}</h1>
        <p className="text-sm mb-8">Score: {result.scores.overall}/100</p>
        <p className="text-sm mb-8">This is the print view. Please check /report for the optimized PDF view.</p>
      </div>

      <div className="hide-on-print mt-auto">
        <Footer />
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-[6px] border-b border-border last:border-b-0">
      <span className="text-[12px] text-text-secondary">{label}</span>
      <span className="text-[12px] font-mono font-medium text-text-primary">{value}</span>
    </div>
  )
}
