import React from 'react';

export function HeroPreviewCard() {
  return (
    <div className="bg-white border border-[#E8E5DE] rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Card header */}
      <div className="flex items-start justify-between px-[20px] pt-[18px] pb-[14px] border-b border-border">
        <div>
          <div className="text-[13px] font-semibold text-text-primary tracking-[-0.01em]">linear.app</div>
          <div className="text-[10px] font-mono text-text-quaternary mt-[2px]">Audited Jun 19, 2025 · 11.4s</div>
        </div>
        <div className="text-right">
          <div className="font-display italic text-[88px] font-normal leading-[0.88] tracking-[-0.03em] text-grade-good">87</div>
          <div className="text-[11px] font-mono text-grade-good tracking-[0.08em] uppercase mt-[8px]">Good</div>
        </div>
      </div>

      {/* Segmented bar */}
      <div className="flex h-[4px] gap-[2px] mx-[20px] mt-[16px] mb-[12px]">
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '34%' }} />
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '22%' }} />
        <div className="h-full rounded-[2px] bg-grade-good"      style={{ width: '24%' }} />
        <div className="h-full rounded-[2px] bg-grade-warn"      style={{ width: '16%' }} />
      </div>

      {/* Category scores */}
      <div className="grid grid-cols-4 gap-[1px] bg-border border-y border-border">
        {[
          { label: 'Contrast',   score: 91, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent' },
          { label: 'Alt text',   score: 100, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent' },
          { label: 'Typography', score: 85, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent' },
          { label: 'Spacing',    score: 78, colorClass: 'text-grade-good',      bgClass: 'bg-grade-good'      },
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
          { badge: 'Warn', badgeStyle: 'text-grade-warn border-grade-warn bg-[#FFFBEB]', msg: 'Placeholder text contrast 2.9:1', val: '2.9:1', valStyle: 'text-grade-warn' },
          { badge: 'Info', badgeStyle: 'text-text-tertiary border-border bg-bg-subtle', msg: '4 font families detected', val: '4', valStyle: 'text-text-tertiary' },
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
