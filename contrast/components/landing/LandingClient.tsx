"use client";

import React from 'react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { useAudit } from '@/hooks/useAudit';
import { LoadingView } from '@/components/landing/LoadingView';
import { HeroSection } from '@/components/landing/HeroSection';

interface LandingClientProps {
  recentAuditsNode: React.ReactNode;
}

export default function LandingClient({ recentAuditsNode }: LandingClientProps) {
  const { triggerAudit, state, step, error } = useAudit();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Nav />

      <main className="flex-1 w-full relative">
        {state === 'loading' ? (
          <LoadingView step={step} />
        ) : (
          <div className="max-w-[1400px] mx-auto w-full relative">
            <HeroSection
              onAuditSubmit={triggerAudit}
              loading={false}
              error={error}
            />
            {/* Divider */}
            <div className="border-t border-border mx-[40px]" />
            {recentAuditsNode}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
