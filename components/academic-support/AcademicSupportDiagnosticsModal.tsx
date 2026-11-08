// components/academic-support/AcademicSupportDiagnosticsModal.tsx
'use client';

import React, { useEffect } from 'react';
import {
  X,
  Activity,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Layers,
  Globe
} from 'lucide-react';
import { ACADEMIC_DIFFICULTIES } from '@/lib/academic-data';

interface AcademicSupportDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AcademicSupportDiagnosticsModal({
  isOpen,
  onClose,
}: AcademicSupportDiagnosticsModalProps) {
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
            Module 07: Academic Support &amp; Learning Center Telemetry
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a] mt-0.5">
            Real-time status of academic difficulty categories, open educational resource connectors, and student study modules.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Difficulty Hubs</span>
              <span className="font-serif text-[18px] font-bold text-[#8c2f39] mt-0.5 block">
                {ACADEMIC_DIFFICULTIES.length} Categories
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Education Levels</span>
              <span className="font-serif text-[18px] font-bold text-[#2b2118] mt-0.5 block">
                School to PhD
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Free Repositories</span>
              <span className="font-serif text-[18px] font-bold text-[#8c2f39] mt-0.5 block">
                NPTEL / SWAYAM
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#efe3cc]">
              <span className="font-mono text-[10px] text-[#7a6a5a] uppercase block">Curriculum Status</span>
              <span className="font-sans text-[12px] font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 size={13} /> Active Verified
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block flex items-center gap-1.5">
              <Layers size={14} /> Academic Support Tracks
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#fbf5e9]">
                <strong className="block text-[#2b2118]">1. School Education (10th–12th)</strong>
                <span className="text-[#7a6a5a] text-[11px]">Stream selection, board exam preparation, state syllabus</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fbf5e9]">
                <strong className="block text-[#2b2118]">2. Diploma &amp; Polytechnic</strong>
                <span className="text-[#7a6a5a] text-[11px]">DOTE Tamil Nadu curricula &amp; lateral entry transition</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fbf5e9]">
                <strong className="block text-[#2b2118]">3. Undergraduate &amp; Postgraduate</strong>
                <span className="text-[#7a6a5a] text-[11px]">Semester planning, backlog strategy, laboratory records</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fbf5e9]">
                <strong className="block text-[#2b2118]">4. Doctoral &amp; Research (PhD)</strong>
                <span className="text-[#7a6a5a] text-[11px]">UGC 2022/2026 regulations, thesis guidelines &amp; JRF</span>
              </div>
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
