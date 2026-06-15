import React from 'react';

export function HeroPreviewCard() {
  return (
    <aside className="absolute right-[40px] top-[48px] w-[580px] z-10 bg-bg-base border border-border rounded-[14px] shadow-[0_4px_20px_rgba(16,15,10,0.10),0_2px_6px_rgba(16,15,10,0.06)] overflow-hidden hidden xl:block">
      <div className="p-[20px_24px_16px] border-b border-border flex items-start justify-between">
        <div>
          <div className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">stripe.com</div>
          <div className="text-[11px] font-mono text-text-tertiary mt-[3px]">Audited Jun 14, 2025 · 1.2s</div>
        </div>
        <div>
          <div className="font-display text-[44px] font-normal leading-[1] text-grade-good text-right">74</div>
          <div className="text-[11px] font-mono text-grade-good tracking-[0.06em] text-right uppercase">Good</div>
        </div>
      </div>
      <div className="flex h-[5px] gap-[2px] mx-[24px] mt-[14px] rounded-[3px] overflow-hidden">
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '36%' }}></div>
        <div className="h-full rounded-[2px] bg-grade-critical" style={{ width: '27%' }}></div>
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '15%' }}></div>
        <div className="h-full rounded-[2px] bg-grade-excellent" style={{ width: '14%' }}></div>
      </div>
      <div className="grid grid-cols-4 mt-[14px]">
        <div className="p-[14px_16px] border-r border-t border-border">
          <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Contrast</div>
          <div className="font-mono text-[18px] font-medium text-grade-excellent mb-[4px]">91</div>
          <div className="h-[2px] bg-bg-subtle rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-excellent" style={{ width: '91%' }}></div>
          </div>
        </div>
        <div className="p-[14px_16px] border-r border-t border-border">
          <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Alt text</div>
          <div className="font-mono text-[18px] font-medium text-grade-critical mb-[4px]">38</div>
          <div className="h-[2px] bg-bg-subtle rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-critical" style={{ width: '38%' }}></div>
          </div>
        </div>
        <div className="p-[14px_16px] border-r border-t border-border">
          <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Typography</div>
          <div className="font-mono text-[18px] font-medium text-grade-excellent mb-[4px]">82</div>
          <div className="h-[2px] bg-bg-subtle rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-excellent" style={{ width: '82%' }}></div>
          </div>
        </div>
        <div className="p-[14px_16px] border-t border-border">
          <div className="text-[10px] font-mono tracking-[0.06em] text-text-tertiary uppercase mb-[6px]">Spacing</div>
          <div className="font-mono text-[18px] font-medium text-grade-excellent mb-[4px]">88</div>
          <div className="h-[2px] bg-bg-subtle rounded-[1px] overflow-hidden">
            <div className="h-full rounded-[1px] bg-grade-excellent" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>
      <div className="p-[4px_24px_20px]">
        <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-text-tertiary mb-[10px] mt-[12px]">Top issues</div>
        <div className="flex items-center gap-[10px] py-[7px] border-b border-border">
          <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-grade-critical border-grade-critical bg-[#FDEAEA]">Critical</span>
          <span className="text-[12px] text-text-secondary flex-1">.footer-links contrast too low</span>
          <span className="font-mono text-[12px] font-medium text-grade-critical">2.1:1</span>
        </div>
        <div className="flex items-center gap-[10px] py-[7px] border-b border-border">
          <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-grade-critical border-grade-critical bg-[#FDEAEA]">Critical</span>
          <span className="text-[12px] text-text-secondary flex-1">img.hero-banner missing alt</span>
          <span className="font-mono text-[12px] font-medium text-grade-critical">—</span>
        </div>
        <div className="flex items-center gap-[10px] py-[7px] border-b border-border">
          <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-grade-warn border-grade-warn bg-[#FEF0EA]">Warn</span>
          <span className="text-[12px] text-text-secondary flex-1">Placeholder text contrast</span>
          <span className="font-mono text-[12px] font-medium text-grade-warn">2.9:1</span>
        </div>
        <div className="flex items-center gap-[10px] py-[7px]">
          <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-text-tertiary border-border bg-bg-subtle">Info</span>
          <span className="text-[12px] text-text-secondary flex-1">4 font families detected</span>
          <span className="font-mono text-[12px] font-medium text-text-tertiary">4</span>
        </div>
      </div>
    </aside>
  );
}
