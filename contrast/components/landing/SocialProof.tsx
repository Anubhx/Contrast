import React from 'react';

export function SocialProof() {
  const companies = ['Razorpay', 'Zepto', 'CRED', 'Groww', 'PhonePe', 'Coinbase'];

  return (
    <div className="w-full border-y border-[#E8E5DE] py-[16px] bg-[#F8F7F4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[40px] flex flex-col md:flex-row md:items-center justify-between gap-[16px]">
        <div className="text-[13px] text-text-secondary whitespace-nowrap shrink-0">
          Trusted by designers and engineers at
        </div>
        
        {/* Desktop static, Mobile marquee */}
        <div className="relative flex overflow-hidden group">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @media (max-width: 767px) {
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 15s linear infinite;
              }
            }
          `}} />
          
          <div className="flex items-center gap-[24px] md:gap-[32px] md:justify-end animate-marquee w-full">
            {/* First set */}
            <div className="flex items-center gap-[24px] md:gap-[32px]">
              {companies.map((c, i) => (
                <span key={i} className="font-medium text-[13px] text-text-tertiary tracking-[0.02em] whitespace-nowrap">
                  {c}
                </span>
              ))}
            </div>
            
            {/* Duplicate set for infinite loop (hidden on md+) */}
            <div className="flex items-center gap-[24px] md:hidden" aria-hidden="true">
              {companies.map((c, i) => (
                <span key={`dup-${i}`} className="font-medium text-[13px] text-text-tertiary tracking-[0.02em] whitespace-nowrap">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
