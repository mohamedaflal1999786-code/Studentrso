// components/admissions/AdmissionProcedureModal.tsx
'use client';

import React, { useEffect } from 'react';
import {
  X,
  Building,
  GraduationCap,
  ExternalLink,
  ShieldAlert,
  FileCheck2,
  Calendar,
  Layers,
  CheckCircle2,
  Phone,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { AdmissionPathway } from '@/lib/admissions-data';

interface AdmissionProcedureModalProps {
  pathway: AdmissionPathway | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackApplication?: (pathway: AdmissionPathway) => void;
}

export function AdmissionProcedureModal({
  pathway,
  isOpen,
  onClose,
  onTrackApplication,
}: AdmissionProcedureModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !pathway) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
      <div className="absolute inset-0 bg-[#2b2118]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-[#efe3cc] bg-[#fdfbf6] shadow-2xl overflow-hidden animate-slide-up">
        {/* Top Header Strip */}
        <div className="h-1.5 bg-gradient-to-r from-[#0d3e2e] via-[#b8543e] to-[#e0a526] shrink-0" />

        <div className="p-5 sm:p-6 border-b border-[#efe3cc] bg-gradient-to-r from-[#fdfbf6] to-[#fbf5e9] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[11px] text-[#0d3e2e] font-bold">
                {pathway.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[11px] text-[#2b2118] font-bold">
                {pathway.selectionMode}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Statutory Portal
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118] leading-tight">
              {pathway.title}
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium text-[#7a6a5a]">
              <Building className="w-3.5 h-3.5 text-[#0d3e2e]" />
              <span>{pathway.authority}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#7a6a5a] hover:bg-[#efe3cc]/50 hover:text-[#0d3e2e] transition cursor-pointer"
            aria-label="Close procedure modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-xs sm:text-sm text-[#2b2118] leading-relaxed">
          {/* Overview Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] space-y-2">
            <h3 className="font-serif text-base font-bold text-[#0d3e2e] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#0d3e2e]" /> Purpose &amp; Overview
            </h3>
            <p className="text-[#7a6a5a] leading-relaxed">{pathway.description}</p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                Eligible Target Group
              </span>
              <p className="font-bold text-[#2b2118] text-xs leading-snug">{pathway.targetStudents}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                Application Period
              </span>
              <p className="font-bold text-[#2b2118] text-xs leading-snug">{pathway.applicationPeriod}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                Application Fee
              </span>
              <p className="font-bold text-[#0d3e2e] text-xs leading-snug">{pathway.applicationFee}</p>
            </div>
          </div>

          {/* Eligibility & Subject Requirements */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0d3e2e] flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Eligibility &amp; Subject Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] space-y-1.5">
                <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526]">
                  Academic Eligibility
                </span>
                <p className="text-xs text-[#2b2118]">{pathway.eligibility}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] space-y-1.5">
                <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526]">
                  Compulsory Subjects &amp; Marks
                </span>
                <p className="text-xs text-[#2b2118]">{pathway.subjectRequirements}</p>
              </div>
            </div>
            {pathway.entranceRequired && (
              <div className="p-3 rounded-xl bg-[#f6ede0] border border-[#d8c7ad] text-xs font-medium text-[#0d3e2e] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span><strong>Entrance Examination Requirement:</strong> {pathway.entranceRequired} (Check Module 04 for syllabus and prep guidelines).</span>
              </div>
            )}
          </div>

          {/* Step-by-Step Procedure */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0d3e2e] flex items-center gap-2">
              <Layers className="w-4 h-4" /> Step-by-Step Application Procedure
            </h3>
            <div className="space-y-2">
              {pathway.steps.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-[#efe3cc] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-[#2b2118] leading-relaxed pt-0.5">{st}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Counselling & Seat Allocation */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0d3e2e] flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Counselling &amp; Seat Allocation Mechanism
            </h3>
            <div className="p-4 rounded-2xl bg-white border border-[#efe3cc] space-y-2">
              <ul className="space-y-1.5 list-disc list-inside text-xs text-[#2b2118]">
                {pathway.counsellingProcess.map((cp, idx) => (
                  <li key={idx} className="leading-relaxed">{cp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* What to do after Provisional Allotment */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Action Required After Receiving Provisional Allotment
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {pathway.allotmentNextSteps.map((ans, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{ans}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mandatory Documents Checklist */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0d3e2e] flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" /> Required Document Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pathway.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#efe3cc] flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5e8b7e] shrink-0" />
                  <span className="font-medium text-[#2b2118]">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings & Caution Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Important Warnings &amp; Anti-Agent Advisory</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-amber-900">
              {pathway.importantWarnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-[#efe3cc] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#7a6a5a]">
            <Phone className="w-3.5 h-3.5 text-[#0d3e2e]" />
            <span><strong>Authority Helpline:</strong> {pathway.helpline}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onTrackApplication && (
              <button
                type="button"
                onClick={() => {
                  onTrackApplication(pathway);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] hover:bg-[#f6ede0] text-[#0d3e2e] font-bold text-xs transition cursor-pointer"
              >
                + Track This Application
              </button>
            )}
            <a
              href={pathway.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Open Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
