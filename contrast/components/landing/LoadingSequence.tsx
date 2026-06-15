"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LOADING_STEPS } from "@/constants"
import { cn } from "@/lib/utils"

interface LoadingSequenceProps {
  currentStep: number // -1 = not started, 0..3 = steps, 4 = done
}

export function LoadingSequence({ currentStep }: LoadingSequenceProps) {
  return (
    <div className="flex flex-col">
      <AnimatePresence>
        {LOADING_STEPS.map((stepLabel, index) => {
          const isDone = currentStep > index
          const isActive = currentStep === index
          const isPending = currentStep < index

          // Only show steps up to current + 1 (reveal one by one)
          if (currentStep !== -1 && index > currentStep) return null

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-[14px] py-[14px] border-b border-border last:border-b-0"
            >
              <div className={cn(
                "w-[20px] h-[20px] rounded-full shrink-0 flex items-center justify-center mt-[2px]",
                {
                  "bg-grade-excellent": isDone,
                  "bg-white border-[1.5px] border-border-subtle": isActive,
                  "bg-bg-subtle border-[1.5px] border-border": isPending,
                }
              )}>
                {isDone && (
                  <div className="w-[8px] h-[5px] border-l-[1.5px] border-b-[1.5px] border-white -rotate-45 -translate-y-[1px]" />
                )}
                {isActive && (
                  <motion.div 
                    className="w-[8px] h-[8px] rounded-full bg-accent"
                    animate={{ scale: [1, 0.65, 1], opacity: [1, 0.45, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className={cn(
                  "text-[14px] mb-[3px]",
                  isActive || isDone ? "font-medium text-text-primary" : "text-text-secondary font-normal"
                )}>
                  {stepLabel}
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
