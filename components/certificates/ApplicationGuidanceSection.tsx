'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  Building,
  FileText,
  AlertCircle,
  Phone,
  ArrowRight,
} from 'lucide-react';

export function ApplicationGuidanceSection() {
  const [activeWorkflow, setActiveWorkflow] = useState<'esevai_online' | 'kendra_offline' | 'rejected_escalation'>('esevai_online');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 border border-[#8c2f39]/20 mb-1.5">
          <HelpCircle size={12} /> END-TO-END PROCEDURAL MANUAL
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Application Guidance &amp; Workflows
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Standard operating procedures for applying through Tamil Nadu e-Sevai citizen portal, visiting an authorized physical e-Sevai centre, or escalating delayed applications.
        </p>
      </div>

      {/* Workflow Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#efe3cc] pb-2">
        <button
          onClick={() => setActiveWorkflow('esevai_online')}
          className={`px-4 py-2 rounded-xl font-sans text-[12px] sm:text-[13px] font-semibold transition ${
            activeWorkflow === 'esevai_online'
              ? 'bg-[#8c2f39] text-white shadow-xs'
              : 'bg-white border border-[#efe3cc] text-[#5c4a3a] hover:bg-[#fbf5e9]'
          }`}
        >
          1. Apply Online via Citizen e-Sevai (From Home)
        </button>
        <button
          onClick={() => setActiveWorkflow('kendra_offline')}
          className={`px-4 py-2 rounded-xl font-sans text-[12px] sm:text-[13px] font-semibold transition ${
            activeWorkflow === 'kendra_offline'
              ? 'bg-[#8c2f39] text-white shadow-xs'
              : 'bg-white border border-[#efe3cc] text-[#5c4a3a] hover:bg-[#fbf5e9]'
          }`}
        >
          2. Apply via Physical e-Sevai Centre / Taluk
        </button>
        <button
          onClick={() => setActiveWorkflow('rejected_escalation')}
          className={`px-4 py-2 rounded-xl font-sans text-[12px] sm:text-[13px] font-semibold transition ${
            activeWorkflow === 'rejected_escalation'
              ? 'bg-[#8c2f39] text-white shadow-xs'
              : 'bg-white border border-[#efe3cc] text-[#5c4a3a] hover:bg-[#fbf5e9]'
          }`}
        >
          3. Handling Delays, Rejections &amp; Inquiries
        </button>
      </div>

      {/* Online Citizen Workflow */}
      {activeWorkflow === 'esevai_online' && (
        <div className="space-y-5 animate-fade-in">
          <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-sans text-[12px] text-[#5c4a3a]">
              <strong className="text-[#2b2118] font-bold block mb-0.5">Official Citizen Portal:</strong>
              Apply directly without agent commissions at <code className="text-[#8c2f39] bg-[#fbf5e9] px-1 py-0.5 rounded font-mono">tnesevai.tn.gov.in/Citizen/</code>. Official fee is just ₹60 per certificate.
            </div>
            <a
              href="https://www.tnesevai.tn.gov.in/Citizen/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold flex items-center gap-1.5 transition shrink-0 shadow-2xs"
            >
              Open Citizen Portal <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: 'Step 1: Citizen Registration',
                text: 'Register a citizen account using your mobile number and email. Complete mobile OTP verification to activate your login ID.',
              },
              {
                step: 'Step 2: CAN (Citizen Access Number) Registration',
                text: 'If you do not have a CAN number, register your CAN by providing Aadhaar details, applicant name, father’s name, and residential address in Tamil Nadu.',
              },
              {
                step: 'Step 3: Select Department & Service',
                text: 'Select "Revenue Department", then pick the required certificate (e.g., REV-101 Community, REV-102 Nativity, REV-103 Income, or REV-104 First Graduate).',
              },
              {
                step: 'Step 4: Fill Online Application Form',
                text: 'The form auto-fills CAN details. Carefully enter family details, education level, annual income, or caste particulars as per statutory documents.',
              },
              {
                step: 'Step 5: Upload Scanned Enclosures',
                text: 'Upload scanned copies of mandatory documents (Applicant photo, Aadhaar card, parents certificates, ration card/smart card, school TC) in PDF/JPEG format (usually < 200 KB).',
              },
              {
                step: 'Step 6: Pay Prescribed Fee & Save Acknowledgement',
                text: 'Pay ₹60 via UPI, Net Banking, or Debit Card. Download the Application Acknowledgement containing your unique Application Number (e.g. TN-72026...).',
              },
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-1">
                <span className="font-mono text-[10px] font-bold text-[#8c2f39] uppercase tracking-wider block">
                  {s.step}
                </span>
                <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offline Kendra Workflow */}
      {activeWorkflow === 'kendra_offline' && (
        <div className="space-y-5 animate-fade-in">
          <div className="rounded-2xl border border-[#efe3cc] bg-[#f8f1e3] p-4 font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            <strong className="text-[#2b2118] font-bold block mb-1">
              Visiting a Physical e-Sevai Centre / TNeGA Operator:
            </strong>
            Government-run e-Sevai centres operate in all Taluk offices, Collectorates, Municipal offices, and Primary Agricultural Co-operative Credit Societies (PACCS) across Tamil Nadu.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'What to Carry',
                items: [
                  'Original Aadhaar Card and 1 photocopy',
                  'Recent passport size color photograph',
                  'Smart Ration Card / Family Card',
                  'Parent’s Community / School Certificate (for community applications)',
                  'Salary slip / Form 16 / self-declaration (for income applications)',
                  'Exact government fee (₹60 in cash or via UPI)',
                ],
              },
              {
                title: 'Process at the Counter',
                items: [
                  'Request operator for the specific service by e-Sevai Code (e.g. REV-101)',
                  'Operator scans original documents onto the camera scanner',
                  'Cross-check applicant name and spelling on operator’s screen BEFORE final submit',
                  'Operator prints official receipt with barcode and application reference number',
                  'Keep the printed receipt safe for tracking and delivery',
                ],
              },
            ].map((col, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-3">
                <h3 className="font-serif text-[16px] font-bold text-[#2b2118]">{col.title}</h3>
                <ul className="space-y-2 font-sans text-[12px] text-[#5c4a3a]">
                  {col.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-700 mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejections & Escalation */}
      {activeWorkflow === 'rejected_escalation' && (
        <div className="space-y-5 animate-fade-in">
          <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 font-sans text-[12px] text-amber-950 leading-relaxed">
            <strong className="font-serif text-[14px] font-bold block mb-1">
              Statutory Rights under Tamil Nadu Right to Service:
            </strong>
            Revenue certificates have a statutory target timeline of 7 to 15 working days. If an application is rejected or unnecessarily delayed by the Village Administrative Officer (VAO) or Revenue Inspector (RI), you are entitled to official reasons and an appeal.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-1.5">
              <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">
                1. Inspect Rejection Remarks
              </h4>
              <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
                Log into e-Districts status tracker. Click the application number to read the VAO / RI / Tahsildar remark. Common reasons: blurry document scan, missing parent community certificate, or mismatched address.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-1.5">
              <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">
                2. Meet Revenue Officials
              </h4>
              <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
                Visit your designated Taluk Office on Tuesday or Friday with original documents. Meet the Zonal Deputy Tahsildar with your application number for in-person rectification.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-1.5">
              <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">
                3. CM Helpline Escalation
              </h4>
              <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
                If the delay exceeds 30 days without lawful reason, dial <strong>1100</strong> (Mukhya Mantri / CM Helpline Tamil Nadu) or submit a grievance at <a href="https://cmhelpline.tnega.org" target="_blank" rel="noopener noreferrer" className="text-[#8c2f39] underline font-semibold">cmhelpline.tnega.org</a> citing your e-Sevai reference number.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
