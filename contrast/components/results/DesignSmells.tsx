import React from 'react'

interface DesignSmellsProps {
  smells?: {
    buttonDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
    typographyDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
    colorDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
    spacingDrift: { variants: number; message: string; severity: "low" | "medium" | "high" };
  }
}

function SmellBadge({ severity }: { severity: "low" | "medium" | "high" }) {
  if (severity === "high") {
    return <span className="text-[9px] font-mono tracking-[0.08em] uppercase text-grade-critical px-[6px] py-[2px] bg-grade-critical/10 border border-grade-critical rounded-[4px]">High</span>
  }
  if (severity === "medium") {
    return <span className="text-[9px] font-mono tracking-[0.08em] uppercase text-grade-warn px-[6px] py-[2px] bg-grade-warn/10 border border-grade-warn rounded-[4px]">Medium</span>
  }
  return <span className="text-[9px] font-mono tracking-[0.08em] uppercase text-text-tertiary px-[6px] py-[2px] bg-bg-subtle border border-border rounded-[4px]">Low</span>
}

export function DesignSmells({ smells }: DesignSmellsProps) {
  if (!smells) return null

  return (
    <div className="mb-[40px]">
      <div className="flex items-center justify-between mb-[18px]">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] m-0">
          Design Smells
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-[16px]">
        <div className="bg-white border border-border rounded-[12px] p-[18px_22px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] flex flex-col gap-[8px]">
          <div className="flex justify-between items-start">
            <div className="text-[14px] font-medium text-text-primary">{smells.buttonDrift.variants} Primary Button Styles Found</div>
            <SmellBadge severity={smells.buttonDrift.severity} />
          </div>
          <p className="text-[12px] text-text-secondary leading-relaxed">{smells.buttonDrift.message}</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-[18px_22px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] flex flex-col gap-[8px]">
          <div className="flex justify-between items-start">
            <div className="text-[14px] font-medium text-text-primary">{smells.colorDrift.variants} Colors Outside Tokens</div>
            <SmellBadge severity={smells.colorDrift.severity} />
          </div>
          <p className="text-[12px] text-text-secondary leading-relaxed">{smells.colorDrift.message}</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-[18px_22px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] flex flex-col gap-[8px]">
          <div className="flex justify-between items-start">
            <div className="text-[14px] font-medium text-text-primary">{smells.typographyDrift.variants} Typography Systems Detected</div>
            <SmellBadge severity={smells.typographyDrift.severity} />
          </div>
          <p className="text-[12px] text-text-secondary leading-relaxed">{smells.typographyDrift.message}</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-[18px_22px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] flex flex-col gap-[8px]">
          <div className="flex justify-between items-start">
            <div className="text-[14px] font-medium text-text-primary">{smells.spacingDrift.variants} Ad-hoc Spacing Values</div>
            <SmellBadge severity={smells.spacingDrift.severity} />
          </div>
          <p className="text-[12px] text-text-secondary leading-relaxed">{smells.spacingDrift.message}</p>
        </div>
      </div>
    </div>
  )
}
