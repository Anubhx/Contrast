import { notFound } from "next/navigation"
import { ResultsLayout } from "@/components/results/ResultsLayout"
import { AuditResult } from "@/lib/types"

import { headers } from "next/headers"

async function getAuditResult(id: string): Promise<AuditResult | null> {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`
  
  try {
    const res = await fetch(`${baseUrl}/api/audit/${id}`, { 
      cache: 'no-store' // We want fresh data while polling/loading
    })
    if (!res.ok) return null
    return res.json()
  } catch (e) {
    console.error("Failed to fetch audit result:", e)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await getAuditResult(params.id)
  if (!result) return { title: "Audit Not Found — Contrast" }
  
  return {
    title: `${result.url} scored ${result.scores.overall}/100 — Contrast`,
    // In Phase 2:
    // openGraph: { images: [`/api/og/${params.id}`] }
  }
}

export default async function AuditPage({ params }: { params: { id: string } }) {
  const result = await getAuditResult(params.id)
  
  if (!result) {
    notFound()
  }

  return <ResultsLayout result={result} />
}
