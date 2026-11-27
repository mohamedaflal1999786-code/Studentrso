'use client';

import { AppIcon } from '@/components/AppIcon';
import { coreValues, problemCards } from '@/lib/data';

export function ProblemSection() {
  return (
    <section className="w-full bg-[#f2f8f4] py-10 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#0d3e2e] font-bold tracking-wider uppercase">THE CHALLENGE</span>
            <div className="w-8 h-0.5 bg-[#0d3e2e]" />
          </div>
          <h2 className="font-serif text-[26px] sm:text-[36px] leading-[32px] sm:leading-[44px] text-[#111814] mt-2 mb-4 font-bold">
            Good opportunities exist. <span className="italic text-[#0d3e2e]">Finding them is the hard part.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#4a4a4a] leading-relaxed">
            Students often navigate information across multiple portals, notices and sources. Understanding eligibility,
            finding the right service, completing an application and identifying reliable information can be
            unnecessarily difficult.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {problemCards.map((card) => (
            <div
              key={card.label}
              className="bg-[#f8fbf9] border border-[#d8e5dd] p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:border-[#0d3e2e]/50 transition-colors"
            >
              <div>
                <span className="font-mono text-[12px] text-[#8c6d23] font-bold block mb-3">{card.label}</span>
                <h3 className="font-serif text-[21px] text-[#111814] font-bold mb-3">{card.title}</h3>
                <p className="font-sans text-[15px] text-[#57534e] leading-[24px]">{card.description}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#d8e5dd] flex items-center gap-2 text-[#0d3e2e]">
                <AppIcon name={card.icon} className="text-[20px] text-[#0d3e2e]" />
                <span className="font-mono text-[12px] text-[#57534e]">{card.footer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoreValuesStrip() {
  return (
    <section className="w-full bg-[#f2f8f4] border-b border-[#d8e5dd] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {coreValues.map((v) => (
            <div key={v.label} className="flex flex-col gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center shadow-xs">
                <AppIcon name={v.icon} className="text-[18px]" />
              </div>
              <span className="font-mono text-[12px] text-[#8c6d23] font-bold tracking-wider uppercase">{v.label}</span>
              <p className="font-sans text-[13px] text-[#111814] leading-snug">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose a Module',
      description: 'Find the student service you need.',
      subtext: 'Select from scholarships, safety, certificates, examinations, admissions, or learning support.',
      icon: 'category',
    },
    {
      number: '02',
      title: 'Access Guidance',
      description: 'Explore relevant information, procedures and official resources.',
      subtext: 'Review statutory rules, required documents, eligibility criteria, and step-by-step checklists.',
      icon: 'menu_book',
    },
    {
      number: '03',
      title: 'Take Action',
      description: 'Follow the appropriate official process.',
      subtext: 'Direct links and verified procedures for official government portals and institutional channels.',
      icon: 'task_alt',
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#f2f8f4] py-14 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#0d3e2e] font-bold tracking-wider uppercase">HOW IT WORKS</span>
            <div className="w-8 h-0.5 bg-[#0d3e2e]" />
          </div>
          <h2 className="font-serif text-[28px] sm:text-[38px] leading-[34px] sm:leading-[46px] text-[#111814] mt-2 mb-4 font-bold">
            A clearer way to <span className="italic text-[#0d3e2e]">navigate student services.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#4a4a4a] leading-relaxed">
            A simple three-step journey to find the right student service, access verified guidance, and take official action.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-7 sm:p-8 bg-[#f8fbf9] border border-[#d8e5dd] rounded-2xl flex flex-col justify-between hover:border-[#0d3e2e]/50 hover:shadow-md transition-all relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-[40px] text-[#0d3e2e] font-bold leading-none">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    <AppIcon name={step.icon} className="text-[24px]" />
                  </div>
                </div>
                <h3 className="font-serif text-[22px] text-[#111814] font-bold mb-2">{step.title}</h3>
                <p className="font-sans text-[15px] font-semibold text-[#0d3e2e] mb-2">{step.description}</p>
                <p className="font-sans text-[13px] text-[#57534e] leading-relaxed">{step.subtext}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d8e5dd] flex items-center gap-1.5 text-[#57534e] font-mono text-[11px] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d3e2e]" />
                <span>Step {step.number} of 03</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
