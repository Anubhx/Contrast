"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecentAuditData } from '@/lib/types';

function ExampleCard({ id, domain, score, grade, issues, date, color }: RecentAuditData & { grade?: string }) {
  return (
    <Link href={`/audit/${id}`} className="block bg-white border border-[#E8E5DE] rounded-[8px] p-[24px] cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#D8D5CE] outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A2D]/30 no-underline text-text-primary group">
      <div className="flex items-start justify-between mb-[20px]">
        <span className="text-[18px] font-semibold text-text-primary truncate pr-4">{domain}</span>
        <div className="text-right shrink-0">
          <div className="font-display italic text-[48px] font-normal leading-[0.85] tracking-[-0.03em]" style={{ color }}>
            {score}
          </div>
          <div className="text-[10px] font-mono tracking-[0.08em] uppercase mt-[6px]" style={{ color }}>
            {grade || 'Audited'}
          </div>
        </div>
      </div>
      
      <div className="h-[2px] bg-bg-subtle rounded-full overflow-hidden mb-[16px]">
        <div className="h-full transition-all duration-500 ease-out" style={{ width: `${score}%`, background: color }} />
      </div>
      
      <div className="flex justify-between items-center text-[11px]">
        <span className="font-mono text-text-quaternary">{date}</span>
        <span className="text-text-tertiary">{issues} issues</span>
      </div>
    </Link>
  );
}

export function RecentAudits() {
  const [audits, setAudits] = useState<RecentAuditData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch('/api/recent');
        if (res.ok) {
          const data = await res.json();
          setAudits(data);
        }
      } catch (err) {
        console.error('Failed to fetch recent audits:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecent();
  }, []);

  if (loading || audits.length === 0) return null;

  return (
    <section className="py-[120px] px-[20px] md:px-[40px] max-w-[1200px] mx-auto relative z-10" aria-labelledby="recent-hd">
      <div className="flex items-center justify-between mb-[48px]">
        <h2 id="recent-hd" className="text-[32px] font-semibold tracking-[-0.02em] text-text-primary m-0">
          What people are auditing
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {audits.map((audit) => (
          <ExampleCard key={audit.id} {...audit} />
        ))}
      </div>
    </section>
  );
}
