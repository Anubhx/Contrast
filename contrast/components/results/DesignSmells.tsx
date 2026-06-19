import React from 'react'

interface SmellData {
  variants: number;
  message: string;
  severity: "low" | "medium" | "high";
  samples?: string[];
}

interface DesignSmellsProps {
  smells?: {
    buttonDrift: SmellData;
    typographyDrift: SmellData;
    colorDrift: SmellData;
    spacingDrift: SmellData;
  }
}

function SeverityBadge({ severity }: { severity: "low" | "medium" | "high" }) {
  if (severity === "high") {
    return <span className="text-[8px] font-mono tracking-[0.06em] uppercase text-grade-critical px-[5px] py-[1.5px] border border-grade-critical rounded-[3px] bg-[#FEF2F2]">High</span>
  }
  if (severity === "medium") {
    return <span className="text-[8px] font-mono tracking-[0.06em] uppercase text-grade-warn px-[5px] py-[1.5px] border border-grade-warn rounded-[3px] bg-[#FFFBEB]">Warn</span>
  }
  return <span className="text-[8px] font-mono tracking-[0.06em] uppercase text-text-quaternary px-[5px] py-[1.5px] border border-border rounded-[3px] bg-bg-subtle">Low</span>
}

function SampleChips({ samples }: { samples?: string[] }) {
  if (!samples || samples.length === 0) return null;
  const shown = samples.slice(0, 6);
  const overflow = samples.length - shown.length;
  return (
    <div className="flex flex-wrap gap-[3px] mt-[8px]">
      {shown.map((s, i) => (
        <span key={i} className="text-[9px] font-mono text-text-tertiary bg-bg-subtle border border-border rounded-[3px] px-[5px] py-[1px]">
          {s.length > 20 ? s.slice(0, 20) + '…' : s}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-[9px] font-mono text-text-quaternary px-[3px] py-[1px]">+{overflow}</span>
      )}
    </div>
  )
}

function SmellCard({ label, data }: { label: string; data: SmellData }) {
  return (
    <div className="border border-border rounded-[5px] bg-white p-[14px_16px]">
      <div className="flex items-start justify-between mb-[4px]">
        <span className="font-mono text-[28px] font-semibold leading-none text-text-primary">{data.variants}</span>
        <SeverityBadge severity={data.severity} />
      </div>
      <div className="text-[9px] font-mono uppercase tracking-[0.06em] text-text-quaternary mb-[2px]">{label}</div>
      <div className="text-[11px] text-text-secondary leading-[1.4]">{data.message}</div>
      <SampleChips samples={data.samples} />
    </div>
  )
}

export function DesignSmells({ smells }: DesignSmellsProps) {
  if (!smells) return null

  return (
    <section className="mb-[28px]">
      <div className="text-[9px] font-mono tracking-widest uppercase text-text-quaternary mb-[10px]">
        Design Smells
      </div>
      <div className="grid grid-cols-2 gap-[10px]">
        <SmellCard label="Button Styles"   data={smells.buttonDrift}    />
        <SmellCard label="Color Palette"   data={smells.colorDrift}     />
        <SmellCard label="Typography"      data={smells.typographyDrift} />
        <SmellCard label="Spacing Values"  data={smells.spacingDrift}   />
      </div>
    </section>
  )
}
