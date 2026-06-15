"use client"

import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { AuditInput } from "@/components/audit/AuditInput"
import { LoadingSequence } from "@/components/audit/LoadingSequence"
import { useAudit } from "@/hooks/useAudit"
import Link from "next/link"

export default function Home() {
  const { triggerAudit, state, step, error } = useAudit()

  return (
    <div className="flex flex-col min-h-screen relative">
      <Nav />
      
      <main className="flex-1 w-full relative">
        {state === 'loading' ? (
          <div className="relative z-10 flex flex-1 w-full max-w-[1440px] mx-auto min-h-[640px]">
            {/* Left Column for loading */}
            <div className="flex-[0.5] py-[64px] pr-[56px] pl-[40px] border-r border-[#E2E0D8] flex flex-col justify-center">
              <p className="text-[11px] font-mono text-[#8A8880] tracking-[0.06em] mb-[6px] uppercase">Auditing</p>
              <h2 className="text-[22px] font-semibold text-[#16150F] tracking-[-0.02em] mb-[48px] truncate">
                Processing URL...
              </h2>
              <LoadingSequence currentStep={step} />
            </div>
            {/* Right Column for loading (mock preview) */}
            <div className="flex-[0.5] py-[40px] flex items-center justify-center bg-[#FAFAF8] relative overflow-hidden">
               <div className="w-[460px] bg-white border border-[#E2E0D8] rounded-[12px] shadow-[0_2px_8px_rgba(16,15,10,0.08),0_1px_2px_rgba(16,15,10,0.04)] overflow-hidden opacity-55">
                  <div className="h-[32px] bg-[#F4F3EF] border-b border-[#E2E0D8] flex items-center px-[12px] gap-[6px]">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#E2E0D8]" />
                    <div className="w-[8px] h-[8px] rounded-full bg-[#E2E0D8]" />
                    <div className="w-[8px] h-[8px] rounded-full bg-[#E2E0D8]" />
                    <div className="flex-1 h-[18px] bg-[#E2E0D8] rounded-[9px] mx-[20px]" />
                  </div>
                  <div className="p-[16px] flex flex-col gap-[8px]">
                    <div className="h-[12px] bg-[#F4F3EF] rounded-[3px] animate-pulse" />
                    <div className="h-[12px] bg-[#F4F3EF] rounded-[3px] animate-pulse w-[75%]" />
                    <div className="h-[12px] bg-[#F4F3EF] rounded-[3px] animate-pulse w-[55%]" />
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <>
            {/* 
              LAYOUT WIDTH EXPERIMENTATION: 
              Change "max-w-[1600px]" below to a larger number (like 1800px) 
              or "w-full" if you want it to stretch completely to the edges! 
            */}
            <div className="max-w-[1600px] mx-auto w-full relative">
              {/* Hero Section */}
              <section className="relative pt-[80px] px-[40px] min-h-[600px] overflow-hidden">
                <div className="max-w-[640px] relative z-10">
                  <div className="inline-flex items-center gap-[8px] text-[12px] font-mono text-[#8A8880] tracking-[0.04em] bg-[#F4F3EF] border border-[#E2E0D8] px-[13px] py-[5px] rounded-[20px] mb-[28px]">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#1A7A42] shrink-0" />
                    WCAG 2.1 AA — Design audit
                  </div>
                  
                  <h1 className="text-[54px] font-semibold tracking-[-0.036em] leading-[1.08] text-[#16150F] mb-[22px]">
                    Your product&apos;s design,<br />
                    <em className="font-display italic font-normal text-[#4A4840]">objectively scored.</em>
                  </h1>
                  
                  <p className="text-[16px] text-[#4A4840] leading-[1.65] max-w-[480px] mb-[32px]">
                    Paste any URL. Get an instant report — contrast ratios, missing alt text, typography consistency, spacing. Free, no login required.
                  </p>
                  
                  <AuditInput onSubmit={triggerAudit} loading={false} error={error} />
                  
                  <div className="flex items-center gap-[20px] flex-wrap mt-[16px]">
                    <div className="flex items-center gap-[6px] text-[13px] text-[#8A8880]">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#4A9E4A]" />
                      Color contrast
                    </div>
                    <div className="flex items-center gap-[6px] text-[13px] text-[#8A8880]">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#4A9E4A]" />
                      Alt text
                    </div>
                    <div className="flex items-center gap-[6px] text-[13px] text-[#8A8880]">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#4A9E4A]" />
                      Typography
                    </div>
                    <div className="flex items-center gap-[6px] text-[13px] text-[#8A8880]">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#4A9E4A]" />
                      Spacing
                    </div>
                  </div>

                  <div className="flex items-center gap-[10px] mt-[28px]">
                    <div className="flex">
                      <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white first:ml-0 shrink-0" style={{background:'#4A6FA5'}}>AR</div>
                      <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white shrink-0" style={{background:'#7A6E5C'}}>SK</div>
                      <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white shrink-0" style={{background:'#5C7A5C'}}>PM</div>
                      <div className="w-[28px] h-[28px] rounded-full border-2 border-white ml-[-8px] flex items-center justify-center text-[10px] font-semibold text-white shrink-0" style={{background:'#8A5E6E'}}>LR</div>
                    </div>
                    <p className="text-[12px] text-[#8A8880]">
                      <strong className="text-[#4A4840] font-medium">500+ designers</strong> · 12,000 audits run
                    </p>
                  </div>
                </div>

                {/* Floating Hero Card Preview */}
                <aside className="absolute right-[40px] top-[48px] w-[580px] z-10 bg-white border border-[#E2E0D8] rounded-[14px] shadow-[0_4px_20px_rgba(16,15,10,0.10),0_2px_6px_rgba(16,15,10,0.06)] overflow-hidden hidden xl:block">
                  <div className="p-[20px_24px_16px] border-b border-[#E2E0D8] flex items-start justify-between">
                    <div>
                      <div className="text-[15px] font-semibold text-[#16150F] letter-spacing-[-0.02em]">stripe.com</div>
                      <div className="text-[11px] font-mono text-[#8A8880] mt-[3px]">Audited Jun 14, 2025 · 1.2s</div>
                    </div>
                    <div>
                      <div className="font-display text-[44px] font-normal leading-[1] text-[#8A5E00] text-right">74</div>
                      <div className="text-[11px] font-mono text-[#8A5E00] tracking-[0.06em] text-right uppercase">Good</div>
                    </div>
                  </div>
                  <div className="flex h-[5px] gap-[2px] mx-[24px] mt-[14px] rounded-[3px] overflow-hidden">
                    <div className="h-full rounded-[2px]" style={{width:'36%', background:'#1A7A42'}}></div>
                    <div className="h-full rounded-[2px]" style={{width:'27%', background:'#B31B1B'}}></div>
                    <div className="h-full rounded-[2px]" style={{width:'15%', background:'#1A7A42'}}></div>
                    <div className="h-full rounded-[2px]" style={{width:'14%', background:'#1A7A42'}}></div>
                  </div>
                  <div className="grid grid-cols-4 mt-[14px]">
                    <div className="p-[14px_16px] border-r border-t border-[#E2E0D8]">
                      <div className="text-[10px] font-mono tracking-[0.06em] text-[#8A8880] uppercase mb-[6px]">Contrast</div>
                      <div className="font-mono text-[18px] font-medium text-[#1A7A42] mb-[4px]">91</div>
                      <div className="h-[2px] bg-[#F4F3EF] rounded-[1px] overflow-hidden"><div className="h-full rounded-[1px]" style={{width:'91%', background:'#1A7A42'}}></div></div>
                    </div>
                    <div className="p-[14px_16px] border-r border-t border-[#E2E0D8]">
                      <div className="text-[10px] font-mono tracking-[0.06em] text-[#8A8880] uppercase mb-[6px]">Alt text</div>
                      <div className="font-mono text-[18px] font-medium text-[#B31B1B] mb-[4px]">38</div>
                      <div className="h-[2px] bg-[#F4F3EF] rounded-[1px] overflow-hidden"><div className="h-full rounded-[1px]" style={{width:'38%', background:'#B31B1B'}}></div></div>
                    </div>
                    <div className="p-[14px_16px] border-r border-t border-[#E2E0D8]">
                      <div className="text-[10px] font-mono tracking-[0.06em] text-[#8A8880] uppercase mb-[6px]">Typography</div>
                      <div className="font-mono text-[18px] font-medium text-[#1A7A42] mb-[4px]">82</div>
                      <div className="h-[2px] bg-[#F4F3EF] rounded-[1px] overflow-hidden"><div className="h-full rounded-[1px]" style={{width:'82%', background:'#1A7A42'}}></div></div>
                    </div>
                    <div className="p-[14px_16px] border-t border-[#E2E0D8]">
                      <div className="text-[10px] font-mono tracking-[0.06em] text-[#8A8880] uppercase mb-[6px]">Spacing</div>
                      <div className="font-mono text-[18px] font-medium text-[#1A7A42] mb-[4px]">88</div>
                      <div className="h-[2px] bg-[#F4F3EF] rounded-[1px] overflow-hidden"><div className="h-full rounded-[1px]" style={{width:'88%', background:'#1A7A42'}}></div></div>
                    </div>
                  </div>
                  <div className="p-[4px_24px_20px]">
                    <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-[#8A8880] mb-[10px] mt-[12px]">Top issues</div>
                    <div className="flex items-center gap-[10px] py-[7px] border-b border-[#E2E0D8]">
                      <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-[#B31B1B] border-[#B31B1B] bg-[#FDEAEA]">Critical</span>
                      <span className="text-[12px] text-[#4A4840] flex-1">.footer-links contrast too low</span>
                      <span className="font-mono text-[12px] font-medium text-[#B31B1B]">2.1:1</span>
                    </div>
                    <div className="flex items-center gap-[10px] py-[7px] border-b border-[#E2E0D8]">
                      <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-[#B31B1B] border-[#B31B1B] bg-[#FDEAEA]">Critical</span>
                      <span className="text-[12px] text-[#4A4840] flex-1">img.hero-banner missing alt</span>
                      <span className="font-mono text-[12px] font-medium text-[#B31B1B]">—</span>
                    </div>
                    <div className="flex items-center gap-[10px] py-[7px] border-b border-[#E2E0D8]">
                      <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-[#CC4400] border-[#CC4400] bg-[#FEF0EA]">Warn</span>
                      <span className="text-[12px] text-[#4A4840] flex-1">Placeholder text contrast</span>
                      <span className="font-mono text-[12px] font-medium text-[#CC4400]">2.9:1</span>
                    </div>
                    <div className="flex items-center gap-[10px] py-[7px]">
                      <span className="text-[9px] font-mono tracking-[0.06em] px-[6px] py-[2px] rounded-[4px] border uppercase shrink-0 text-[#8A8880] border-[#E2E0D8] bg-[#F4F3EF]">Info</span>
                      <span className="text-[12px] text-[#4A4840] flex-1">4 font families detected</span>
                      <span className="font-mono text-[12px] font-medium text-[#8A8880]">4</span>
                    </div>
                  </div>
                </aside>
              </section>
              
              <section className="px-[40px] pb-[72px] relative z-10" aria-labelledby="recent-hd">
                <div className="flex items-center justify-between mb-[20px]">
                  <h2 id="recent-hd" className="text-[11px] font-mono tracking-[0.08em] uppercase text-[#8A8880] m-0">
                    Recent audits
                  </h2>
                  <a href="#" className="text-[12px] text-[#8A8880] no-underline transition-colors hover:text-[#16150F]">View all →</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px]">
                  {/* Example Cards */}
                  <ExampleCard domain="stripe.com" score={91} issues={2} date="Jun 14 · 1.2s" color="#1A7A42" />
                  <ExampleCard domain="linear.app" score={87} issues={4} date="Jun 14 · 0.9s" color="#1A7A42" />
                  <ExampleCard domain="zomato.com" score={63} issues={11} date="Jun 13 · 2.1s" color="#CC4400" />
                  <ExampleCard domain="swiggy.com" score={71} issues={8} date="Jun 13 · 1.8s" color="#8A5E00" />
                </div>
              </section>
            </div>
            
            {/* How it works section */}
            <section className="bg-[#FAFAF8] border-t border-[#E2E0D8] py-[72px] px-[40px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#E2E0D8 1px, transparent 1px), linear-gradient(90deg, #E2E0D8 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
              <div className="relative z-10 max-w-[1600px] mx-auto">
                <h2 className="text-[32px] font-semibold tracking-[-0.025em] text-[#16150F] mb-[8px]">How it works</h2>
                <p className="text-[15px] text-[#4A4840] mb-[44px] max-w-[440px]">From URL to shareable report in four steps.</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-[#E2E0D8] border border-[#E2E0D8] rounded-[12px] overflow-hidden">
                  <div className="bg-white p-[28px_24px]">
                    <div className="font-mono text-[11px] text-[#B8B6AE] tracking-[0.06em] mb-[16px]">01</div>
                    <div className="text-[15px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Paste your URL</div>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6]">Enter any publicly accessible website. No login, no extension, no setup needed.</p>
                    <span className="inline-block mt-[14px] text-[11px] font-mono px-[10px] py-[3px] rounded-[20px] bg-[#F4F3EF] text-[#8A8880] border border-[#E2E0D8]">https://yoursite.com</span>
                  </div>
                  <div className="bg-white p-[28px_24px]">
                    <div className="font-mono text-[11px] text-[#B8B6AE] tracking-[0.06em] mb-[16px]">02</div>
                    <div className="text-[15px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">We run the audit</div>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6]">A headless browser loads the page and runs WCAG checks across contrast, images, type, and layout.</p>
                    <span className="inline-block mt-[14px] text-[11px] font-mono px-[10px] py-[3px] rounded-[20px] bg-[#F4F3EF] text-[#8A8880] border border-[#E2E0D8]">~10 seconds</span>
                  </div>
                  <div className="bg-white p-[28px_24px]">
                    <div className="font-mono text-[11px] text-[#B8B6AE] tracking-[0.06em] mb-[16px]">03</div>
                    <div className="text-[15px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Read your report</div>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6]">Get a scored report with every issue listed by severity, CSS selector, and measured value.</p>
                    <span className="inline-block mt-[14px] text-[11px] font-mono px-[10px] py-[3px] rounded-[20px] bg-[#F4F3EF] text-[#8A8880] border border-[#E2E0D8]">Scored 0–100</span>
                  </div>
                  <div className="bg-white p-[28px_24px]">
                    <div className="font-mono text-[11px] text-[#B8B6AE] tracking-[0.06em] mb-[16px]">04</div>
                    <div className="text-[15px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Share or download</div>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6]">Every audit gets a permanent URL. Share with your team or download a one-page PDF.</p>
                    <span className="inline-block mt-[14px] text-[11px] font-mono px-[10px] py-[3px] rounded-[20px] bg-[#F4F3EF] text-[#8A8880] border border-[#E2E0D8]">PDF · Link · OG card</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* What we check section */}
            <section className="py-[72px] px-[40px] border-t border-[#E2E0D8] bg-white">
              <div className="max-w-[1600px] mx-auto">
                <h2 className="text-[32px] font-semibold tracking-[-0.025em] text-[#16150F] mb-[8px]">What we check</h2>
                <p className="text-[15px] text-[#4A4840] max-w-[440px] mb-[44px]">Four categories, weighted by impact on real users.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
                  <div className="bg-[#FAFAF8] border border-[#E2E0D8] rounded-[12px] p-[28px] transition-colors hover:border-[#C8C5BA]">
                    <div className="w-[36px] h-[36px] rounded-[8px] bg-white border border-[#E2E0D8] flex items-center justify-center text-[16px] mb-[16px] not-italic">◑</div>
                    <h3 className="text-[16px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Color contrast</h3>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6] mb-[16px]">Every text–background pair measured against WCAG 2.1 AA. We surface the actual ratio so you know exactly what needs fixing.</p>
                    <div className="text-[11px] font-mono text-[#8A8880] pt-[14px] border-t border-[#E2E0D8] leading-[1.8]">Threshold: 4.5:1 normal · 3:1 large text<br />Weight: 40% of overall score</div>
                  </div>
                  <div className="bg-[#FAFAF8] border border-[#E2E0D8] rounded-[12px] p-[28px] transition-colors hover:border-[#C8C5BA]">
                    <div className="w-[36px] h-[36px] rounded-[8px] bg-white border border-[#E2E0D8] flex items-center justify-center text-[16px] mb-[16px] not-italic">⊡</div>
                    <h3 className="text-[16px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Alt text coverage</h3>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6] mb-[16px]">Every meaningful image checked for a non-empty alt attribute. Decorative images with role=&quot;presentation&quot; correctly excluded.</p>
                    <div className="text-[11px] font-mono text-[#8A8880] pt-[14px] border-t border-[#E2E0D8] leading-[1.8]">WCAG 1.1.1 — Level A<br />Weight: 30% of overall score</div>
                  </div>
                  <div className="bg-[#FAFAF8] border border-[#E2E0D8] rounded-[12px] p-[28px] transition-colors hover:border-[#C8C5BA]">
                    <div className="w-[36px] h-[36px] rounded-[8px] bg-white border border-[#E2E0D8] flex items-center justify-center text-[16px] mb-[16px] not-italic font-medium">Aa</div>
                    <h3 className="text-[16px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Typography consistency</h3>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6] mb-[16px]">Counts distinct font families loaded on the page. More than two almost always indicates design system inconsistency.</p>
                    <div className="text-[11px] font-mono text-[#8A8880] pt-[14px] border-t border-[#E2E0D8] leading-[1.8]">Target: ≤2 font families<br />Weight: 15% of overall score</div>
                  </div>
                  <div className="bg-[#FAFAF8] border border-[#E2E0D8] rounded-[12px] p-[28px] transition-colors hover:border-[#C8C5BA]">
                    <div className="w-[36px] h-[36px] rounded-[8px] bg-white border border-[#E2E0D8] flex items-center justify-center text-[16px] mb-[16px] not-italic">⊞</div>
                    <h3 className="text-[16px] font-semibold text-[#16150F] mb-[8px] tracking-[-0.01em]">Spacing consistency</h3>
                    <p className="text-[13px] text-[#4A4840] leading-[1.6] mb-[16px]">Margin and padding values sampled and checked against an 8px grid. Off-grid values signal ad-hoc spacing that breaks visual rhythm.</p>
                    <div className="text-[11px] font-mono text-[#8A8880] pt-[14px] border-t border-[#E2E0D8] leading-[1.8]">Grid: 8px base unit<br />Weight: 15% of overall score</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

function ExampleCard({ domain, score, issues, date, color }: { domain: string, score: number, issues: number, date: string, color: string }) {
  return (
    <Link href={`/audit/mock-${domain}`} className="block bg-white border border-[#E2E0D8] rounded-[10px] p-[20px] cursor-pointer transition-all hover:border-[#C8C5BA] hover:shadow-[0_2px_8px_rgba(16,15,10,0.08),0_1px_2px_rgba(16,15,10,0.04)] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-[#2D6A2D] focus-visible:outline-offset-2 no-underline text-[#16150F]">
      <div className="flex items-start justify-between mb-[14px]">
        <span className="text-[13px] font-medium">{domain}</span>
        <span className="font-mono text-[22px] font-medium leading-none" style={{ color }}>
          {score}
        </span>
      </div>
      <div className="h-[3px] bg-[#F4F3EF] rounded-[2px] overflow-hidden mb-[12px]">
        <div className="h-full rounded-[2px]" style={{ width: `${score}%`, background: color }} />
      </div>
      <div className="flex justify-between items-center text-[11px]">
        <span className="font-mono text-[#B8B6AE]">{date}</span>
        <span className="text-[#8A8880]">{issues} issues</span>
      </div>
    </Link>
  )
}
