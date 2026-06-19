"use client";

import React from 'react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { useAudit } from '@/hooks/useAudit';
import { LoadingView } from '@/components/landing/LoadingView';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProof } from '@/components/landing/SocialProof';
import { BentoGrid } from '@/components/landing/BentoGrid';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WcagAccordion } from '@/components/landing/WcagAccordion';
import { LiveCounter } from '@/components/landing/LiveCounter';
import { CtaFooter } from '@/components/landing/CtaFooter';

interface LandingClientProps {
  recentAuditsNode: React.ReactNode;
}

export default function LandingClient({ recentAuditsNode }: LandingClientProps) {
  const { triggerAudit, state, step, error } = useAudit();

  if (state === 'loading') {
    return (
      <div className="flex flex-col min-h-screen relative">
        <Nav />
        <main className="flex-1 w-full relative">
          <LoadingView step={step} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      <Nav />

      <main className="flex-1 w-full relative">
        <HeroSection
          onAuditSubmit={triggerAudit}
          loading={false}
          error={error}
        />
        
        <SocialProof />
        <BentoGrid />
        <HowItWorks />
        <WcagAccordion />
        <LiveCounter />
        
        {/* recentAuditsNode renders the RecentAudits component passed from app/page.tsx */}
        {recentAuditsNode}
        
        <CtaFooter 
          onAuditSubmit={triggerAudit} 
          loading={false} 
          error={error} 
        />
      </main>

      <Footer />
    </div>
  );
}
