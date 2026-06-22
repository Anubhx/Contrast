"use client"

import Link from "next/link"
import { useState } from "react"

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="h-[56px] md:h-[72px] flex items-center justify-between px-[16px] md:px-[48px] border-b border-border bg-white/92 backdrop-blur-md relative z-20">
        <Link 
          href="/" 
          className="font-display italic text-[22px] md:text-[24px] text-text-primary no-underline tracking-[-0.01em] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-[2px]"
        >
          Contrast
        </Link>
        <div className="flex items-center gap-[12px] md:gap-[32px]">
          <div className="hidden md:flex items-center gap-[32px]">
            <Link href="/#how" className="text-[14px] text-text-secondary no-underline transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-[2px]">
              How it works
            </Link>
            <Link href="/#what" className="text-[14px] text-text-secondary no-underline transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-[2px]">
              What we check
            </Link>
          </div>
          <a 
            href="https://github.com/Anubhx/contrast" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[14px] text-text-secondary no-underline transition-colors hover:text-text-primary inline-flex items-center gap-[6px] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-[2px]"
          >
            <span className="sr-only sm:not-sr-only sm:inline">GitHub</span>
            <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <span className="hidden md:inline text-[11px] font-mono bg-bg-subtle border border-border text-text-secondary px-[9px] py-[2px] rounded-[20px]">
            Free
          </span>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-[36px] h-[36px] rounded-[6px] border border-border bg-white transition-colors hover:bg-bg-subtle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-[16px] h-[1.5px] bg-text-primary rounded-full transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-[16px] h-[1.5px] bg-text-primary rounded-full my-[3px] transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[16px] h-[1.5px] bg-text-primary rounded-full transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30" onClick={() => setMobileOpen(false)}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          {/* Drawer */}
          <div
            className="absolute top-0 right-0 w-[260px] h-full bg-white border-l border-border shadow-[−4px_0_20px_rgba(0,0,0,0.08)] pt-[72px] px-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-[24px]">
              <Link href="/#how" onClick={() => setMobileOpen(false)} className="text-[15px] text-text-secondary no-underline transition-colors hover:text-text-primary">
                How it works
              </Link>
              <Link href="/#what" onClick={() => setMobileOpen(false)} className="text-[15px] text-text-secondary no-underline transition-colors hover:text-text-primary">
                What we check
              </Link>
              <a 
                href="https://github.com/Anubhx/contrast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[15px] text-text-secondary no-underline transition-colors hover:text-text-primary inline-flex items-center gap-[6px]"
              >
                GitHub
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <span className="text-[11px] font-mono bg-bg-subtle border border-border text-text-secondary px-[9px] py-[2px] rounded-[20px] self-start">
                Free
              </span>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
