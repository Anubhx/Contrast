"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getGradeColor } from "@/lib/utils"

interface ScoreRingProps {
  score: number
  size?: 'sm' | 'lg'
  animated?: boolean
  label?: string
}

export function ScoreRing({ score, size = 'lg', animated = true, label }: ScoreRingProps) {
  const [currentScore, setCurrentScore] = useState(animated ? 0 : score)
  
  const diameter = size === 'lg' ? 160 : 120
  const strokeWidth = 6
  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  
  useEffect(() => {
    if (!animated) return
    
    let startTimestamp: number | null = null
    const duration = 1200 // 1.2s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      
      setCurrentScore(Math.round(easeProgress * score))
      
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [score, animated])

  const gradeColor = getGradeColor(score)
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative flex items-center justify-center" 
        style={{ width: diameter, height: diameter }}
      >
        <svg 
          className="absolute transform -rotate-90"
          width={diameter} 
          height={diameter} 
          viewBox={`0 0 ${diameter} ${diameter}`}
        >
          {/* Track ring */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="var(--color-ring-track)"
            strokeWidth={strokeWidth}
          />
          {/* Fill ring */}
          <motion.circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={gradeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={animated ? { strokeDashoffset: circumference } : false}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} // easeOutQuart
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div 
          className="font-display font-normal leading-none"
          style={{ 
            fontSize: size === 'lg' ? 80 : 54, 
            color: gradeColor,
            letterSpacing: "-0.02em" 
          }}
        >
          {currentScore}
        </div>
      </div>
      {label && (
        <div className="mt-2 text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-text-secondary text-center">
          {label}
        </div>
      )}
    </div>
  )
}
