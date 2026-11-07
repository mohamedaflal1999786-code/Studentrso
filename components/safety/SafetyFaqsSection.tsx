'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { SAFETY_FAQS } from '@/lib/safety-data';

export function SafetyFaqsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
          <HelpCircle size={15} /> LEGAL & PROCEDURAL CLARITY
        </div>
        <h3 className="font-serif text-[24px] font-bold text-[#2b2118]">
          Frequently Asked Questions on Student Rights &amp; Grievance Redressal
        </h3>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Verified statutory guidelines on anonymity, police FIR thresholds, certificate rights, and official committee jurisdictions.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {SAFETY_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#efe3cc] bg-white transition-all overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-[17px] font-bold text-[#2b2118] hover:text-[#8c2f39] transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#7a6a5a] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#8c2f39]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-[13px] font-sans text-[#554a3f] leading-relaxed border-t border-[#efe3cc]/60 animate-in fade-in-50 duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
