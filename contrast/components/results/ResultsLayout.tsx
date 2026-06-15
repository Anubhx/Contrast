import React from 'react'
import { AuditResult } from "@/lib/types"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { ScoreHeader } from "./ScoreHeader"
import { CategoryGrid } from "./CategoryGrid"
import { DesignSmells } from "./DesignSmells"
import { TopFixes } from "./TopFixes"
import { QuickWins } from "./QuickWins"
import { IssueList } from "./IssueList"
import { ScreenshotViewer } from "./ScreenshotViewer"
import { PdfReport } from "./PdfReport"

interface ResultsLayoutProps {
  result: AuditResult
}

export function ResultsLayout({ result }: ResultsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="hide-on-print">
        <Nav />
      </div>

      <main className="grid grid-cols-[360px_1fr] min-h-[900px] w-[1440px] mx-auto mb-[96px] border border-border rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(16,15,10,0.10),0_2px_6px_rgba(16,15,10,0.06)] bg-white hide-on-print">
        {/* Left Sidebar (Score and Categories) */}
        <aside className="border-r border-border flex flex-col" aria-label="Audit summary">
          <ScoreHeader 
            score={result.scores.overall} 
            url={result.url} 
            auditedAt={result.auditedAt}
            scores={result.scores}
          />
          <CategoryGrid 
            scores={result.scores} 
            issues={result.issues} 
          />
          
          {/* Summary Panel */}
          <div className="p-[20px_24px] border-b border-border">
            <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-text-tertiary mb-[14px]">
              Audit summary
            </div>
            <SummaryRow label="Text pairs checked" value="342" />
            <SummaryRow label="Colour pairs extracted" value="89" />
            <SummaryRow label="Images found" value="51" />
            <SummaryRow label="Images with alt text" value="20 / 51" />
            <SummaryRow label="Font families" value="4" />
            <SummaryRow label="Spacing values sampled" value="128" />
            <SummaryRow label="WCAG level" value="AA 2.1" />
          </div>
        </aside>

        {/* Right Main Content (Issues and Screenshot) */}
        <div className="p-[36px_40px]">
          <TopFixes fixes={result.prioritizedFixes?.topFixes} estimatedImpact={result.estimatedImpact} />
          <DesignSmells smells={result.designSmells} />
          <QuickWins wins={result.prioritizedFixes?.quickWins} />
          <IssueList issues={result.issues} />
          
          <ScreenshotViewer screenshotUrl={result.screenshotUrl} url={result.url} />
        </div>
      </main>

      <PdfReport result={result} />

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
