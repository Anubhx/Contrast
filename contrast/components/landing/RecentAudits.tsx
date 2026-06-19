"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecentAuditData } from '@/lib/types';

function ExampleCard({ id, domain, score, issues, date, color }: RecentAuditData) {
  return (
    <Link href={`/audit/${id}`} className="block bg-bg-base border border-border rounded-[10px] p-[20px] cursor-pointer transition-all hover:border-border-subtle hover:shadow-[0_2px_8px_rgba(16,15,10,0.08),0_1px_2px_rgba(16,15,10,0.04)] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 no-underline text-text-primary">
      <div className="flex items-start justify-between mb-[14px]">
        <span className="text-[13px] font-medium truncate pr-2">{domain}</span>
        <span className="font-mono text-[22px] font-medium leading-none shrink-0" style={{ color }}>
          {score}
        </span>
      </div>
      <div className="h-[3px] bg-bg-subtle rounded-[2px] overflow-hidden mb-[12px]">
        <div className="h-full rounded-[2px]" style={{ width: `${score}%`, background: color }} />
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
    <section className="px-[40px] pb-[72px] relative z-10" aria-labelledby="recent-hd">
      <div className="flex items-center justify-between mb-[20px]">
        <h2 id="recent-hd" className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-tertiary m-0">
          Recent audits
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px]">
        {audits.map((audit) => (
          <ExampleCard key={audit.id} {...audit} />
        ))}
      </div>
    </section>
  );
}
