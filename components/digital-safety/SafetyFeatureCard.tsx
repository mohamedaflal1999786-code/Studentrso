'use client';

import React from 'react';
import {
  ShieldAlert,
  ArrowRight,
  BookOpen,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { SafetyFeature } from '@/lib/digital-safety-data';

interface SafetyFeatureCardProps {
  feature: SafetyFeature;
  onViewDetails: (feature: SafetyFeature) => void;
  onQuickAction?: (feature: SafetyFeature) => void;
}

export function SafetyFeatureCard({
  feature,
  onViewDetails,
  onQuickAction,
}: SafetyFeatureCardProps) {
  const isEmergency = Boolean(feature.emergencyHelpline);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Bar: Badge, Risk Severity & Category */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
              isEmergency
                ? 'bg-rose-100 border border-rose-300 text-rose-800'
                : 'bg-[#8c2f39]/10 border border-[#8c2f39]/20 text-[#8c2f39]'
            }`}
          >
            {feature.badge}
          </span>
          <span className="rounded-full bg-[#fbf5e9] border border-[#d8c7ad] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#554a3f]">
            {feature.category}
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase ${
            feature.riskSeverity === 'Critical'
              ? 'bg-red-50 border border-red-200 text-red-700'
              : feature.riskSeverity === 'High'
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}
        >
          {feature.riskSeverity} Risk
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="flex items-start gap-3 mt-1">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            isEmergency
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-[#fbf5e9] border-[#efe3cc] text-[#8c2f39]'
          }`}
        >
          {isEmergency ? <PhoneCall size={20} /> : <ShieldAlert size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[18px] sm:text-[20px] font-bold leading-snug text-[#2b2118]">
            {feature.title}
          </h3>
          <p className="font-serif text-[13px] italic text-[#8c2f39] line-clamp-1 mt-0.5">
            {feature.subtitle}
          </p>
        </div>
      </div>

      {/* Summary */}
      <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#7a6a5a] line-clamp-3 flex-1">
        {feature.summary}
      </p>

      {/* Authority reference */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fbf5e9] border border-[#efe3cc] text-[#554a3f] font-mono text-[10.5px]">
        <span className="text-[#8c2f39] font-bold">Authority:</span>
        <span className="truncate max-w-[230px]">{feature.authority}</span>
      </div>

      {/* Action Steps Highlights (First 2 steps) */}
      <div className="mt-4 pt-3 border-t border-[#efe3cc] space-y-1.5">
        <span className="font-mono text-[10px] font-bold uppercase text-[#2b2118] tracking-wider block mb-1">
          PROTOCOL HIGHLIGHTS ({feature.actionSteps.length} STEPS):
        </span>
        {feature.actionSteps.slice(0, 2).map((step) => (
          <div key={step.stepNumber} className="flex items-start gap-1.5 font-sans text-[12px] text-[#554a3f]">
            <span className="text-[#8c2f39] font-bold shrink-0 mt-0.5">
              {step.stepNumber}.
            </span>
            <span className="line-clamp-1 font-medium">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-[#efe3cc] flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(feature)}
          className="flex-1 rounded-lg bg-[#8c2f39] px-3.5 py-2 font-sans text-[13px] font-bold text-white transition-colors hover:bg-[#6d1824] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          <BookOpen size={14} />
          <span>View Action Guide</span>
        </button>

        {isEmergency ? (
          <a
            href="tel:1930"
            className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 font-sans text-[13px] font-bold text-rose-800 transition-colors hover:bg-rose-100 cursor-pointer flex items-center justify-center gap-1 shrink-0"
            title="Dial National Cyber Financial Fraud Helpline 1930"
          >
            <PhoneCall size={14} />
            <span>Call 1930</span>
          </a>
        ) : feature.officialPortalUrl ? (
          <a
            href={feature.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-2 font-sans text-[13px] font-semibold text-[#8c2f39] transition-colors hover:bg-[#f6ede0] cursor-pointer flex items-center justify-center gap-1 shrink-0"
            title="Open official portal in new tab"
          >
            <span>Portal</span>
            <ExternalLink size={13} />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onQuickAction && onQuickAction(feature)}
            className="rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-2 font-sans text-[13px] font-semibold text-[#8c2f39] transition-colors hover:bg-[#f6ede0] cursor-pointer flex items-center justify-center gap-1 shrink-0"
          >
            <span>Action</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </article>
  );
}
