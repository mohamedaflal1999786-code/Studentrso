// components/admissions/CreditAndAcademicMobility.tsx
'use client';

import React from 'react';
import {
  Award,
  ExternalLink,
  BookOpen,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CREDIT_MOBILITY_GUIDES } from '@/lib/admissions-data';

export function CreditAndAcademicMobility() {
  const guide = CREDIT_MOBILITY_GUIDES[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
            NATIONAL ACADEMIC MOBILITY
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-800 font-bold">
            UGC Recognized
          </span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Academic Bank of Credits (ABC) &amp; APAAR Mobility Guide
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a]">
          Understand how academic credits are accumulated, digitally banked, and transferred across universities in India.
        </p>
      </div>

      {/* Core Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guide.coreConcepts.map((concept, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
            <h3 className="font-serif text-base font-bold text-[#8c2f39] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#e0a526]" /> {concept.title}
            </h3>
            <p className="text-xs text-[#7a6a5a] leading-relaxed">{concept.description}</p>
          </div>
        ))}
      </div>

      {/* Acceptance Rules & SWAYAM Notice */}
      <div className="p-6 rounded-3xl bg-white border border-[#efe3cc] space-y-4 text-xs">
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" /> Statutory Credit Acceptance Rules
        </h3>
        <ul className="space-y-2 text-[#2b2118] list-disc list-inside">
          {guide.acceptanceRules.map((rule, ri) => (
            <li key={ri} className="leading-relaxed">{rule}</li>
          ))}
        </ul>

        <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a] flex items-center gap-2">
          <Info className="w-4 h-4 text-[#8c2f39] shrink-0" />
          <span>
            <strong>SWAYAM Credit Parity:</strong> Under UGC Gazette regulations, students can complete up to <strong>40% of their semester credits</strong> via SWAYAM/NPTEL online courses and have them transferred automatically to their university grade card.
          </span>
        </div>
      </div>

      {/* Step-by-Step Credit Transfer Protocol */}
      <div className="p-6 rounded-3xl bg-white border border-[#efe3cc] space-y-4 text-xs">
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#8c2f39] flex items-center gap-2">
          <Layers className="w-5 h-5" /> How to Transfer Academic Credits Between Universities
        </h3>
        <div className="space-y-2">
          {guide.stepByStepTransfer.map((stp, si) => (
            <div key={si} className="p-3 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] text-[#2b2118]">
              {stp}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Official Link */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/50 border border-[#efe3cc] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-sm sm:text-base font-bold text-[#2b2118]">
            Access Official Academic Bank of Credits (ABC) Portal
          </h4>
          <p className="text-xs text-[#7a6a5a]">
            Create your APAAR Student ID or check your digitally accumulated credits.
          </p>
        </div>
        <a
          href={guide.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-2xl bg-[#8c2f39] hover:bg-[#6d1824] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Visit ABC Portal (abc.gov.in)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
