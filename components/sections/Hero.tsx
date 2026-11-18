'use client';

import { AppIcon } from '@/components/AppIcon';
import { UniversalPlatformSearch } from '@/components/search/UniversalPlatformSearch';

interface HeroProps {
  onNavigate: (id: string) => void;
  onServiceClick?: (s: any) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fbf5e9] via-[#fdfbf6] to-[#fbf5e9] pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 border-b border-[#efe3cc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Subtle Platform Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] text-[#8c2f39] font-mono text-[11px] sm:text-[12px] uppercase tracking-widest mb-6 shadow-2xs">
          <span className="font-bold text-[#2b2118]">ONE STUDENT. ONE PLATFORM. EVERY OPPORTUNITY.</span>
        </div>

        {/* 1. Main Heading */}
        <h1 className="flex flex-col items-center tracking-tight leading-[1.12] min-h-[90px] sm:min-h-[130px] lg:min-h-[160px]">
          <span className="font-serif text-[32px] xs:text-[40px] sm:text-[56px] lg:text-[68px] font-bold text-[#2b2118] text-balance">
            Everything Students Need.
          </span>
          <span className="font-serif italic text-[#8c2f39] text-[30px] xs:text-[38px] sm:text-[52px] lg:text-[64px] mt-1 sm:mt-2 text-balance">
            One Trusted Place.
          </span>
        </h1>

        {/* Short golden underline below heading */}
        <div className="w-24 sm:w-32 h-1 bg-[#e0a526] rounded-full mx-auto mt-5 sm:mt-6 mb-8 sm:mb-10" />

        {/* Supporting description */}
        <p className="font-sans text-[16px] sm:text-[19px] lg:text-[20px] text-[#5c4a3b] max-w-2xl leading-relaxed mb-8">
          A student-first digital public platform connecting learners with trusted services, educational support, official resources, and verified opportunities throughout their academic journey.
        </p>

        {/* Unique & Minimal Search Bar (All Details & Shortcuts) */}
        <div className="w-full mb-10 z-20">
          <UniversalPlatformSearch />
        </div>

        {/* Two Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#modules"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('modules');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group active:scale-[0.98]"
          >
            <span>Explore Modules</span>
            <AppIcon name="arrow_forward" className="text-[19px] group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('how-it-works');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#fdfbf6] hover:bg-[#f6ede0] border border-[#d8c7ad] text-[#2b2118] font-sans text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <AppIcon name="account_tree" className="text-[19px] text-[#92400e]" />
            <span>How It Works</span>
          </a>
        </div>
      </div>
    </section>
  );
}
