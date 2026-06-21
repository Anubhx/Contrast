"use client";

import React from 'react';
import { AuditInput } from '@/components/landing/AuditInput';
import { HeroPreviewCard } from '@/components/landing/HeroPreviewCard';

interface HeroSectionProps {
  onAuditSubmit: (url: string) => void;
  loading: boolean;
  error?: string;
}

export function HeroSection({ onAuditSubmit, loading, error }: HeroSectionProps) {
  return (
    <section className="relative pt-[40px] md:pt-[72px] pb-[48px] px-[20px] md:px-[40px] overflow-hidden">
      {/* Two-column hero layout */}
      <div className="flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[80px] max-w-[1200px] mx-auto">

        {/* LEFT — headline + input */}
        <div className="flex-1 w-full min-w-0 max-w-[520px]">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-[6px] text-[11px] font-mono text-text-tertiary tracking-[0.06em] uppercase mb-[24px]">
            <span className="w-[5px] h-[5px] rounded-full bg-grade-excellent shrink-0" />
            WCAG 2.1 AA · Free · No login
          </div>

          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.036em] leading-[1.06] text-text-primary mb-[16px]">
            Find the design debt<br />
            <em className="font-display italic font-normal text-text-secondary">your team stopped seeing.</em>
          </h1>

          <p className="text-[15px] text-text-secondary leading-[1.6] mb-[32px]">
            AI-assisted accessibility and design consistency audits. Contrast ratios, missing alt text, typography drift, spacing grid — scored in under 15 seconds.
          </p>

          <AuditInput onSubmit={onAuditSubmit} loading={loading} error={error} />

          {/* Stat row */}
          <div className="grid grid-cols-2 md:flex md:items-center gap-[12px] md:gap-[24px] mt-[20px]">
            {[
              { n: '342', label: 'text pairs checked' },
              { n: '89',  label: 'colour pairs' },
              { n: '51',  label: 'images scanned' },
              { n: '4',   label: 'font families' },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-baseline gap-[5px]">
                <span className="text-[15px] font-semibold font-mono text-text-primary">{n}</span>
                <span className="text-[11px] text-text-secondary">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — static preview card (purely decorative) */}
        <div className="hidden md:block flex-shrink-0 w-full lg:w-[500px]">
          <HeroPreviewCard />
        </div>
      </div>
    </section>
  );
}
