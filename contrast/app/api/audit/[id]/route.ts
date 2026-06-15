import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // Try to get from mockCache
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache = (global as any).mockCache
  if (cache && cache.has(`audit:${params.id}`)) {
    return NextResponse.json(cache.get(`audit:${params.id}`))
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
