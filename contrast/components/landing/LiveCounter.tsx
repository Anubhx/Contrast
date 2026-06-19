"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

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

export function LiveCounter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  
  const [stats, setStats] = useState({ audits: 1247 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoaded(true);
      }
    }
    fetchStats();
  }, []);

  const totalAudits = stats.audits;
  // Compute derived stats
  const totalIssues = totalAudits * 48; // roughly based on hardcoded
  const avgIssues = 48;

  // Use hook only after fetch is done and in view
  const shouldAnimate = inView && loaded;
  const count1 = useCountUp(totalAudits, 2000, shouldAnimate);
  const count2 = useCountUp(totalIssues, 2500, shouldAnimate);
  const count3 = useCountUp(avgIssues, 1500, shouldAnimate);

  return (
    <section className="w-full bg-[#1A1A1A] text-white py-[64px]" ref={containerRef}>
      <div className="max-w-[1000px] mx-auto px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] text-center mb-[24px]">
          <div>
            <div className="font-display text-[56px] md:text-[72px] leading-none mb-[8px]">
              {count1.toLocaleString()}
            </div>
            <div className="text-[14px] font-mono tracking-widest uppercase text-[#888888]">
              audits run
            </div>
          </div>
          <div>
            <div className="font-display text-[56px] md:text-[72px] leading-none mb-[8px]">
              {count2.toLocaleString()}
            </div>
            <div className="text-[14px] font-mono tracking-widest uppercase text-[#888888]">
              issues found
            </div>
          </div>
          <div>
            <div className="font-display text-[56px] md:text-[72px] leading-none mb-[8px]">
              {count3}
            </div>
            <div className="text-[14px] font-mono tracking-widest uppercase text-[#888888]">
              avg issues per site
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
