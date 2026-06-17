import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('audits')
      .select('result')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(data.result);
  } catch (error) {
    console.error('Fetch error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
