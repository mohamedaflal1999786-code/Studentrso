'use client';

import { services, ServiceData } from '@/lib/data';
import { HomepageModuleCard } from '@/components/HomepageModuleCard';

interface ServicesSectionProps {
  onServiceClick: (s: ServiceData) => void;
}

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  return (
    <section id="modules" className="w-full bg-[#fbf7ee] py-14 lg:py-24 border-t border-b border-[#e5dcbe] scroll-mt-20">
      <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#8c6d23] font-bold tracking-wider uppercase">
              STUDENT RSO PLATFORM • 10 CORE MODULES
            </span>
            <div className="w-8 h-0.5 bg-[#c59b27]" />
          </div>
          <h2 className="font-serif text-[30px] sm:text-[40px] leading-[36px] sm:leading-[48px] text-[#111814] mt-2 mb-4 font-bold">
            Student Services &amp; <span className="italic text-[#0d3e2e]">Opportunities Platform</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#57534e] leading-relaxed">
            Everything students need to access their rights, educational support, opportunities and essential services — in one organised platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s) => (
            <HomepageModuleCard
              key={s.id}
              module={s}
              onModuleClick={onServiceClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
