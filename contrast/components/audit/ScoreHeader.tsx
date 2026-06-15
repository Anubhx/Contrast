import { Share, Download } from "lucide-react"
import { ScoreRing } from "@/components/ui/ScoreRing"

interface ScoreHeaderProps {
  score: number
  url: string
  auditedAt: string
}

export function ScoreHeader({ score, url, auditedAt }: ScoreHeaderProps) {
  // Quick formatting for date
  const dateObj = new Date(auditedAt)
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="px-[24px] pt-[28px] pb-[20px] border-b border-border bg-bg-subtle">
      <div className="flex items-start justify-between mb-[20px]">
        <div>
          <h1 className="text-[17px] font-semibold text-text-primary tracking-[-0.02em] m-0">
            {url}
          </h1>
          <p className="text-[11px] font-mono text-text-secondary mt-[3px]">
            {dateStr} · {timeStr}
          </p>
        </div>
        <div className="flex gap-[8px] hide-on-print">
          <button 
            className="text-[12px] font-sans px-[14px] py-[6px] rounded-[8px] border border-border bg-white  text-text-secondary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle inline-flex items-center gap-[5px] shadow-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copied to clipboard")
            }}
          >
            <Share className="w-[13px] h-[13px]" />
            Share
          </button>
          <button 
            className="text-[12px] font-sans px-[14px] py-[6px] rounded-[8px] border border-border bg-white  text-text-secondary cursor-pointer transition-colors hover:border-border-subtle hover:bg-bg-subtle inline-flex items-center gap-[5px] shadow-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            onClick={() => window.print()}
          >
            <Download className="w-[13px] h-[13px]" />
            PDF
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <ScoreRing score={score} animated={true} />
      </div>
    </div>
  )
}
