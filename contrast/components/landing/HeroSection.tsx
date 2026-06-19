"use client";

import React from 'react';
import { AuditInput } from '@/components/landing/AuditInput';

interface HeroSectionProps {
  onAuditSubmit: (url: string) => void;
  loading: boolean;
  error?: string;
}

export function HeroSection({ onAuditSubmit, loading, error }: HeroSectionProps) {
  return (
    <section className="relative pt-[72px] pb-[48px] px-[40px] overflow-hidden">
      {/* Two-column hero layout */}
      <div className="flex items-center gap-[80px] max-w-[1200px]">

        {/* LEFT — headline + input */}
        <div className="flex-1 min-w-0 max-w-[520px]">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-[6px] text-[11px] font-mono text-text-tertiary tracking-[0.06em] uppercase mb-[24px]">
            <span className="w-[5px] h-[5px] rounded-full bg-grade-excellent shrink-0" />
            WCAG 2.1 AA · Free · No login
          </div>

          <h1 className="text-[52px] font-semibold tracking-[-0.036em] leading-[1.06] text-text-primary mb-[16px]">
            Find the design debt<br />
            <em className="font-display italic font-normal text-text-secondary">your team stopped seeing.</em>
          </h1>

          <p className="text-[15px] text-text-secondary leading-[1.6] mb-[32px]">
            AI-assisted accessibility and design consistency audits. Contrast ratios, missing alt text, typography drift, spacing grid — scored in under 15 seconds.
          </p>

          <AuditInput onSubmit={onAuditSubmit} loading={loading} error={error} />

          {/* Stat row */}
          <div className="flex items-center gap-[24px] mt-[20px] flex-wrap">
            {[
              { n: '342', label: 'text pairs checked' },
              { n: '89',  label: 'colour pairs' },
              { n: '51',  label: 'images scanned' },
              { n: '4',   label: 'font families' },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-baseline gap-[5px]">
                <span className="text-[15px] font-semibold font-mono text-text-primary">{n}</span>
                <span className="text-[11px] text-text-tertiary">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — static preview card (purely decorative) */}
        <div className="hidden xl:block flex-shrink-0 w-[500px]">
          <HeroPreviewCard />
        </div>
      </div>
    </section>
  );
}

/** Purely decorative static audit result card — no JS, no state */
function HeroPreviewCard() {
  return (
    <div className="bg-white border border-border rounded-[10px] shadow-[0_4px_24px_rgba(16,15,10,0.10),0_1px_4px_rgba(16,15,10,0.06)] overflow-hidden">
      {/* Card header */}
      <div className="flex items-start justify-between px-[20px] pt-[18px] pb-[14px] border-b border-border">
        <div>
          <div className="text-[13px] font-semibold text-text-primary tracking-[-0.01em]">linear.app</div>
          <div className="text-[10px] font-mono text-text-quaternary mt-[2px]">Audited Jun 19, 2025 · 11.4s</div>
        </div>
        <div className="text-right">
          <div className="font-display text-[48px] font-normal leading-[1] text-grade-good">87</div>
          <div className="text-[9px] font-mono text-grade-good tracking-[0.08em] uppercase">Good</div>
        </div>
      </div>

      {/* Segmented bar */}
      <div className="flex h-[4px] gap-[2px] mx-[20px] mt-[12px]">
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '34%' }} />
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '22%' }} />
        <div className="h-full rounded-[2px] bg-grade-good"      style={{ width: '24%' }} />
        <div className="h-full rounded-[2px] bg-grade-warn"      style={{ width: '16%' }} />
      </div>

      {/* Category scores */}
      <div className="grid grid-cols-4 gap-[1px] bg-border mt-[12px] border-y border-border">
        {[
          { label: 'Contrast',   score: 91, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent' },
          { label: 'Alt text',   score: 84, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent' },
          { label: 'Typography', score: 88, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent' },
          { label: 'Spacing',    score: 71, colorClass: 'text-grade-good',      bgClass: 'bg-grade-good'      },
        ].map(({ label, score, colorClass, bgClass }) => (
          <div key={label} className="bg-white px-[12px] py-[10px]">
            <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary mb-[4px]">{label}</div>
            <div className={`font-mono text-[18px] font-medium leading-none mb-[4px] ${colorClass}`}>{score}</div>
            <div className="h-[2px] bg-bg-subtle rounded-full overflow-hidden">
              <div className={`h-full ${bgClass}`} style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Issues */}
      <div className="px-[20px] py-[14px]">
        <div className="text-[9px] font-mono uppercase tracking-[0.08em] text-text-quaternary mb-[8px]">Top issues</div>
        {[
          { badge: 'Critical', badgeStyle: 'text-grade-critical border-grade-critical bg-[#FEF2F2]', msg: '.nav-link contrast 2.1:1 — needs 4.5:1', val: '2.1:1', valStyle: 'text-grade-critical' },
          { badge: 'Critical', badgeStyle: 'text-grade-critical border-grade-critical bg-[#FEF2F2]', msg: 'img.hero-banner missing alt text',       val: '—',    valStyle: 'text-grade-critical' },
          { badge: 'Warn',     badgeStyle: 'text-grade-warn border-grade-warn bg-[#FFFBEB]',         msg: 'Placeholder text contrast 2.9:1',        val: '2.9:1', valStyle: 'text-grade-warn'     },
          { badge: 'Info',     badgeStyle: 'text-text-tertiary border-border bg-bg-subtle',           msg: '4 font families detected',               val: '4',     valStyle: 'text-text-tertiary'  },
        ].map(({ badge, badgeStyle, msg, val, valStyle }, i) => (
          <div key={i} className="flex items-center gap-[8px] py-[6px] border-b border-border last:border-b-0">
            <span className={`text-[8px] font-mono tracking-[0.06em] px-[5px] py-[1.5px] rounded-[3px] border uppercase shrink-0 ${badgeStyle}`}>{badge}</span>
            <span className="text-[11px] text-text-secondary flex-1 truncate">{msg}</span>
            <span className={`font-mono text-[11px] font-medium shrink-0 ${valStyle}`}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
