"use client"

import React, { useState } from 'react'

interface ScoreHeaderProps {
  score: number;
  url: string;
  auditedAt: string;
  scores: {
    contrast: number;
    altText: number;
    typography: number;
    spacing: number;
  };
}

function getGradeInfo(score: number) {
  if (score >= 85) return { grade: 'Excellent', colorClass: 'text-grade-excellent' }
  if (score >= 70) return { grade: 'Good',      colorClass: 'text-grade-good'      }
  if (score >= 50) return { grade: 'Needs work',colorClass: 'text-grade-warn'      }
  return { grade: 'Critical', colorClass: 'text-grade-critical' }
}

function getBarColor(score: number) {
  if (score >= 85) return 'bg-grade-excellent'
  if (score >= 70) return 'bg-grade-good'
  if (score >= 50) return 'bg-grade-warn'
  return 'bg-grade-critical'
}

export function ScoreHeader({ score, url, auditedAt, scores }: ScoreHeaderProps) {
  const dateObj = new Date(auditedAt)
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const { grade, colorClass } = getGradeInfo(score)

  const [copied, setCopied] = useState(false)
  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Clean display URL
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className="px-[20px] pt-[20px] pb-[16px] border-b border-border">
      {/* URL + action buttons */}
      <div className="flex items-start justify-between gap-[8px] mb-[16px]">
        <div className="min-w-0">
          <h1
            className="text-[13px] font-semibold text-text-primary tracking-[-0.01em] truncate m-0"
            title={url}
          >
            {displayUrl}
          </h1>
          <p className="text-[10px] font-mono text-text-quaternary mt-[2px]">
            {dateStr} · {timeStr}
          </p>
        </div>
        <div className="flex gap-[6px] shrink-0 hide-on-print">
          <button
            onClick={handleShare}
            aria-label="Copy share link"
            className="text-[11px] font-sans px-[10px] py-[4px] rounded-[5px] border border-[#D8D5CE] bg-white text-text-secondary cursor-pointer transition-colors hover:bg-[#F5F4F0] inline-flex items-center gap-[4px] min-w-[60px] justify-center"
          >
            {copied ? (
              <span className="text-grade-good font-medium">Copied!</span>
            ) : (
              <>
                <svg viewBox="0 0 12 12" className="w-[11px] h-[11px] stroke-current fill-none shrink-0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9.5" cy="2.5" r="1.5"/><circle cx="2.5" cy="6" r="1.5"/><circle cx="9.5" cy="9.5" r="1.5"/>
                  <path d="M4 5.5l4 -2.5M4 6.5l4 2.5"/>
                </svg>
                Share
              </>
            )}
          </button>
          <a
            href={`${typeof window !== 'undefined' ? window.location.pathname : ''}/report`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open PDF report"
            className="text-[11px] font-sans px-[10px] py-[4px] rounded-[5px] border border-[#D8D5CE] bg-white text-text-secondary cursor-pointer transition-colors hover:bg-[#F5F4F0] inline-flex items-center gap-[4px] no-underline"
          >
            <svg viewBox="0 0 12 12" className="w-[11px] h-[11px] stroke-current fill-none shrink-0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2v5M4 5.5L6 7.5 8 5.5M2 9.5v.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V9.5"/>
            </svg>
            PDF
          </a>
        </div>
      </div>

      {/* Big score */}
      <div className="flex items-end gap-[10px] mb-[14px]">
        <div
          className={`font-display text-[88px] leading-[0.88] tracking-[-0.03em] font-normal ${colorClass}`}
          aria-label={`Overall score: ${score} out of 100`}
        >
          {score}
        </div>
        <div className="pb-[8px]">
          <span className={`text-[11px] font-mono font-medium tracking-[0.08em] uppercase block ${colorClass}`}>
            {grade}
          </span>
          <span className="text-[10px] text-text-quaternary">Overall score</span>
        </div>
      </div>

      {/* Category score bars — proportional pixel widths */}
      <div aria-hidden="true">
        {[
          { label: 'Contrast',   score: scores.contrast  },
          { label: 'Alt text',   score: scores.altText   },
          { label: 'Typography', score: scores.typography },
          { label: 'Spacing',    score: scores.spacing   },
        ].map(({ label, score: s }) => (
          <div key={label} className="flex items-center gap-[8px] mb-[5px]">
            <div className="text-[9px] font-mono text-text-quaternary w-[58px] shrink-0 uppercase tracking-[0.04em]">
              {label}
            </div>
            <div className="flex-1 h-[4px] bg-bg-subtle rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getBarColor(s)}`}
                style={{ width: `${s}%` }}
              />
            </div>
            <div className={`text-[10px] font-mono w-[24px] text-right ${
              s >= 85 ? 'text-grade-excellent' : s >= 70 ? 'text-grade-good' : s >= 50 ? 'text-grade-warn' : 'text-grade-critical'
            }`}>
              {s}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
