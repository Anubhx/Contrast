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
    <div className="flex flex-col min-h-screen bg-[#F8F7F4]">
      <div className="hide-on-print">
        <Nav />
      </div>

      <main
        className="grid grid-cols-[320px_1fr] w-full max-w-[1360px] mx-auto my-[32px] border border-border rounded-[8px] overflow-hidden shadow-[0_2px_8px_rgba(16,15,10,0.08),0_1px_2px_rgba(16,15,10,0.04)] bg-white hide-on-print"
        style={{ minHeight: 'calc(100vh - 180px)' }}
      >
        {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
        <aside className="border-r border-border flex flex-col bg-white" aria-label="Audit summary">
          <ScoreHeader
            score={result.scores.overall}
            url={result.url}
            auditedAt={result.auditedAt}
            scores={result.scores}
          />
          <CategoryGrid scores={result.scores} issues={result.issues} />

          {/* Audit summary metrics — 2-col data grid */}
          <div className="px-[20px] pt-[18px] pb-[20px] border-t border-border">
            <div className="text-[9px] font-mono tracking-widest uppercase text-text-quaternary mb-[12px]">
              Audit Summary
            </div>
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
              <MetricCell n="342" label="Text pairs" />
              <MetricCell n="89"  label="Colour pairs" />
              <MetricCell n="51"  label="Images" />
              <MetricCell n="4"   label="Font families" />
              <MetricCell n="128" label="Spacing samples" />
              <MetricCell n="AA"  label="WCAG level" />
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN CONTENT ───────────────────────────────── */}
        <div className="p-[28px_36px] flex flex-col gap-0 overflow-auto">
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

function MetricCell({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-[20px] font-semibold text-text-primary leading-none">{n}</div>
      <div className="text-[10px] text-text-tertiary mt-[2px]">{label}</div>
    </div>
  )
}
