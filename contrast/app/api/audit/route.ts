import { NextRequest, NextResponse } from 'next/server'
import { MOCK_RESULT } from '@/lib/mockAudit'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    
    // Validate URL format
    let parsed: URL
    try {
      parsed = new URL(url)
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error()
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // In Phase 1, we use mock data
    const id = nanoid(10)
    
    // We simulate a delay to show the loading states
    await new Promise(r => setTimeout(r, 1000))
    
    // Create a localized mock result for this ID
    const result = {
      ...MOCK_RESULT,
      id,
      url: parsed.hostname,
      auditedAt: new Date().toISOString(),
    }
    
    // Using a simple in-memory Map for Phase 1 local dev cache
    // In Phase 2, this will use Vercel KV
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).mockCache = (global as any).mockCache || new Map()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).mockCache.set(`audit:${id}`, result)

    return NextResponse.json({ id, result })
  } catch (err) {
    console.error('Audit failed:', err)
    return NextResponse.json({ error: 'Audit failed. The page might not be publicly accessible.' }, { status: 500 })
  }
}
