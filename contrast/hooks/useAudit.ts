"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type AuditState = 'idle' | 'loading' | 'error'

export function useAudit() {
  const [state, setState] = useState<AuditState>('idle')
  const [step, setStep] = useState(-1)
  const [error, setError] = useState<string>()
  const router = useRouter()

  async function triggerAudit(url: string) {
    setState('loading')
    setError(undefined)
    
    setStep(0)
    const t1 = setTimeout(() => setStep(1), 2000)
    const t2 = setTimeout(() => setStep(2), 5000)
    const t3 = setTimeout(() => setStep(3), 9000)
    
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
        setError(data.error || 'Audit failed')
        setState('error')
        setStep(-1)
        return
      }
      
      // Keep going to step 4 logically before redirecting
      setStep(4)
      setTimeout(() => {
        router.push(`/audit/${data.id}`)
      }, 500)
      
    } catch {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      setError('Network error. Check your connection.')
      setState('error')
      setStep(-1)
    }
  }

  return { triggerAudit, state, step, error }
}
