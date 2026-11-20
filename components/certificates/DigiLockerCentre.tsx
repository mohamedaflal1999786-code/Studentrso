'use client';

import React from 'react';
import {
  FolderLock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lock,
  Smartphone,
  Info,
} from 'lucide-react';

export function DigiLockerCentre() {
  const steps = [
    {
      step: 1,
      title: 'Visit Official DigiLocker Portal or Install Mobile App',
      desc: 'Go to digilocker.gov.in or install the official DigiLocker app from Google Play Store / Apple App Store. Never use third-party clone apps.',
    },
    {
      step: 2,
      title: 'Create Account with Aadhaar-Linked Mobile Number',
      desc: 'Register using your full name, date of birth (as on Aadhaar), gender, mobile number, and set a secure 6-digit security PIN.',
    },
    {
      step: 3,
      title: 'Complete Aadhaar Authentication via Official UIDAI OTP',
      desc: 'Enter your 12-digit Aadhaar number directly on DigiLocker to receive a one-time OTP from UIDAI on your registered mobile.',
    },
    {
      step: 4,
      title: 'Navigate to "Search Documents" Section',
      desc: 'Inside your DigiLocker dashboard, open the "Search Documents" directory to browse central and state government authorities.',
    },
    {
      step: 5,
      title: 'Select "Tamil Nadu" or Specific State Board / University',
      desc: 'Search for "Directorate of Government Examinations Tamil Nadu" (for 10th/12th marksheets) or "Tamil Nadu e-District / Revenue" (for Community/Income).',
    },
    {
      step: 6,
      title: 'Select Specific Document Type',
      desc: 'Choose "Class X Marksheet", "Class XII Marksheet", "Degree / Diploma Certificate", or "Caste Certificate".',
    },
    {
      step: 7,
      title: 'Enter Mandatory Verification Parameters',
      desc: 'Provide your examination registration/roll number, passing year, or e-Sevai application/certificate number accurately.',
    },
    {
      step: 8,
      title: 'Fetch & Synchronize Authentic Document',
      desc: 'Click "Get Document". DigiLocker queries the issuing department’s secure database and downloads the digitally signed, cryptographically signed PDF.',
    },
    {
      step: 9,
      title: 'Access Under "Issued Documents" Anytime',
      desc: 'The document is permanently saved in your "Issued Documents" tab with official digital signature, QR code, and Rule 9A legal validity.',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e] bg-[#0d3e2e]/10 border border-[#0d3e2e]/20 mb-1.5">
          <FolderLock size={12} /> DIGITAL INDIA INITIATIVE
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          DigiLocker Student Resource Centre
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Official statutory guide for accessing, fetching, and legally presenting tamper-evident digital certificates directly from authorized government repositories.
        </p>
      </div>

      {/* Critical Legal Distinction: Issuer vs Uploaded Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 p-5 sm:p-6 space-y-3 text-emerald-950">
          <div className="flex items-center gap-2 text-emerald-800">
            <ShieldCheck size={20} />
            <h3 className="font-serif text-[16px] font-bold">
              "Issued Documents" — 100% Legally Valid
            </h3>
          </div>
          <p className="font-sans text-[12px] text-emerald-900 leading-relaxed">
            Documents fetched directly through the <strong>"Issued Documents"</strong> section are pulled directly from government servers and carry an official cryptographic digital signature with QR verification.
          </p>
          <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 font-sans text-[11px] text-emerald-900">
            <strong>Statutory Rule 9A (IT Rules 2016):</strong> Issued documents in DigiLocker are treated on par with original physical certificates by all colleges, counseling bodies, and employers.
          </div>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 sm:p-6 space-y-3 text-amber-950">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle size={20} />
            <h3 className="font-serif text-[16px] font-bold">
              "Uploaded / Drive Files" — Not Self-Verifying
            </h3>
          </div>
          <p className="font-sans text-[12px] text-amber-900 leading-relaxed">
            Files manually uploaded by a student into the "DigiLocker Drive" folder (e.g. scanned PDF photos) are treated solely as <strong>unverified digital photocopies</strong>.
          </p>
          <div className="p-3 rounded-xl bg-white/80 border border-amber-200 font-sans text-[11px] text-amber-900">
            <strong>Warning:</strong> Counseling authorities (TNEA, NEET, TNPSC) do NOT accept manually uploaded PDFs as authenticated originals. Always fetch documents from the official issuer!
          </div>
        </div>
      </div>

      {/* 9-Step Guide */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#efe3cc]">
          <div>
            <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
              9 Steps to Fetch Your Authentic Documents
            </h3>
            <p className="font-sans text-[12px] text-[#7a6a5a]">
              Follow this official standard operating procedure
            </p>
          </div>
          <a
            href="https://www.digilocker.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[12px] font-bold flex items-center gap-1.5 transition self-start shadow-2xs"
          >
            Open DigiLocker Portal <ExternalLink size={13} />
          </a>
        </div>

        <div className="space-y-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl border border-[#efe3cc] bg-white shadow-2xs flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 flex items-center justify-center font-bold font-mono text-[12px] shrink-0">
                {item.step}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-[15px] font-bold text-[#2b2118]">{item.title}</h4>
                <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Tamil Nadu Authorities on DigiLocker */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <h3 className="font-serif text-[17px] font-bold text-[#2b2118]">
          Supported Tamil Nadu Issuers on DigiLocker
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              name: 'DGE Tamil Nadu',
              docs: 'Class 10 (SSLC) & Class 12 (HSC) Marksheets (2016 onwards)',
            },
            {
              name: 'DoTE Tamil Nadu',
              docs: 'Diploma Examination Marksheets & Provisional Awards',
            },
            {
              name: 'Tamil Nadu e-District',
              docs: 'Community Certificate, Income Certificate, Nativity Certificate',
            },
            {
              name: 'University of Madras / Anna University',
              docs: 'Undergraduate & Postgraduate Degree / Provisional Marksheets',
            },
            {
              name: 'UIDAI',
              docs: 'Aadhaar Card (Digital issued version)',
            },
            {
              name: 'Income Tax Department',
              docs: 'Permanent Account Number (e-PAN card)',
            },
          ].map((issuer, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[#efe3cc] bg-white shadow-2xs space-y-1 font-sans"
            >
              <strong className="text-[#2b2118] font-bold text-[13px] block">{issuer.name}</strong>
              <p className="text-[#5c4a3a] text-[11px] leading-relaxed">{issuer.docs}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
