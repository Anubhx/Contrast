interface ScreenshotViewerProps {
  screenshotUrl?: string | null
  url: string
}

export function ScreenshotViewer({ screenshotUrl, url }: ScreenshotViewerProps) {
  if (!screenshotUrl) return null

  return (
    <div className="px-[24px] py-[32px] border-t border-border">
      <h2 className="text-[11px] font-mono tracking-[0.08em] uppercase text-text-secondary mb-[14px]">
        Screenshot
      </h2>
      <div className="border border-border rounded-[10px] overflow-hidden shadow-sm">
        {/* Chrome-like top bar */}
        <div className="h-[36px] bg-bg-subtle border-b border-border flex items-center px-[12px] gap-[6px]">
          <div className="flex gap-[6px]">
            <div className="w-[9px] h-[9px] rounded-full bg-border-subtle" />
            <div className="w-[9px] h-[9px] rounded-full bg-border-subtle" />
            <div className="w-[9px] h-[9px] rounded-full bg-border-subtle" />
          </div>
          <div className="flex-1 h-[20px] bg-white  border border-border rounded-[10px] mx-[16px] flex items-center px-[10px]">
            <span className="text-[10px] font-mono text-text-tertiary truncate">
              {url}
            </span>
          </div>
        </div>
        {/* Image Area */}
        <div className="bg-bg-subtle min-h-[260px] relative overflow-hidden flex items-center justify-center p-[18px]">
          {/* Base64 image rendering if screenshotUrl is a data URL, or regular URL */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={screenshotUrl.startsWith('data:') ? screenshotUrl : `data:image/jpeg;base64,${screenshotUrl}`} 
            alt={`Screenshot of ${url}`} 
            className="max-w-full rounded-[8px] border border-border shadow-sm object-contain max-h-[400px]"
          />
        </div>
      </div>
    </div>
  )
}
