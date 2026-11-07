'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from 'lucide-react';
import { CERTIFICATE_FAQS } from '@/lib/certificates-data';

export function CertificateFaqsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 border border-[#8c2f39]/20 mb-1.5">
          <HelpCircle size={12} /> STATUTORY CLARIFICATIONS &amp; GUIDANCE
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Frequently Asked Questions
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Official answers to frequent questions regarding certificate validity, central vs state reservation formats, DigiLocker legal rights, and fraud prevention.
        </p>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {CERTIFICATE_FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#efe3cc] bg-white overflow-hidden shadow-2xs transition"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#fbf5e9] transition"
              >
                <span className="font-serif text-[15px] font-bold text-[#2b2118] flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-[#8c2f39] shrink-0" />
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp size={16} className="text-[#7a6a5a] shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-[#7a6a5a] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 font-sans text-[13px] text-[#5c4a3a] leading-relaxed border-t border-[#efe3cc] bg-[#fdfbf6]">
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
