import Link from "next/link"

export function Nav() {
  return (
    <nav className="h-[72px] flex items-center justify-between px-[20px] md:px-[48px] border-b border-border bg-white/92 backdrop-blur-md relative z-20">
      <Link 
        href="/" 
        className="font-display italic text-[24px] text-text-primary no-underline tracking-[-0.01em] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-[2px]"
      >
        Contrast
      </Link>
      <div className="flex items-center gap-[16px] md:gap-[32px]">
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
          <span className="hidden sm:inline">GitHub</span>
          <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
        <span className="text-[11px] font-mono bg-bg-subtle border border-border text-text-tertiary px-[9px] py-[2px] rounded-[20px]">
          Free
        </span>
      </div>
    </nav>
  )
}
