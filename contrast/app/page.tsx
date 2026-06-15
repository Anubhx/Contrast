"use client";

import React from 'react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { useAudit } from '@/hooks/useAudit';

import { LoadingView } from '@/components/landing/LoadingView';
import { HeroSection } from '@/components/landing/HeroSection';
import { RecentAudits } from '@/components/landing/RecentAudits';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WhatWeCheck } from '@/components/landing/WhatWeCheck';

export default function Home() {
  const { triggerAudit, state, step, error } = useAudit();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Nav />
      
      <main className="flex-1 w-full relative">
        {state === 'loading' ? (
          <LoadingView step={step} />
        ) : (
          <>
            {/* 
              LAYOUT WIDTH EXPERIMENTATION: 
              Change "max-w-[1600px]" below to a larger number (like 1800px) 
              or "w-full" if you want it to stretch completely to the edges! 
            */}
            <div className="max-w-[1600px] mx-auto w-full relative">
              <HeroSection 
                onAuditSubmit={triggerAudit} 
                loading={false} 
                error={error} 
              />
              <RecentAudits />
            </div>
            
            <HowItWorks />
            <WhatWeCheck />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
