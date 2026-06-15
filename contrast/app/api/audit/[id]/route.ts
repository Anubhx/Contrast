import { NextRequest, NextResponse } from 'next/server'
import { MOCK_RESULT } from '@/lib/mockAudit'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // Try to get from mockCache
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache = (global as any).mockCache
  if (cache && cache.has(`audit:${params.id}`)) {
    return NextResponse.json(cache.get(`audit:${params.id}`))
  }

  // Fallback to the default mock if not found in cache
  // This allows direct linking to /audit/mock123
  if (params.id.startsWith('mock')) {
    return NextResponse.json({
        ...MOCK_RESULT,
        id: params.id,
        url: params.id.replace('mock-', '') === params.id ? MOCK_RESULT.url : params.id.replace('mock-', ''),
    })
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
