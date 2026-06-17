import Link from 'next/link';
import { BIO, SOCIALS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-bg-primary mt-auto print:hidden">
      <div className="max-w-[1200px] mx-auto px-[32px] py-[64px] md:py-[96px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[48px] md:gap-[24px]">
          {/* Left Column */}
          <div className="flex flex-col gap-[12px]">
            <div className="font-display italic text-[24px] text-text-primary">Contrast</div>
            <div className="text-[14px] text-text-primary font-medium tracking-tight">
              Find the design debt your team stopped seeing.
            </div>
            <div className="text-[14px] text-text-secondary max-w-[280px]">
              AI-assisted accessibility and design consistency audits for modern teams.
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-[16px] md:pl-[64px]">
            <div className="text-[11px] font-mono tracking-[0.06em] text-text-tertiary uppercase">Product</div>
            <nav className="flex flex-col gap-[12px]">
              <Link href="/" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Home</Link>
              <Link href="/#how-it-works" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">How It Works</Link>
              <Link href="/#recent-audits" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Recent Audits</Link>
            </nav>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[16px]">
            <div className="text-[11px] font-mono tracking-[0.06em] text-text-tertiary uppercase">Built By</div>
            <div className="flex flex-col gap-[12px]">
              <div className="text-[14px] text-text-primary">{BIO.name}</div>
              <nav className="flex flex-col gap-[12px]">
                {SOCIALS.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[14px] text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-[64px] md:mt-[96px] pt-[24px] border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px]">
          <div className="text-[12px] font-mono text-text-tertiary">
            {BIO.location}
          </div>
          <div className="text-[12px] font-mono text-text-tertiary">
            © {currentYear} Contrast
          </div>
        </div>
      </div>
    </footer>
  );
}
