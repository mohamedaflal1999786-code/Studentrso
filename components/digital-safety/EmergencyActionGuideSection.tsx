'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import {
  EMERGENCY_PROCEDURES,
  EmergencyProcedure,
} from '@/lib/digital-safety-data';

export function EmergencyActionGuideSection() {
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>(
    EMERGENCY_PROCEDURES[0].id
  );

  const activeProcedure =
    EMERGENCY_PROCEDURES.find((p) => p.id === selectedProcedureId) ||
    EMERGENCY_PROCEDURES[0];

  return (
    <section className="space-y-6">
      {/* 1. High-Impact Emergency Helpline Banner */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-300 px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-rose-900">
              <PhoneCall size={13} /> IMMEDIATE INCIDENT RESPONSE
            </div>
            <h2 className="font-serif text-[24px] sm:text-[30px] font-bold text-rose-950 leading-tight">
              Cyber Financial Fraud? Dial 1930
            </h2>
            <p className="font-sans text-[14px] leading-relaxed text-rose-900">
              The <strong>Golden Hour Window</strong> (first 1–2 hours after fraudulent debit) is critical. Dialing <strong>1930</strong> alerts the national inter-bank freeze network to prevent scammers from cashing out your funds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-700 hover:bg-rose-800 px-5 py-3 font-sans text-[14px] font-bold text-white shadow-md transition cursor-pointer"
            >
              <PhoneCall size={18} />
              <span>Emergency Call: 1930</span>
            </a>

            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-300 px-4 py-3 font-sans text-[13px] font-bold text-rose-900 transition shadow-xs"
            >
              <span>National Portal (cybercrime.gov.in)</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Quick Emergency Hotlines Grid */}
        <div className="mt-6 pt-5 border-t border-rose-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white/80 p-3 border border-rose-200">
            <div className="rounded-lg bg-rose-100 p-2 text-rose-800">
              <PhoneCall size={16} />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-rose-950 block">
                Financial Cyber Fraud
              </span>
              <a href="tel:1930" className="font-mono text-[13px] font-bold text-rose-700 hover:underline">
                1930 (Toll-Free 24x7)
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-white/80 p-3 border border-rose-200">
            <div className="rounded-lg bg-rose-100 p-2 text-rose-800">
              <PhoneCall size={16} />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-rose-950 block">
                Mental Distress / Tele-MANAS
              </span>
              <a href="tel:14416" className="font-mono text-[13px] font-bold text-rose-700 hover:underline">
                14416 (24x7 Counseling)
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-white/80 p-3 border border-rose-200">
            <div className="rounded-lg bg-rose-100 p-2 text-rose-800">
              <PhoneCall size={16} />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-rose-950 block">
                National Anti-Ragging Helpline
              </span>
              <a href="tel:18001805522" className="font-mono text-[13px] font-bold text-rose-700 hover:underline">
                1800-180-5522 (Toll-Free)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Step-by-Step Incident Resolution Guides */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-sm">
        <div className="border-b border-[#efe3cc] pb-5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            STANDARD OPERATING PROCEDURES
          </span>
          <h3 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118] mt-1">
            Emergency Incident Resolution Guides
          </h3>
          <p className="font-sans text-[13.5px] text-[#7a6a5a]">
            Choose an incident scenario below to view exact procedural steps, critical hotlines, and what actions to avoid.
          </p>

          {/* Scenario Selector Tabs */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {EMERGENCY_PROCEDURES.map((proc) => {
              const isSelected = selectedProcedureId === proc.id;
              return (
                <button
                  key={proc.id}
                  type="button"
                  onClick={() => setSelectedProcedureId(proc.id)}
                  className={`rounded-xl px-3.5 py-2 font-sans text-[12.5px] font-semibold transition cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#0d3e2e] text-white shadow-xs'
                      : 'bg-white border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#fbf5e9]'
                  }`}
                >
                  {proc.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Incident Procedure Details */}
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">
                INCIDENT SCENARIO
              </span>
              <h4 className="font-serif text-[20px] font-bold text-[#2b2118]">
                {activeProcedure.title}
              </h4>
            </div>

            <span className="rounded-full bg-rose-100 border border-rose-200 px-3 py-1 font-mono text-[11px] font-bold text-rose-800">
              Urgency: {activeProcedure.urgencyLevel}
            </span>
          </div>

          {/* Primary Action Callout */}
          <div className="rounded-xl bg-[#0d3e2e] text-white p-4">
            <span className="font-mono text-[10.5px] uppercase font-bold text-[#f5cf7b] block mb-1">
              PRIMARY IMMEDIATE ACTION:
            </span>
            <p className="font-sans text-[14px] leading-relaxed font-medium">
              {activeProcedure.primaryAction}
            </p>
          </div>

          {/* Sequential Action Steps */}
          <div>
            <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2b2118] mb-3">
              MANDATORY SEQUENTIAL PROCEDURE:
            </h5>
            <div className="space-y-2.5">
              {activeProcedure.sequentialSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#efe3cc] bg-white p-3.5 font-sans text-[13px] text-[#2b2118]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[11px] font-bold text-[#0d3e2e]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Warnings / What NOT to do */}
          {activeProcedure.avoidActions.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
              <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-rose-700" />
                <span>WHAT TO AVOID (CRITICAL ERRORS):</span>
              </h5>
              <div className="space-y-1.5">
                {activeProcedure.avoidActions.map((avoid, idx) => (
                  <div key={idx} className="flex items-start gap-2 font-sans text-[12.5px] text-rose-950">
                    <XCircle size={14} className="text-rose-700 shrink-0 mt-0.5" />
                    <span>{avoid}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Link */}
          <div className="pt-2 flex justify-end">
            <a
              href={activeProcedure.officialReportingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0d3e2e] px-5 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#08261c] transition shadow-xs"
            >
              <span>Submit Formal Incident Report</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
