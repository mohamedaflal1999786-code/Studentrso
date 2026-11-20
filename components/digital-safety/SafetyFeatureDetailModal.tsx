'use client';

import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { SafetyFeature } from '@/lib/digital-safety-data';

interface SafetyFeatureDetailModalProps {
  feature: SafetyFeature | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyFeatureDetailModal({
  feature,
  isOpen,
  onClose,
}: SafetyFeatureDetailModalProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen || !feature) return null;

  const isEmergency = Boolean(feature.emergencyHelpline);

  function handleCopyStep(stepNumber: number, text: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedStep(stepNumber);
      setTimeout(() => setCopiedStep(null), 2000);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2b2118]/60 p-0 sm:p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
          <span className="rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            {feature.badge}
          </span>
          <span className="rounded-full bg-[#fbf5e9] border border-[#d8c7ad] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#554a3f]">
            {feature.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
              feature.riskSeverity === 'Critical'
                ? 'bg-rose-100 border border-rose-300 text-rose-800'
                : feature.riskSeverity === 'High'
                ? 'bg-amber-100 border border-amber-300 text-amber-800'
                : 'bg-blue-100 border border-blue-300 text-blue-800'
            }`}
          >
            {feature.riskSeverity} Risk Protocol
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-2">
          <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#2b2118] leading-tight">
            {feature.title}
          </h2>
          <p className="font-serif text-[15px] sm:text-[16px] italic text-[#0d3e2e] mt-1">
            {feature.subtitle}
          </p>
        </div>

        {/* Official Authority & Verification Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-[#fbf5e9] p-3 border border-[#efe3cc]">
          <ShieldCheck size={18} className="text-[#0d3e2e] shrink-0" />
          <span className="font-mono text-[11px] font-bold text-[#2b2118]">Official Guidance Authority:</span>
          <span className="font-sans text-[12px] text-[#554a3f]">{feature.authority}</span>
        </div>

        {/* Summary */}
        <div className="mt-5">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
            EXECUTIVE DIRECTIVE
          </h3>
          <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-[#2b2118] bg-white p-4 rounded-xl border border-[#efe3cc]">
            {feature.summary}
          </p>
        </div>

        {/* 6-Step Actionable Protocol */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-[#0d3e2e]" />
              <span>STEP-BY-STEP ACTION PROTOCOL ({feature.actionSteps.length} MANDATORY STEPS)</span>
            </h3>
          </div>

          <div className="space-y-3">
            {feature.actionSteps.map((step) => {
              const isCopied = copiedStep === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  className="rounded-xl border border-[#efe3cc] bg-white p-4 transition hover:border-[#0d3e2e]/40 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0d3e2e] text-white font-mono text-[11px] font-bold">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-sans text-[14px] font-bold text-[#2b2118]">
                        {step.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyStep(
                          step.stepNumber,
                          `Step ${step.stepNumber}: ${step.title} - ${step.instruction}`
                        )
                      }
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] text-[#7a6a5a] hover:bg-[#fbf5e9] hover:text-[#0d3e2e] transition cursor-pointer"
                      title="Copy action step to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check size={12} className="text-emerald-700" />
                          <span className="text-emerald-700 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#554a3f] pl-8">
                    {step.instruction}
                  </p>

                  {step.warningNotice && (
                    <div className="mt-2.5 ml-8 flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-rose-900 font-sans text-[12px]">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5 text-rose-700" />
                      <span>{step.warningNotice}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Threats & Attack Vectors Covered */}
        <div className="mt-6">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-2">
            THREATS &amp; ATTACK VECTORS COVERED
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {feature.threatsCovered.map((threat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-lg bg-[#fdfbf6] border border-[#efe3cc] p-2.5 font-sans text-[12.5px] text-[#554a3f]"
              >
                <span className="text-rose-700 font-bold shrink-0 mt-0.5">•</span>
                <span>{threat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Legal Remedies */}
        <div className="mt-6">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-2 flex items-center gap-1.5">
            <Scale size={14} className="text-[#0d3e2e]" />
            <span>STATUTORY LEGAL PROVISIONS &amp; STUDENT RIGHTS</span>
          </h3>
          <div className="space-y-2 rounded-xl bg-[#fbf5e9] p-3.5 border border-[#efe3cc]">
            {feature.statutoryRemedies.map((remedy, idx) => (
              <div key={idx} className="flex items-start gap-2 font-sans text-[12.5px] text-[#2b2118]">
                <CheckCircle2 size={15} className="text-[#0d3e2e] shrink-0 mt-0.5" />
                <span>{remedy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Student Prevention Tips */}
        <div className="mt-6">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-2 flex items-center gap-1.5">
            <Lightbulb size={14} className="text-[#e0a526]" />
            <span>PRACTICAL PREVENTION RULES</span>
          </h3>
          <div className="space-y-2">
            {feature.practicalTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-lg bg-amber-50/60 border border-amber-200/80 p-2.5 font-sans text-[12.5px] text-amber-950"
              >
                <span className="text-[#e0a526] font-bold shrink-0 mt-0.5">★</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-[#efe3cc] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {isEmergency && (
              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-rose-800 transition shadow-sm"
              >
                <PhoneCall size={15} />
                <span>Call Helpline 1930</span>
              </a>
            )}

            {feature.officialPortalUrl && (
              <a
                href={feature.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0d3e2e] px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#08261c] transition shadow-sm"
              >
                <span>{feature.officialPortalLabel || 'Open Official Portal'}</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] px-4 py-2.5 font-sans text-[13px] font-semibold text-[#554a3f] hover:bg-[#f6ede0] transition cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
