"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';

function useInView(ref: React.RefObject<Element>, threshold = 0.5) {
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

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  return (
    <section className="py-[120px] px-[40px] max-w-[1000px] mx-auto text-center" ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radar {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar {
          animation: radar 2s linear infinite;
        }
      `}} />
      
      <div className="relative flex justify-between items-center z-10">
        {/* Connecting line */}
        <div className="absolute top-[32px] left-[10%] right-[10%] border-t border-dashed border-[#D8D5CE] z-[-1]" />
        
        {/* Step 1 */}
        <div 
          className={`flex flex-col items-center gap-[16px] w-[200px] transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
          style={{ transitionDelay: '0ms' }}
        >
          <div className="w-[64px] h-[64px] bg-white border border-[#D8D5CE] rounded-full flex items-center justify-center shadow-sm">
            <Globe className="w-[24px] h-[24px] text-text-secondary" strokeWidth={1.5} />
          </div>
          <span className="text-[15px] font-medium text-text-primary">Paste your URL</span>
        </div>

        {/* Step 2 */}
        <div 
          className={`flex flex-col items-center gap-[16px] w-[200px] transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
          style={{ transitionDelay: '150ms' }}
        >
          <div className="w-[64px] h-[64px] bg-white border border-[#D8D5CE] rounded-full flex items-center justify-center shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,rgba(45,106,45,0.2)_100%)] animate-radar rounded-full" />
            <div className="absolute inset-[2px] bg-white rounded-full flex items-center justify-center z-10">
              <span className="text-[13px] font-mono text-text-secondary">~15s</span>
            </div>
          </div>
          <span className="text-[15px] font-medium text-text-primary">We audit in ~15s</span>
        </div>

        {/* Step 3 */}
        <div 
          className={`flex flex-col items-center gap-[16px] w-[200px] transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
          style={{ transitionDelay: '300ms' }}
        >
          <div className="w-[64px] h-[64px] bg-white border border-[#D8D5CE] rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-[24px] h-[24px] text-grade-excellent" strokeWidth={2} />
          </div>
          <span className="text-[15px] font-medium text-text-primary">Fix what matters</span>
        </div>
      </div>
    </section>
  );
}
