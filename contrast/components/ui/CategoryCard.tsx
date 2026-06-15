"use client"

import { motion } from "framer-motion"
import { getGradeColor } from "@/lib/utils"

interface CategoryCardProps {
  label: string
  score: number
  issueCount: number
}

export function CategoryCard({ label, score, issueCount }: CategoryCardProps) {
  const gradeColor = getGradeColor(score)

  return (
    <div className="bg-bg-elevated p-4 sm:p-[18px]">
      <div className="text-[10px] font-mono tracking-[0.06em] uppercase text-text-secondary mb-2">
        {label}
      </div>
      <div 
        className="font-mono text-2xl font-medium mb-1.5 leading-none"
        style={{ color: gradeColor }}
      >
        {score}
      </div>
      <div className="h-[3px] bg-bg-subtle rounded-[2px] overflow-hidden mb-1.5">
        <motion.div 
          className="h-full rounded-[2px]"
          style={{ background: gradeColor }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <div className="text-[11px] text-text-secondary">
        {issueCount} {issueCount === 1 ? 'issue' : 'issues'}
      </div>
    </div>
  )
}
