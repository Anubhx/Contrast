"use client";

import React from 'react';
import { AuditInput } from '@/components/landing/AuditInput';
import { HeroPreviewCard } from '@/components/landing/HeroPreviewCard';
import { HERO_BADGES } from '@/constants/landing';

interface HeroSectionProps {
  onAuditSubmit: (url: string) => void;
  loading: boolean;
  error?: string;
}

export function HeroSection({ onAuditSubmit, loading, error }: HeroSectionProps) {
  return (
    <section className="relative pt-[80px] px-[40px] min-h-[600px] overflow-hidden">
      <div className="max-w-[640px] relative z-10">
        <div className="inline-flex items-center gap-[8px] text-[12px] font-mono text-text-tertiary tracking-[0.04em] bg-bg-subtle border border-border px-[13px] py-[5px] rounded-[20px] mb-[28px]">
          <span className="w-[6px] h-[6px] rounded-full bg-grade-excellent shrink-0" />
          WCAG 2.1 AA — Design audit
        </div>
        
        <h1 className="text-[54px] font-semibold tracking-[-0.036em] leading-[1.08] text-text-primary mb-[22px]">
          Your product&apos;s design,<br />
          <em className="font-display italic font-normal text-text-secondary">objectively scored.</em>
        </h1>
        
        <p className="text-[16px] text-text-secondary leading-[1.65] max-w-[480px] mb-[32px]">
          Paste any URL. Get an instant report — contrast ratios, missing alt text, typography consistency, spacing. Free, no login required.
        </p>
        
        <AuditInput onSubmit={onAuditSubmit} loading={loading} error={error} />
        
        <div className="flex items-center gap-[20px] flex-wrap mt-[16px]">
          {HERO_BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-[6px] text-[13px] text-text-tertiary">
              <span className={`w-[5px] h-[5px] rounded-full ${badge.colorClass}`} />
              {badge.label}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[10px] mt-[28px]">
          <div className="flex">
            <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white first:ml-0 shrink-0" style={{background:'#4A6FA5'}}>AR</div>
            <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white shrink-0" style={{background:'#7A6E5C'}}>SK</div>
            <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white shrink-0" style={{background:'#5C7A5C'}}>PM</div>
            <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white shrink-0" style={{background:'#8A5E6E'}}>LR</div>
          </div>
          <p className="text-[12px] text-text-tertiary">
            <strong className="text-text-secondary font-medium">500+ designers</strong> · 12,000 audits run
          </p>
        </div>
      </div>

      <HeroPreviewCard />
    </section>
  );
}
