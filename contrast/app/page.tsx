import LandingClient from '@/components/landing/LandingClient';
import { RecentAudits } from '@/components/landing/RecentAudits';

export default function Home() {
  return (
    <LandingClient 
      recentAuditsNode={<RecentAudits />} 
    />
  );
}
