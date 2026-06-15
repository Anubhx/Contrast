import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border px-[40px] py-[24px] flex items-center justify-between bg-bg-subtle/50  mt-auto">
      <span className="font-display italic text-[17px] text-text-tertiary">
        Contrast
      </span>
      <nav className="flex gap-[20px]" aria-label="Footer links">
        <Link href="/#how" className="text-[12px] text-text-tertiary no-underline transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[2px] rounded-[2px]">
          About
        </Link>
        <a href="https://github.com/Anubhx/contrast" className="text-[12px] text-text-tertiary no-underline transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[2px] rounded-[2px]">
          GitHub
        </a>
        <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-text-tertiary no-underline transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[2px] rounded-[2px]">
          WCAG 2.1
        </a>
      </nav>
      <span className="text-[12px] text-text-tertiary">
        Built by Anubhav Raj
      </span>
    </footer>
  )
}
