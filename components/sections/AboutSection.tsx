'use client';

import { AppIcon } from '@/components/AppIcon';

export function AboutSection() {
  const pillars = [
    {
      icon: 'account_balance',
      title: 'Direct Official Sources',
      description:
        'All circulars, procedures, and portals link directly to authorized government departments (TN e-District, UGC, AICTE, NTA, Directorate of Technical Education), eliminating misleading third-party agents.',
    },
    {
      icon: 'verified_user',
      title: 'Statutory Safety & Student Rights',
      description:
        'Clear awareness of anti-ragging regulations, internal complaints committees, statutory grievance procedures, cyber-wellness safeguards, and 24x7 emergency helplines.',
    },
    {
      icon: 'school',
      title: 'Complete Educational Continuum',
      description:
        'Equitable guidance tailored for every academic transition — from Class 10 board examinations, diploma courses, and undergraduate single-window admissions to postgraduate research.',
    },
    {
      icon: 'groups',
      title: 'Non-Commercial & Free Public Access',
      description:
        'Zero commission-driven rankings, zero subscription paywalls, and zero monetized user leads. A transparent, student-first digital public infrastructure built for learner welfare.',
    },
  ];

  return (
    <section id="about" className="w-full bg-[#f2f8f4] py-14 lg:py-24 border-t border-b border-[#d8e5dd] scroll-mt-20">
      <div id="student-journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#8c6d23] font-bold tracking-wider uppercase">
              ABOUT STUDENT RSO
            </span>
            <div className="w-8 h-0.5 bg-[#c59b27]" />
          </div>
          <h2 className="font-serif text-[30px] sm:text-[40px] leading-[36px] sm:leading-[48px] text-[#111814] mt-2 mb-4 font-bold">
            Built to empower students with <span className="italic text-[#c59b27]">clarity and confidence.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#4a4a4a] leading-relaxed">
            Student RSO (Rights, Services &amp; Opportunities) is a student-first digital platform designed to help learners across Tamil Nadu and India navigate government schemes, academic continuity, statutory safety mechanisms, and verified opportunities without confusion or commercial barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-[#f8fbf9] p-6 sm:p-7 rounded-2xl border border-[#d8e5dd] flex flex-col justify-between hover:border-[#0d3e2e]/50 hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                  <AppIcon name={p.icon} className="text-[22px]" />
                </div>
                <h3 className="font-serif text-[19px] text-[#111814] font-bold mb-3">{p.title}</h3>
                <p className="font-sans text-[13.5px] text-[#57534e] leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d8e5dd] flex items-center gap-2 font-mono text-[11px] text-[#8c6d23] font-semibold uppercase tracking-wider">
                <AppIcon name="check_circle" className="text-[15px] text-[#c59b27]" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
