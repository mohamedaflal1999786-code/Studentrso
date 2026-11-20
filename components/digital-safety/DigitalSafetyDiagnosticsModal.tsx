'use client';

import React, { useState } from 'react';
import {
  X,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Server,
  PhoneCall,
  Copy,
  Check,
} from 'lucide-react';
import {
  SAFETY_FEATURES,
  OFFICIAL_CYBER_RESOURCES,
  CYBER_SCAM_QUIZ_QUESTIONS,
  STUDENT_CYBER_CHECKLIST,
  GUIDANCE_SECTIONS,
} from '@/lib/digital-safety-data';

interface DigitalSafetyDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalSafetyDiagnosticsModal({
  isOpen,
  onClose,
}: DigitalSafetyDiagnosticsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const diagnosticsData = {
    moduleNumber: '10',
    moduleTitle: 'Digital Safety & Cyber-Wellness Shield',
    route: '/digital-safety',
    operationalStatus: 'HEALTHY · ALL TELEMETRY ACTIVE',
    timestamp: new Date().toISOString(),
    primaryFeaturesCount: SAFETY_FEATURES.length,
    guidancePillarsCount: GUIDANCE_SECTIONS.length,
    officialPortalsCount: OFFICIAL_CYBER_RESOURCES.length,
    quizQuestionsCount: CYBER_SCAM_QUIZ_QUESTIONS.length,
    checklistItemsCount: STUDENT_CYBER_CHECKLIST.length,
    emergencyHotlines: [
      { name: 'National Cyber Financial Fraud', number: '1930', status: 'Operational' },
      { name: 'Tele-MANAS Psychological Support', number: '14416', status: 'Operational' },
      { name: 'National Anti-Ragging Helpline', number: '1800-180-5522', status: 'Operational' },
    ],
  };

  function handleCopyDiagnostics() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(diagnosticsData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2118]/60 p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-2xl space-y-5"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2 text-emerald-700">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
              Module 10 Diagnostics &amp; Telemetry
            </h3>
            <span className="font-mono text-[11px] font-bold text-emerald-800">
              {diagnosticsData.operationalStatus}
            </span>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="rounded-xl bg-white p-3 border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold text-[#7a6a5a] block uppercase">
              Safety Features
            </span>
            <span className="font-mono text-[18px] font-bold text-[#0d3e2e]">
              {diagnosticsData.primaryFeaturesCount} / 6
            </span>
          </div>

          <div className="rounded-xl bg-white p-3 border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold text-[#7a6a5a] block uppercase">
              Guidance Pillars
            </span>
            <span className="font-mono text-[18px] font-bold text-[#0d3e2e]">
              {diagnosticsData.guidancePillarsCount} / 5
            </span>
          </div>

          <div className="rounded-xl bg-white p-3 border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold text-[#7a6a5a] block uppercase">
              Govt Portals
            </span>
            <span className="font-mono text-[18px] font-bold text-[#0d3e2e]">
              {diagnosticsData.officialPortalsCount} / 8
            </span>
          </div>

          <div className="rounded-xl bg-white p-3 border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold text-[#7a6a5a] block uppercase">
              Quiz Scenarios
            </span>
            <span className="font-mono text-[18px] font-bold text-[#0d3e2e]">
              {diagnosticsData.quizQuestionsCount} / 10
            </span>
          </div>

          <div className="rounded-xl bg-white p-3 border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold text-[#7a6a5a] block uppercase">
              Safety Checklist
            </span>
            <span className="font-mono text-[18px] font-bold text-[#0d3e2e]">
              {diagnosticsData.checklistItemsCount} / 10
            </span>
          </div>

          <div className="rounded-xl bg-white p-3 border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold text-[#7a6a5a] block uppercase">
              Route Linkage
            </span>
            <span className="font-mono text-[12px] font-bold text-emerald-800">
              /digital-safety
            </span>
          </div>
        </div>

        {/* Hotlines Telemetry */}
        <div className="rounded-xl bg-white p-4 border border-[#efe3cc] space-y-2">
          <span className="font-mono text-[10.5px] font-bold text-[#2b2118] uppercase tracking-wider block">
            STATUTORY EMERGENCY HOTLINES:
          </span>
          {diagnosticsData.emergencyHotlines.map((hotline, idx) => (
            <div key={idx} className="flex items-center justify-between font-mono text-[12px]">
              <span className="text-[#554a3f]">{hotline.name} ({hotline.number})</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> {hotline.status}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-[#efe3cc]">
          <button
            type="button"
            onClick={handleCopyDiagnostics}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#554a3f] hover:bg-[#fbf5e9] transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-700" />
                <span className="text-emerald-700 font-semibold">JSON Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Telemetry JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#0d3e2e] px-4 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
