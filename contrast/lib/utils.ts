import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGradeColor(score: number): string {
  if (score >= 90) return 'var(--color-grade-excellent)'
  if (score >= 70) return 'var(--color-grade-good)'
  if (score >= 50) return 'var(--color-grade-warn)'
  return 'var(--color-grade-critical)'
}

export function getGradeText(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Needs work'
  return 'Critical'
}
