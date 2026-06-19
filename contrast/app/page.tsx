import LandingClient from '@/components/landing/LandingClient';
import { RecentAudits } from '@/components/landing/RecentAudits';
import { createAdminClient } from '@/lib/supabase';
import { RecentAuditData } from '@/lib/types';

export default async function Home() {
  let recentAudits: RecentAuditData[] = [];
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('audits')
      .select('id, domain, overall_score, result, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (data) {
      recentAudits = data.map((audit) => ({
        id: audit.id,
        domain: audit.domain,
        score: audit.overall_score || 0,
        issues: audit.result?.issues?.length || 0,
        date: new Date(audit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        color: (audit.overall_score || 0) >= 85 ? '#1A7A42' : (audit.overall_score || 0) >= 70 ? '#8A5E00' : (audit.overall_score || 0) >= 50 ? '#CC4400' : '#B31B1B'
      }));
    }
  } catch (e) {
    console.warn('Failed to fetch recent audits from Supabase', e);
  }

  return (
    <LandingClient 
      recentAuditsNode={<RecentAudits audits={recentAudits} />} 
    />
  );
}
