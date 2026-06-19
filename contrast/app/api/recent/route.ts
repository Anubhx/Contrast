import { NextResponse } from "next/server"
import { createAdminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('audits')
      .select('id, domain, overall_score, result, created_at')
      .order('created_at', { ascending: false })
      .limit(6);
      
    if (!data) return NextResponse.json([]);

    const recent = data.map((audit) => ({
      id: audit.id,
      domain: audit.domain,
      score: audit.overall_score || 0,
      grade: (audit.overall_score || 0) >= 85 ? 'Excellent' : (audit.overall_score || 0) >= 70 ? 'Good' : (audit.overall_score || 0) >= 50 ? 'Needs work' : 'Critical',
      date: new Date(audit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      issues: audit.result?.issues?.length || 0,
      color: (audit.overall_score || 0) >= 85 ? '#1A7A42' : (audit.overall_score || 0) >= 70 ? '#8A5E00' : (audit.overall_score || 0) >= 50 ? '#CC4400' : '#B31B1B'
    }));

    return NextResponse.json(recent);
  } catch {
    return NextResponse.json([]);
  }
}
