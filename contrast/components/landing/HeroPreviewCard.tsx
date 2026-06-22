"use client";

import React, { useEffect, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

export function HeroPreviewCard() {
  const score = useCountUp(87, 2000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure CSS transition triggers after initial render of 0 width
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUpHero {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-card {
          opacity: 0;
          animation: fadeUpHero 600ms ease-out forwards;
        }
      `}} />
      <div className="animate-hero-card bg-white border border-[#E8E5DE] rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Card header */}
        <div className="flex items-start justify-between px-[20px] pt-[18px] pb-[14px] border-b border-border">
          <div>
            <div className="text-[13px] font-semibold text-text-primary tracking-[-0.01em]">linear.app</div>
            <div className="text-[10px] font-mono text-text-quaternary mt-[2px]">Audited Jun 19, 2025 · 11.4s</div>
          </div>
          <div className="text-right">
            <div className="font-display italic text-[88px] font-normal leading-[0.88] tracking-[-0.03em] text-grade-good">
              {score}
            </div>
            <div className="text-[11px] font-mono text-grade-good tracking-[0.08em] uppercase mt-[8px]">Good</div>
          </div>
        </div>

        {/* Segmented bar */}
        <div className="flex h-[4px] gap-[2px] mx-[20px] mt-[16px] mb-[12px]">
          <div className="h-full rounded-[2px] bg-grade-excellent transition-all duration-700 ease-out" style={{ width: mounted ? '34%' : '0%', transitionDelay: '0ms' }} />
          <div className="h-full rounded-[2px] bg-grade-excellent transition-all duration-700 ease-out" style={{ width: mounted ? '22%' : '0%', transitionDelay: '300ms' }} />
          <div className="h-full rounded-[2px] bg-grade-good transition-all duration-700 ease-out"      style={{ width: mounted ? '24%' : '0%', transitionDelay: '600ms' }} />
          <div className="h-full rounded-[2px] bg-grade-warn transition-all duration-700 ease-out"      style={{ width: mounted ? '16%' : '0%', transitionDelay: '900ms' }} />
        </div>

        {/* Category scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border border-y border-border">
          {[
            { label: 'Contrast',   score: 91, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent', delay: 0 },
            { label: 'Alt text',   score: 100, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent', delay: 300 },
            { label: 'Typography', score: 85, colorClass: 'text-grade-excellent', bgClass: 'bg-grade-excellent', delay: 600 },
            { label: 'Spacing',    score: 78, colorClass: 'text-grade-good',      bgClass: 'bg-grade-good', delay: 900 },
          ].map(({ label, score, colorClass, bgClass, delay }) => (
            <div key={label} className="bg-white px-[12px] py-[10px]">
              <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary mb-[4px]">{label}</div>
              <div className={`font-mono text-[18px] font-medium leading-none mb-[4px] ${colorClass}`}>{score}</div>
              <div className="h-[2px] bg-bg-subtle rounded-full overflow-hidden">
                <div 
                  className={`h-full ${bgClass} transition-all duration-700 ease-out`} 
                  style={{ width: mounted ? `${score}%` : '0%', transitionDelay: `${delay}ms` }} 
                />
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
    </>
  );
}
