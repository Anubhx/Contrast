import React from 'react';
import { HOW_IT_WORKS_STEPS } from '@/constants/landing';

export function HowItWorks() {
  return (
    <section className="bg-bg-subtle border-t border-border py-[72px] px-[40px] relative overflow-hidden">
      {/* Local grid background explicitly matching the prototype's How It Works section */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', 
          backgroundSize: '48px 48px' 
        }} 
      />
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <h2 className="text-[32px] font-semibold tracking-[-0.025em] text-text-primary mb-[8px]">
          How it works
        </h2>
        <p className="text-[15px] text-text-secondary mb-[44px] max-w-[440px]">
          From URL to shareable report in four steps.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-border border border-border rounded-[12px] overflow-hidden">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.id} className="bg-bg-base p-[28px_24px]">
              <div className="font-mono text-[11px] text-text-quaternary tracking-[0.06em] mb-[16px]">
                {step.id}
              </div>
              <div className="text-[15px] font-semibold text-text-primary mb-[8px] tracking-[-0.01em]">
                {step.title}
              </div>
              <p className="text-[13px] text-text-secondary leading-[1.6]">
                {step.description}
              </p>
              <span className="inline-block mt-[14px] text-[11px] font-mono px-[10px] py-[3px] rounded-[20px] bg-bg-subtle text-text-tertiary border border-border">
                {step.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
