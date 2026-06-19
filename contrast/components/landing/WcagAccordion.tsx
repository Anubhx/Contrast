"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ITEMS = [
  {
    title: "Perceivable",
    summary: "Can users perceive the content? Covers contrast, alt text, captions.",
    details: "Contrast runs 3 specific checks for this principle: 1. Color contrast for normal and large text. 2. Alternative text presence and quality for all img tags. 3. Typography legibility across viewport sizes."
  },
  {
    title: "Operable",
    summary: "Keyboard navigation, focus indicators.",
    details: "Coming in V2. Future checks will ensure interactive elements are reachable via Tab key, avoid keyboard traps, and maintain visible focus outlines."
  },
  {
    title: "Understandable",
    summary: "Language, error messages, consistent nav.",
    details: "Contrast verifies that pages have appropriate HTML lang attributes defined and scans for consistent spacing rhythm that aids in predictable page structure."
  },
  {
    title: "Robust",
    summary: "Semantic HTML, ARIA roles.",
    details: "Checks that landmark tags (header, nav, main, footer) are used correctly and that ARIA roles, when present, do not conflict with native semantic meanings."
  }
];

export function WcagAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-[120px] px-[20px] md:px-[40px] max-w-[800px] mx-auto">
      <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-text-primary mb-[48px] text-center">
        WCAG 2.1 — what it actually means
      </h2>

      <div className="border-t border-[#E8E5DE]">
        {ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`border-b border-[#E8E5DE] transition-colors duration-300 ${isOpen ? 'bg-[#F8F7F4]' : 'bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-[24px] py-[24px] flex items-center justify-between group outline-none focus-visible:bg-[#F8F7F4]"
              >
                <div>
                  <div className="text-[18px] font-semibold text-text-primary mb-[4px]">{item.title}</div>
                  <div className="text-[14px] text-text-secondary">{item.summary}</div>
                </div>
                <div className={`shrink-0 ml-[24px] w-[32px] h-[32px] flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-white border-[#D8D5CE] shadow-sm transform rotate-180' : 'border-transparent group-hover:bg-[#F0EFEB]'}`}>
                  <ChevronDown className="w-[16px] h-[16px] text-text-tertiary" />
                </div>
              </button>
              
              <div 
                className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
                style={{ 
                  maxHeight: isOpen ? '200px' : '0px',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <div className="px-[24px] pb-[24px] pt-[8px] text-[14px] leading-[1.6] text-text-secondary border-t border-[#E8E5DE] mx-[24px]">
                  {item.details}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
