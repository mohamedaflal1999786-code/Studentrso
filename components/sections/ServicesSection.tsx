'use client';

import { services, ServiceData } from '@/lib/data';
import { HomepageModuleCard } from '@/components/HomepageModuleCard';

interface ServicesSectionProps {
  onServiceClick: (s: ServiceData) => void;
}

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  return (
    <section id="modules" className="w-full bg-[#f6ede0] py-14 lg:py-24 border-t border-b border-[#efe3cc] scroll-mt-20">
      <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#e0a526] font-bold tracking-wider uppercase">
              STUDENT RSO PLATFORM • 10 CORE MODULES
            </span>
            <div className="w-8 h-0.5 bg-[#e0a526]" />
          </div>
          <h2 className="font-serif text-[30px] sm:text-[40px] leading-[36px] sm:leading-[48px] text-[#2b2118] mt-2 mb-4 font-bold">
            Student Services &amp; <span className="italic text-[#8c2f39]">Opportunities Platform</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#7a6a5a] leading-relaxed">
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
