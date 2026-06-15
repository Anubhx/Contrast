import React from 'react'

interface ScreenshotViewerProps {
  screenshotUrl?: string | null
  url: string
}

export function ScreenshotViewer({ screenshotUrl, url }: ScreenshotViewerProps) {
  // If we have an actual screenshotUrl, use it. Otherwise use the mock simulation.
  return (
    <div className="mt-[32px]" aria-labelledby="ss-lbl">
      <h3 className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-tertiary mb-[14px]" id="ss-lbl">
        Page screenshot with annotations
      </h3>
      <div className="border border-border rounded-[10px] overflow-hidden shadow-[0_1px_2px_rgba(16,15,10,0.06)]">
        <div className="h-[36px] bg-bg-subtle border-b border-border flex items-center px-[12px] gap-[6px]" aria-hidden="true">
          <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]"></div>
          <div className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]"></div>
          <div className="w-[9px] h-[9px] rounded-full bg-[#28C840]"></div>
          <div className="flex-1 h-[20px] bg-white border border-border rounded-[10px] mx-[16px] flex items-center px-[10px]">
            <span className="text-[10px] font-mono text-text-tertiary">https://{url}</span>
          </div>
        </div>
        
        <div className="bg-bg-subtle min-h-[260px] relative overflow-hidden p-[18px]" aria-label={`Annotated screenshot of ${url} showing flagged accessibility issues`}>
          {screenshotUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={screenshotUrl} alt={`Screenshot of ${url}`} className="w-full h-auto rounded-[8px] border border-border" />
          ) : (
            <>
              {/* Mock browser content if no screenshot provided */}
              <div className="bg-white border border-border rounded-[8px] overflow-hidden">
                <div className="h-[32px] bg-white border-b border-border flex items-center px-[12px] gap-[6px]" aria-hidden="true">
                  <div className="w-[56px] h-[9px] bg-text-primary rounded-[2px]"></div>
                  <div className="flex gap-[10px] ml-[14px]">
                    <div className="w-[28px] h-[7px] bg-bg-subtle rounded-[2px]"></div>
                    <div className="w-[28px] h-[7px] bg-bg-subtle rounded-[2px]"></div>
                    <div className="w-[28px] h-[7px] bg-bg-subtle rounded-[2px]"></div>
                  </div>
                </div>
                <div className="p-[18px_12px] bg-[#f8f8ff] border-b border-border" aria-hidden="true">
                  <div className="w-[65%] h-[13px] bg-text-primary rounded-[2px] mb-[7px]"></div>
                  <div className="w-[45%] h-[9px] bg-bg-subtle rounded-[2px] mb-[11px]"></div>
                  <div className="flex gap-[6px]">
                    <div className="flex-1 h-[30px] bg-bg-subtle rounded-[4px]"></div>
                    <div className="flex-1 h-[30px] bg-bg-subtle rounded-[4px]"></div>
                    <div className="flex-1 h-[30px] bg-bg-subtle rounded-[4px]"></div>
                  </div>
                </div>
                <div className="p-[12px] flex flex-col gap-[5px]" aria-hidden="true">
                  <div className="h-[7px] bg-bg-subtle rounded-[2px]"></div>
                  <div className="w-[50%] h-[7px] bg-bg-subtle rounded-[2px]"></div>
                  <div className="h-[7px] bg-bg-subtle rounded-[2px]"></div>
                </div>
              </div>
              
              {/* Mock annotations */}
              <div className="absolute border-[1.5px] border-solid border-grade-critical rounded-[3px] pointer-events-none" style={{ top: '50px', left: '20px', width: '148px', height: '28px' }} aria-hidden="true">
                <span className="absolute top-[-18px] left-0 text-[9px] font-mono bg-white px-[5px] py-[1px] rounded-[2px] whitespace-nowrap border border-solid text-grade-critical border-grade-critical">2.1:1 — contrast fail</span>
              </div>
              <div className="absolute border-[1.5px] border-solid border-grade-critical rounded-[3px] pointer-events-none" style={{ top: '92px', left: '20px', width: '208px', height: '64px' }} aria-hidden="true">
                <span className="absolute top-[-18px] left-0 text-[9px] font-mono bg-white px-[5px] py-[1px] rounded-[2px] whitespace-nowrap border border-solid text-grade-critical border-grade-critical">missing alt text</span>
              </div>
              <div className="absolute border-[1.5px] border-solid border-grade-warn rounded-[3px] pointer-events-none" style={{ top: '174px', left: '20px', width: '128px', height: '18px' }} aria-hidden="true">
                <span className="absolute top-[-18px] left-0 text-[9px] font-mono bg-white px-[5px] py-[1px] rounded-[2px] whitespace-nowrap border border-solid text-grade-warn border-grade-warn">3.8:1 — warn</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
