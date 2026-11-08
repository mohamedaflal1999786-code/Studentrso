// components/admissions/AdmissionsDiagnosticsModal.tsx
'use client';

import React, { useEffect } from 'react';
import {
  X,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Database,
  Building,
  GraduationCap
} from 'lucide-react';

interface AdmissionsDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMISSION_CONNECTORS = [
  { name: 'TNEA Engineering Single-Window', authority: 'Directorate of Technical Education (DOTE)', status: 'Active Verified', portal: 'tneaonline.org' },
  { name: 'TNGASA Arts & Science Admissions', authority: 'Directorate of Collegiate Education (DCE)', status: 'Active Verified', portal: 'tngasa.in' },
  { name: 'DOTE Polytechnic Lateral Entry', authority: 'Government of Tamil Nadu', status: 'Active Verified', portal: 'tndte.gov.in' },
  { name: 'Tamil Nadu Medical Selection', authority: 'Directorate of Medical Education (DME)', status: 'Active Verified', portal: 'tnmedicalselection.net' },
  { name: 'Anna University Autonomous Admissions', authority: 'Anna University, Chennai', status: 'Active Verified', portal: 'annauniv.edu' },
];

export function AdmissionsDiagnosticsModal({
  isOpen,
  onClose,
}: AdmissionsDiagnosticsModalProps) {
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
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#8c2f39] cursor-pointer"
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
            Module 06: Admissions &amp; Academic Continuity Telemetry
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a] mt-0.5">
            Verification of Tamil Nadu single-window counselling portals, college transfer frameworks, and attendance condonation rules.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Connectors</span>
              <span className="font-serif text-[18px] font-bold text-[#8c2f39] mt-0.5 block">5 Portals</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">7.5% Quota Engine</span>
              <span className="font-sans text-[12px] font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 size={13} /> Active
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Transfer Rules</span>
              <span className="font-serif text-[18px] font-bold text-[#2b2118] mt-0.5 block">DOTE/AU</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Verification</span>
              <span className="font-sans text-[12px] font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 size={13} /> 100% Direct
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block flex items-center gap-1.5">
              <Globe size={14} /> Official Tamil Nadu Single-Window Portals
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {ADMISSION_CONNECTORS.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-[#fbf5e9] text-[#2b2118]">
                  <div>
                    <strong className="block text-[12px] font-sans">{c.name}</strong>
                    <span className="text-[10px] text-[#7a6a5a]">{c.authority} • {c.portal}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 size={12} /> {c.status}
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
            className="rounded-lg bg-[#8c2f39] px-4 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#6d1824] transition cursor-pointer"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
