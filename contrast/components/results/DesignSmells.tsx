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

function SmellBadge({ severity }: { severity: "low" | "medium" | "high" }) {
  if (severity === "high") {
    return <span className="text-[9px] font-mono tracking-[0.08em] uppercase text-grade-critical px-[6px] py-[2px] bg-grade-critical/10 border border-grade-critical rounded-[4px]">High</span>
  }
  if (severity === "medium") {
    return <span className="text-[9px] font-mono tracking-[0.08em] uppercase text-grade-warn px-[6px] py-[2px] bg-grade-warn/10 border border-grade-warn rounded-[4px]">Medium</span>
  }
  return <span className="text-[9px] font-mono tracking-[0.08em] uppercase text-text-tertiary px-[6px] py-[2px] bg-bg-subtle border border-border rounded-[4px]">Low</span>
}

/** Renders up to `max` chip items, then a "+N more" if truncated. */
function SampleChips({ samples, max = 6 }: { samples?: string[]; max?: number }) {
  if (!samples || samples.length === 0) return null;
  const shown = samples.slice(0, max);
  const overflow = samples.length - shown.length;
  return (
    <div className="flex flex-wrap gap-[4px] mt-[8px]">
      {shown.map((s, i) => (
        <span
          key={i}
          className="text-[10px] font-mono text-text-secondary bg-bg-subtle border border-border rounded-[4px] px-[6px] py-[2px] leading-none"
          title={s}
        >
          {s.length > 22 ? s.slice(0, 22) + '…' : s}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-[10px] font-mono text-text-quaternary px-[4px] py-[2px] leading-none">
          +{overflow} more
        </span>
      )}
    </div>
  );
}

function SmellCard({ title, data }: { title: string; data: SmellData }) {
  return (
    <div className="bg-white border border-border rounded-[12px] p-[18px_22px] shadow-[0_1px_2px_rgba(16,15,10,0.06)] flex flex-col gap-[6px]">
      <div className="flex justify-between items-start">
        <div className="text-[14px] font-medium text-text-primary">{title}</div>
        <SmellBadge severity={data.severity} />
      </div>
      <p className="text-[12px] text-text-secondary leading-relaxed m-0">{data.message}</p>
      <SampleChips samples={data.samples} />
    </div>
  );
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
        <SmellCard title="Button Styles" data={smells.buttonDrift} />
        <SmellCard title="Color Palette" data={smells.colorDrift} />
        <SmellCard title="Typography" data={smells.typographyDrift} />
        <SmellCard title="Spacing Values" data={smells.spacingDrift} />
      </div>
    </div>
  )
}
