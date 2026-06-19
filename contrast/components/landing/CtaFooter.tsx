"use client";

import React from 'react';
import { AuditInput } from '@/components/landing/AuditInput';

interface CtaFooterProps {
  onAuditSubmit: (url: string) => void;
  loading: boolean;
  error?: string;
}

export function CtaFooter({ onAuditSubmit, loading, error }: CtaFooterProps) {
  return (
    <section className="bg-[#F0EFEB] py-[96px] px-[20px] text-center border-t border-[#E8E5DE]">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-text-primary mb-[16px]">
          Your site has issues you haven&apos;t seen yet.
        </h2>
        <p className="text-[16px] text-text-secondary mb-[40px]">
          Free. No login. Results in 15 seconds.
        </p>
        
        <div className="mb-[24px]">
          <AuditInput onSubmit={onAuditSubmit} loading={loading} error={error} />
        </div>
        
        <div className="text-[10px] font-mono tracking-widest uppercase text-text-quaternary">
          WCAG 2.1 AA · axe-core · Gemini AI · No tracking
        </div>
      </div>
    </section>
  );
}
