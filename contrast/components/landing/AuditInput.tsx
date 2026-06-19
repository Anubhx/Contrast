"use client";

import React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AuditInputProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
  error?: string;
}

export function AuditInput({ onSubmit, loading, error }: AuditInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }
    onSubmit(finalUrl);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            'flex items-center bg-white border border-[#D8D5CE] rounded-full shadow-[0_1px_3px_rgba(16,15,10,0.08)] overflow-hidden transition-all duration-150 h-[52px]',
            'focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(45,106,45,0.12)]',
            error && 'border-grade-critical focus-within:shadow-[0_0_0_3px_rgba(179,27,27,0.12)]'
          )}
        >
          <label htmlFor="url-input" className="sr-only">Website URL to audit</label>
          {/* Globe icon */}
          <svg className="ml-4 mr-1 w-[15px] h-[15px] text-text-quaternary shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5"/>
            <path d="M8 1.5C8 1.5 5.5 4.5 5.5 8S8 14.5 8 14.5M8 1.5C8 1.5 10.5 4.5 10.5 8S8 14.5 8 14.5M1.5 8h13"/>
          </svg>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourproduct.com"
            autoComplete="url"
            spellCheck="false"
            className="flex-1 border-none outline-none font-sans text-[14px] text-text-primary bg-transparent px-3 min-w-0 placeholder:text-text-quaternary"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="bg-accent text-white border-none font-sans text-[13px] font-semibold px-[22px] h-[40px] m-1.5 rounded-full cursor-pointer tracking-[0.01em] whitespace-nowrap transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 shrink-0"
          >
            {loading ? 'Auditing…' : 'Audit →'}
          </button>
        </div>
      </form>
      {error && (
        <p className="text-[11px] font-mono text-grade-critical mt-2 pl-4">
          {error}
        </p>
      )}
    </div>
  );
}
