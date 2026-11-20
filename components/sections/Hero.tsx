'use client';

import { AppIcon } from '@/components/AppIcon';

interface HeroProps {
  onNavigate: (id: string) => void;
  onServiceClick?: (s: any) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fbf7ee] via-[#fdfbf6] to-[#fbf7ee] pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 border-b border-[#e5dcbe]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Overline with Gold Dash — A BETTER WAY FORWARD */}
        <div className="inline-flex items-center gap-2.5 mb-6">
          <span className="w-8 h-0.5 bg-[#dfab2a] rounded-full" />
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-[#601a36] font-bold">
            A BETTER WAY FORWARD
          </span>
        </div>

        {/* 1. Main Heading — "Every ambition deserves" on top in black, "a way forward." downside on a separate line in green */}
        <h1 className="flex flex-col items-center tracking-tight leading-[1.12] min-h-[90px] sm:min-h-[130px] lg:min-h-[160px]">
          <span className="font-serif text-[32px] xs:text-[40px] sm:text-[56px] lg:text-[68px] font-bold text-[#111814] text-balance">
            Every ambition deserves
          </span>
          <span className="font-serif italic text-[#0d3e2e] text-[30px] xs:text-[38px] sm:text-[52px] lg:text-[64px] mt-1 sm:mt-2 text-balance">
            a way forward.
          </span>
        </h1>

        {/* Short golden underline below heading */}
        <div className="w-24 sm:w-32 h-1 bg-[#c59b27] rounded-full mx-auto mt-5 sm:mt-6 mb-8 sm:mb-10" />

        {/* Supporting description */}
        <p className="font-sans text-[16px] sm:text-[19px] lg:text-[20px] text-[#57534e] max-w-2xl leading-relaxed mb-10">
          From your first big academic decision to your next opportunity, discover the guidance, services and support you need — all in one thoughtful place.
        </p>

        {/* Two Primary Action Buttons — Explore student services in GREEN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#modules"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('modules');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
          >
            <span>Explore student services</span>
            <span className="text-[17px] font-bold leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('how-it-works');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#fdfbf6] hover:bg-[#f6ede0] border border-[#d8c7ad] text-[#111814] font-sans text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <span>See how it works</span>
            <span className="text-[17px] font-semibold leading-none text-[#8c6d23]">↗</span>
          </a>
        </div>

        {/* Badges below buttons: ✦ Student-first platform   ✦ 10 core services */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-9 text-[12.5px] sm:text-[13.5px] font-sans text-[#601a36] font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="text-[#dfab2a] text-sm">✦</span>
            <span>Student-first platform</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-[#dfab2a] text-sm">✦</span>
            <span>10 core services</span>
          </span>
        </div>
      </div>
    </section>
  );
}
