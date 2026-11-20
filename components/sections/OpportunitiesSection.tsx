'use client';

import { opportunities } from '@/lib/data';
import { AppIcon } from '@/components/AppIcon';

export function OpportunitiesSection() {
  return (
    <section id="exam-and-opportunity-hub" className="w-full bg-[#fbf5e9] py-10 lg:py-24 border-t border-b border-[#efe3cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#92400e] font-bold tracking-wider uppercase">OPPORTUNITIES</span>
            <div className="w-8 h-0.5 bg-[#92400e]" />
          </div>
          <h2 className="font-serif text-[26px] sm:text-[36px] leading-[32px] sm:leading-[44px] text-[#2b2118] mt-2 mb-4 font-bold">
            Exam &amp; Opportunity Hub
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#524336] leading-relaxed">
            Direct access to official examination and opportunity portals. Discover eligibility, syllabus, and
            application routes from recognised statutory authorities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['TNPSC', 'UPSC', 'SSC', 'Banking', 'Railway', 'Defence', 'State Examinations', 'Entrance Examinations', 'Government Internships', 'Skill Programmes'].map((cat) => (
            <span key={cat} className="px-3 py-1 rounded bg-[#f6ede0] border border-[#efe3cc] font-mono text-[11px] text-[#2b2118] font-medium">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <a
              key={opp.id}
              href={opp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#fdfbf6] hover:bg-[#f6ede0] border border-[#efe3cc] transition-all flex items-center justify-between group cursor-pointer min-h-[44px]"
            >
              <div>
                <span className="font-sans text-[16px] font-bold text-[#2b2118] block group-hover:text-[#0d3e2e]">
                  {opp.name}
                </span>
                <span className="font-sans text-[12px] text-[#524336]">{opp.fullName}</span>
              </div>
              <AppIcon name="open_in_new" className="text-[#92400e] text-[20px]" />
            </a>
          ))}
        </div>

        <p className="font-sans text-[13px] text-[#524336] italic border-t border-[#efe3cc] pt-4 mt-6">
          Governance Note: Student RSO curates verified pathways; examination conduct, syllabus governance and
          admissions remain strictly with respective statutory authorities.
        </p>
      </div>
    </section>
  );
}
