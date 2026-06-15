import React from 'react';
import { WHAT_WE_CHECK_ITEMS } from '@/constants/landing';

export function WhatWeCheck() {
  return (
    <section className="py-[72px] px-[40px] border-t border-border bg-bg-base">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-[32px] font-semibold tracking-[-0.025em] text-text-primary mb-[8px]">
          What we check
        </h2>
        <p className="text-[15px] text-text-secondary max-w-[440px] mb-[44px]">
          Four categories, weighted by impact on real users.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {WHAT_WE_CHECK_ITEMS.map((item) => (
            <div key={item.id} className="bg-bg-subtle border border-border rounded-[12px] p-[28px] transition-colors hover:border-border-subtle">
              <div className="w-[36px] h-[36px] rounded-[8px] bg-bg-base border border-border flex items-center justify-center text-[16px] mb-[16px] not-italic font-medium">
                {item.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-text-primary mb-[8px] tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="text-[13px] text-text-secondary leading-[1.6] mb-[16px]">
                {item.description}
              </p>
              <div className="text-[11px] font-mono text-text-tertiary pt-[14px] border-t border-border leading-[1.8]">
                {item.threshold}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
