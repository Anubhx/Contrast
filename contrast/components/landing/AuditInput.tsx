"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AuditInputProps {
  onSubmit: (url: string) => void
  loading?: boolean
  error?: string
}

export function AuditInput({ onSubmit, loading, error }: AuditInputProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    let finalUrl = url
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`
    }
    onSubmit(finalUrl)
  }

  return (
    <div className="w-full max-w-[540px]">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center bg-bg-elevated border-[1.5px] border-border-subtle rounded-md shadow-sm overflow-hidden transition-all duration-150 mb-4 h-[52px]",
          "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10",
          error && "border-grade-critical focus-within:border-grade-critical focus-within:ring-grade-critical/10"
        )}
      >
        <label htmlFor="url-input" className="sr-only">Website URL to audit</label>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourproduct.com"
          autoComplete="url"
          spellCheck="false"
          className="flex-1 border-none outline-none font-sans text-[14px] text-text-primary bg-transparent px-4 min-w-0 placeholder:text-text-tertiary"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="bg-accent text-[#0C0C0D] border-none font-sans text-[13px] font-semibold px-[22px] h-[44px] m-1 rounded-[7px] cursor-pointer tracking-[0.01em] whitespace-nowrap transition-all duration-150 hover:bg-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 shrink-0"
        >
          {loading ? "Auditing..." : "Audit"}
        </button>
      </form>
      {error && (
        <p className="text-[12px] font-mono tracking-[0.06em] text-grade-critical uppercase mt-2">
          {error}
        </p>
      )}
    </div>
  )
}
