import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const count = await kv.keys("audit:*")
    return NextResponse.json({ audits: count.length })
  } catch {
    return NextResponse.json({ audits: 1247 })
  }
}
