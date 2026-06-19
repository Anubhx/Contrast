"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { AuditInput } from '@/components/landing/AuditInput';

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

export function BentoGrid() {
  const card5Ref = useRef<HTMLDivElement>(null);
  const card5InView = useInView(card5Ref, 0.5);
  
  const score1 = useCountUp(91, 1500, card5InView);
  const score2 = useCountUp(100, 1500, card5InView);
  const score3 = useCountUp(85, 1500, card5InView);
  const score4 = useCountUp(78, 1500, card5InView);

  return (
    <section className="py-[120px] px-[20px] md:px-[40px] max-w-[1200px] mx-auto">
      <h2 className="text-[40px] font-semibold tracking-[-0.03em] leading-[1.1] text-text-primary mb-[48px] max-w-[600px] text-left">
        Everything wrong with your site&apos;s design.<br/>Found in 15 seconds.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] auto-rows-min">
        {/* Card 1: Color Contrast (2 cols, 1 row) */}
        <div className="md:col-span-2 border border-border rounded-[12px] bg-white p-[32px] flex flex-col md:flex-row gap-[32px] transition-colors duration-200 hover:border-[#2D6A2D]">
          <div className="flex-1">
            <div className="text-[10px] font-mono tracking-widest uppercase text-text-quaternary mb-[16px]">Weight: 40%</div>
            <h3 className="text-[20px] font-semibold text-text-primary mb-[12px]">Colour Contrast</h3>
            <p className="text-[14px] text-text-secondary leading-[1.6]">
              WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large. We check every text-background pair on the page.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-[8px] justify-center bg-[#F8F7F4] p-[16px] rounded-[8px] border border-border">
            {[
              { fg: '#1A1A1A', bg: '#FFFFFF', ratio: '21:1', pass: true },
              { fg: '#767676', bg: '#FFFFFF', ratio: '4.54:1', pass: true },
              { fg: '#AAAAAA', bg: '#FFFFFF', ratio: '2.32:1', pass: false },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between bg-white px-[12px] py-[8px] rounded-[4px] border border-border text-[12px] font-mono shadow-sm">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[12px] h-[12px] rounded-[2px]" style={{ backgroundColor: row.fg, border: row.fg === '#FFFFFF' ? '1px solid #ccc' : 'none' }} />
                  <span style={{ color: row.fg }}>Body text</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <span className="text-text-tertiary">{row.ratio}</span>
                  <span className={`px-[6px] py-[2px] rounded-[3px] text-[9px] uppercase tracking-wider ${row.pass ? 'bg-grade-excellent/10 text-grade-excellent border border-grade-excellent/20' : 'bg-grade-critical/10 text-grade-critical border border-grade-critical/20'}`}>
                    {row.pass ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Alt Text (1 col, 1 row) */}
        <div className="md:col-span-1 border border-border rounded-[12px] bg-white p-[32px] group flex flex-col">
          <div className="text-[10px] font-mono tracking-widest uppercase text-text-quaternary mb-[16px]">Weight: 30%</div>
          <h3 className="text-[20px] font-semibold text-text-primary mb-[24px]">Alt Text</h3>
          
          <div className="relative w-full aspect-[4/3] bg-[#F0EFEB] rounded-[4px] flex items-center justify-center mb-[20px] overflow-hidden">
            <svg className="w-[40px] h-[40px] text-text-quaternary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-[8px] py-[4px] rounded-full border border-border shadow-sm flex items-center gap-[6px]">
                <div className="relative w-[14px] h-[14px] flex items-center justify-center">
                  <span className="absolute text-grade-critical text-[14px] leading-none opacity-100 transition-opacity duration-300 group-hover:opacity-0">✗</span>
                  <span className="absolute text-grade-good text-[14px] leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">✓</span>
                </div>
                <span className="text-[10px] font-mono text-text-secondary">missing alt</span>
              </div>
            </div>
          </div>
          <p className="text-[14px] text-text-secondary font-mono mt-auto">20 / 51 images have no alt text</p>
        </div>

        {/* Card 3: Typography drift (1 col, 2 rows) */}
        <div className="md:col-span-1 md:row-span-2 border border-border rounded-[12px] bg-white p-[32px] flex flex-col">
          <div className="text-[10px] font-mono tracking-widest uppercase text-text-quaternary mb-[16px]">Weight: 15%</div>
          <h3 className="text-[20px] font-semibold text-text-primary mb-[24px]">Typography drift</h3>
          
          <div className="flex flex-col gap-[16px] mb-[32px] flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[16px] font-sans text-text-primary">Heading</div>
                <div className="text-[11px] font-mono text-text-tertiary">Inter 14px Regular</div>
              </div>
              <span className="text-grade-good text-[12px]">ok</span>
            </div>
            
            <div className="flex items-start justify-between opacity-80">
              <div>
                <div className="text-[15px]" style={{ fontFamily: 'Helvetica' }}>Subtitle</div>
                <div className="text-[11px] font-mono text-text-tertiary">Helvetica 13px Regular</div>
              </div>
              <span className="text-grade-warn text-[12px] font-mono">⚠ drift</span>
            </div>

            <div className="flex items-start justify-between opacity-60">
              <div>
                <div className="text-[14px] font-medium" style={{ fontFamily: 'Arial' }}>Label</div>
                <div className="text-[11px] font-mono text-text-tertiary">Arial 12px Medium</div>
              </div>
              <span className="text-grade-warn text-[12px] font-mono">⚠ drift</span>
            </div>
          </div>

          <p className="text-[14px] text-text-secondary mt-auto leading-[1.5]">
            23 typography variants detected. Design systems target ≤2 families.
          </p>
        </div>

        {/* Card 4: Spacing (2 cols, 1 row) */}
        <div className="md:col-span-2 border border-border rounded-[12px] bg-white p-[32px] relative overflow-hidden group">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes shimmerHover {
              100% { transform: translateX(100%); }
            }
            .shimmer-bg {
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: linear-gradient(90deg, transparent, rgba(45,106,45,0.05), transparent);
              transform: translateX(-100%);
              pointer-events: none;
            }
            .group:hover .shimmer-bg {
              animation: shimmerHover 1.5s infinite;
            }
          `}} />
          <div className="shimmer-bg" />
          
          <div className="relative z-10">
            <div className="text-[10px] font-mono tracking-widest uppercase text-text-quaternary mb-[16px]">Weight: 15%</div>
            <h3 className="text-[20px] font-semibold text-text-primary mb-[24px]">Spacing / 8px grid</h3>
            
            <div className="flex items-end gap-[4px] mb-[24px] h-[60px] border-b border-[#E8E5DE] pb-[8px]">
              {[
                { h: 16, val: 8, ok: true },
                { h: 24, val: 12, ok: false },
                { h: 32, val: 16, ok: true },
                { h: 26, val: 13, ok: false },
                { h: 48, val: 24, ok: true }
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-[4px] flex-1">
                  <div className={`w-full rounded-t-[2px] transition-colors ${b.ok ? 'bg-[#E8F3E8]' : 'bg-[#FEF2F2]'}`} style={{ height: `${b.h}px` }} />
                  <div className="text-[10px] font-mono text-text-secondary whitespace-nowrap flex items-center gap-[2px]">
                    {b.val}px <span className={b.ok ? 'text-grade-good' : 'text-grade-critical'}>{b.ok ? '✓' : '✗'}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[14px] text-text-secondary">28 spacing values outside 8px grid rhythm</p>
          </div>
        </div>

        {/* Card 5: Score breakdown teaser (3 cols, 1 row) */}
        <div ref={card5Ref} className="md:col-span-3 border border-border rounded-[12px] bg-[#F0EFEB] p-[40px] flex flex-col md:flex-row items-center justify-between gap-[40px]">
          <div className="flex-1 max-w-[400px]">
            <h3 className="text-[28px] font-semibold text-text-primary mb-[24px] leading-[1.1]">
              Your score in 15 seconds
            </h3>
            <div className="bg-white rounded-full p-[4px] border border-border shadow-sm" onClick={(e) => e.preventDefault()}>
              {/* Fake visual input to look like the real AuditInput, no logic needed here except redirecting focus or just acting as CTA */}
              <AuditInput onSubmit={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
            </div>
          </div>
          
          <div className="flex-shrink-0 grid grid-cols-4 gap-[24px] md:gap-[40px]">
            {[
              { val: score1, label: 'Contrast', color: 'text-grade-excellent' },
              { val: score2, label: 'Alt Text', color: 'text-grade-excellent' },
              { val: score3, label: 'Typography', color: 'text-grade-excellent' },
              { val: score4, label: 'Spacing', color: 'text-grade-good' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`font-display text-[48px] md:text-[64px] font-normal leading-none mb-[8px] ${s.color}`}>
                  {s.val}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.06em] text-text-quaternary">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
