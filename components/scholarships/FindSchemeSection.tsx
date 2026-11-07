'use client';

import React from 'react';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  Compass,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface FindSchemeSectionProps {
  onCheckLocalEligibility?: () => void;
}

export function FindSchemeSection({ onCheckLocalEligibility }: FindSchemeSectionProps) {
  const schemeCategories = [
    {
      title: 'Tamil Nadu State Welfare & Higher Education',
      desc: 'Pudhumai Penn, Tamil Pudhalvan, First Graduate, Post-Matric & BC/MBC welfare grants.',
      count: '30+ State Schemes',
      icon: Landmark,
    },
    {
      title: 'Central Government National Scholarships (NSP)',
      desc: 'Ministry of Social Justice, Tribal Affairs, Minority Affairs, and Higher Education.',
      count: '50+ Central Schemes',
      icon: ShieldCheck,
    },
    {
      title: 'Girl Child & Women Empowerment Aid',
      desc: 'Dedicated female student stipends, single girl child fellowships & STEM support.',
      count: 'Direct Bank Transfer',
      icon: HeartHandshake,
    },
    {
      title: 'Technical & Professional Education (AICTE/UGC)',
      desc: 'Pragati, Saksham, Swanath, Ishan Uday & national postgraduate GATE/GPAT stipends.',
      count: 'National Statutory',
      icon: GraduationCap,
    },
  ];

  return (
    <section className="my-8 rounded-2xl border-2 border-[#cfa052]/40 bg-gradient-to-br from-[#fdfbf6] via-[#fbf5e9] to-[#f4ebe1] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#efe3cc]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8c2f39]/20 bg-[#8c2f39]/10 px-3.5 py-1 text-[11px] font-bold text-[#8c2f39]">
            <Sparkles size={14} className="text-[#cfa052]" />
            NATIONAL SINGLE-WINDOW DISCOVERY ENGINE
          </div>

          <h2 className="font-serif text-[24px] sm:text-[30px] font-bold text-[#2b2118] leading-tight">
            Find Your Scheme & Scholarship
          </h2>

          <p className="font-sans text-[14px] text-[#5c4a3a] leading-relaxed">
            Discover all Central and Tamil Nadu state government educational scholarships, welfare entitlements, and fee waivers in one place through the official Government of India <strong>myScheme</strong> portal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          <a
            href="https://www.myscheme.gov.in/find-scheme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8c2f39] text-white font-sans text-[13px] font-bold hover:bg-[#72262e] transition shadow-md group"
          >
            <span>Open Official Scheme Finder</span>
            <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {onCheckLocalEligibility && (
            <button
              type="button"
              onClick={onCheckLocalEligibility}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] font-sans text-[13px] font-bold hover:bg-[#f6ede0] transition cursor-pointer"
            >
              <Compass size={16} className="text-[#8c2f39]" />
              <span>TN Smart Checker</span>
            </button>
          )}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {schemeCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/80 border border-[#efe3cc] hover:border-[#8c2f39]/40 hover:bg-white transition space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h3 className="font-serif text-[15px] font-bold text-[#2b2118] leading-snug">
                  {cat.title}
                </h3>
                <p className="font-sans text-[12px] text-[#7a6a5a] leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono font-semibold text-emerald-800 flex items-center gap-1 border-t border-[#efe3cc]/60">
                <CheckCircle2 size={12} /> {cat.count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Safe Discovery Footer */}
      <div className="mt-6 pt-4 border-t border-[#efe3cc] flex flex-wrap items-center justify-between gap-3 text-xs text-[#7a6a5a]">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-700" />
          <span>
            Official Government of India portal (<strong>myscheme.gov.in</strong>) · Zero intermediary commission · Direct Beneficiary Transfer (DBT)
          </span>
        </div>
        <a
          href="https://www.myscheme.gov.in/find-scheme"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8c2f39] font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>Find by Age, Category & Qualification</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </section>
  );
}
