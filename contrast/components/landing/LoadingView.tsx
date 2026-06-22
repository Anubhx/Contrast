import React from 'react';
import { LoadingSequence } from '@/components/landing/LoadingSequence';

interface LoadingViewProps {
  step: number;
}

export function LoadingView({ step }: LoadingViewProps) {
  return (
    <div className="relative z-10 flex flex-col md:flex-row flex-1 w-full max-w-[1600px] mx-auto min-h-[400px] md:min-h-[640px]">
      {/* Left Column for loading */}
      <div className="flex-1 md:flex-[0.5] py-[40px] md:py-[64px] px-[20px] md:pr-[56px] md:pl-[40px] md:border-r border-border flex flex-col justify-center">
        <p className="text-[11px] font-mono text-text-tertiary tracking-[0.06em] mb-[6px] uppercase">
          Auditing
        </p>
        <h2 className="text-[18px] md:text-[22px] font-semibold text-text-primary tracking-[-0.02em] mb-[32px] md:mb-[48px] truncate">
          Processing URL...
        </h2>
        <LoadingSequence currentStep={step} />
      </div>
      {/* Right Column for loading (mock preview) — hidden on mobile */}
      <div className="hidden md:flex flex-[0.5] py-[40px] items-center justify-center bg-bg-subtle relative overflow-hidden">
        <div className="w-[460px] bg-bg-base border border-border rounded-[12px] shadow-[0_2px_8px_rgba(16,15,10,0.08),0_1px_2px_rgba(16,15,10,0.04)] overflow-hidden opacity-55">
          <div className="h-[32px] bg-bg-subtle border-b border-border flex items-center px-[12px] gap-[6px]">
            <div className="w-[8px] h-[8px] rounded-full bg-border" />
            <div className="w-[8px] h-[8px] rounded-full bg-border" />
            <div className="w-[8px] h-[8px] rounded-full bg-border" />
            <div className="flex-1 h-[18px] bg-border rounded-[9px] mx-[20px]" />
          </div>
          <div className="p-[16px] flex flex-col gap-[8px]">
            <div className="h-[12px] bg-bg-subtle rounded-[3px] animate-pulse" />
            <div className="h-[12px] bg-bg-subtle rounded-[3px] animate-pulse w-[75%]" />
            <div className="h-[12px] bg-bg-subtle rounded-[3px] animate-pulse w-[55%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
