"use client"

import React from 'react'

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
  if (score >= 70) return { grade: 'Good', colorClass: 'text-grade-good' }
  if (score >= 50) return { grade: 'Needs work', colorClass: 'text-grade-warn' }
  return { grade: 'Critical', colorClass: 'text-grade-critical' }
}

function getScoreColorClass(score: number) {
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

  // Calculate widths for the segment bar based on relative scores
  // (In the prototype, these sum to 90%, with gap handling the rest, but we'll use relative percentages)
  const totalRaw = scores.contrast + scores.altText + scores.typography + scores.spacing;
  const wC = `${Math.round((scores.contrast / totalRaw) * 100)}%`;
  const wA = `${Math.round((scores.altText / totalRaw) * 100)}%`;
  const wT = `${Math.round((scores.typography / totalRaw) * 100)}%`;
  const wS = `${Math.round((scores.spacing / totalRaw) * 100)}%`;

  return (
    <div className="px-[24px] pt-[28px] pb-[20px] border-b border-border bg-bg-subtle">
      <div className="flex items-start justify-between mb-[20px]">
        <div>
          <h1 className="text-[17px] font-semibold text-text-primary tracking-[-0.02em] m-0">
            {url}
          </h1>
          <p className="text-[11px] font-mono text-text-secondary mt-[3px]">
            {dateStr} · {timeStr}
          </p>
        </div>
        <div className="flex gap-[8px] hide-on-print">
          <button 
            className="text-[12px] font-sans px-[14px] py-[6px] rounded-[8px] border border-border bg-white text-text-secondary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle inline-flex items-center gap-[5px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copied to clipboard")
            }}
            aria-label="Share audit result"
          >
            <svg viewBox="0 0 13 13" aria-hidden="true" className="w-[13px] h-[13px] stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
              <circle cx="10" cy="2.5" r="1.5"/>
              <circle cx="2.5" cy="6.5" r="1.5"/>
              <circle cx="10" cy="10.5" r="1.5"/>
              <path d="M4 5.5l4.5-2.5M4 7.5l4.5 2.5"/>
            </svg>
            Share
          </button>
          <button 
            className="text-[12px] font-sans px-[14px] py-[6px] rounded-[8px] border border-border bg-white text-text-secondary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle inline-flex items-center gap-[5px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            onClick={() => window.print()}
            aria-label="Download PDF report"
          >
            <svg viewBox="0 0 13 13" aria-hidden="true" className="w-[13px] h-[13px] stroke-current fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
              <path d="M6.5 2v6M4 6l2.5 2.5L9 6M2 10v.5a1 1 0 001 1h7a1 1 0 001-1V10"/>
            </svg>
            PDF
          </button>
        </div>
      </div>
      
      <div className="flex items-end gap-[12px] mb-[16px]">
        <div className={`font-display text-[80px] leading-[0.9] tracking-[-0.02em] font-normal ${colorClass}`} aria-label={`Overall score: ${score} out of 100`}>
          {score}
        </div>
        <div className="pb-[7px]">
          <span className={`text-[12px] font-mono font-medium tracking-[0.08em] uppercase block mb-[4px] ${colorClass}`}>
            {grade}
          </span>
          <span className="text-[12px] text-text-tertiary">Overall score</span>
        </div>
      </div>

      <div aria-hidden="true">
        <div className="flex h-[8px] rounded-[4px] overflow-hidden gap-[2px] mb-[6px]">
          <div className={`h-full rounded-[2px] ${getScoreColorClass(scores.contrast)}`} style={{ width: wC }} title={`Contrast ${scores.contrast}`}></div>
          <div className={`h-full rounded-[2px] ${getScoreColorClass(scores.altText)}`} style={{ width: wA }} title={`Alt text ${scores.altText}`}></div>
          <div className={`h-full rounded-[2px] ${getScoreColorClass(scores.typography)}`} style={{ width: wT }} title={`Typography ${scores.typography}`}></div>
          <div className={`h-full rounded-[2px] ${getScoreColorClass(scores.spacing)}`} style={{ width: wS }} title={`Spacing ${scores.spacing}`}></div>
        </div>
        <div className="flex gap-[2px]">
          <span className="text-[9px] font-mono text-text-quaternary tracking-[0.04em] uppercase flex-1 text-center">Contrast</span>
          <span className="text-[9px] font-mono text-text-quaternary tracking-[0.04em] uppercase flex-1 text-center">Alt text</span>
          <span className="text-[9px] font-mono text-text-quaternary tracking-[0.04em] uppercase flex-1 text-center">Type</span>
          <span className="text-[9px] font-mono text-text-quaternary tracking-[0.04em] uppercase flex-1 text-center">Space</span>
        </div>
      </div>
    </div>
  )
}
