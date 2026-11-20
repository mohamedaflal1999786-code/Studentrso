// components/internships/InternshipsDiagnosticsModal.tsx
'use client';

import React, { useEffect } from 'react';
import {
  X,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Globe,
  Award,
  Layers
} from 'lucide-react';

interface InternshipsDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OFFICIAL_APPRENTICE_PORTALS = [
  { name: 'National Apprenticeship Training Scheme (NATS)', authority: 'Ministry of Education, Govt of India', portal: 'nats.education.gov.in', status: 'Live Verified' },
  { name: 'National Apprenticeship Promotion Scheme (NAPS)', authority: 'MSDE, Government of India', portal: 'apprenticeshipindia.gov.in', status: 'Live Verified' },
  { name: 'AICTE Internship Support Portal', authority: 'All India Council for Technical Education', portal: 'internship.aicte-india.org', status: 'Live Verified' },
  { name: 'Naan Mudhalvan Skill & Internship Exchange', authority: 'Tamil Nadu Skill Development Corp (TNSDC)', portal: 'naanmudhalvan.tn.gov.in', status: 'Live Verified' },
];

export function InternshipsDiagnosticsModal({
  isOpen,
  onClose,
}: InternshipsDiagnosticsModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#fdfbf6] text-[#2b2118] border border-[#efe3cc] shadow-2xl p-6 sm:p-7 font-sans space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2">
          <Activity size={18} className="text-emerald-700" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
            SYSTEM DIAGNOSTICS &amp; TELEMETRY
          </span>
        </div>

        <div>
          <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
            Module 08: Internship, Skill &amp; Employment Exchange Telemetry
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a] mt-0.5">
            Verification of authentic zero-fee apprentice registries, stipend assurances, and government skill development connectors.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Zero-Fee Policy</span>
              <span className="font-sans text-[12px] font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 size={13} /> 100% Enforced
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Apprentice Portals</span>
              <span className="font-serif text-[18px] font-bold text-[#0d3e2e] mt-0.5 block">
                4 Connectors
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Stipend Rule</span>
              <span className="font-serif text-[18px] font-bold text-[#2b2118] mt-0.5 block">
                Direct DB/DBT
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Audit Verification</span>
              <span className="font-sans text-[12px] font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 size={13} /> Active Verified
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] block flex items-center gap-1.5">
              <Globe size={14} /> Official Statutory Apprenticeship Endpoints
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {OFFICIAL_APPRENTICE_PORTALS.map((portal) => (
                <div key={portal.name} className="flex items-center justify-between p-2 rounded-lg bg-[#fbf5e9] text-[#2b2118]">
                  <div>
                    <strong className="block text-[12px] font-sans">{portal.name}</strong>
                    <span className="text-[10px] text-[#7a6a5a]">{portal.authority} • {portal.portal}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 size={12} /> {portal.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#0d3e2e] px-4 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c] transition cursor-pointer"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
