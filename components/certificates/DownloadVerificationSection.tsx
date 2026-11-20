'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  QrCode,
  Download,
  CheckCircle2,
  AlertTriangle,
  Globe,
  FileCheck,
} from 'lucide-react';

export function DownloadVerificationSection() {
  const [certNumber, setCertNumber] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e] bg-[#0d3e2e]/10 border border-[#0d3e2e]/20 mb-1.5">
          <ShieldCheck size={12} /> AUTHENTICITY &amp; ANTI-FRAUD CENTER
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Download &amp; Verification Services
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          How to verify digital signatures, download approved e-Sevai PDFs, authenticate QR barcodes, and attest educational credentials through e-Sanad for foreign universities.
        </p>
      </div>

      {/* Online Verification Box */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
            Official Tamil Nadu e-District Certificate Verification Portal
          </h3>
          <p className="font-sans text-[12px] text-[#7a6a5a] mt-1">
            Any government authority, employer, or college can verify the authenticity of an issued Tamil Nadu revenue certificate by entering the certificate number.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Enter Certificate Number (e.g., TN-7202610123456)..."
            value={certNumber}
            onChange={(e) => setCertNumber(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-[#efe3cc] rounded-xl font-sans text-[12px] text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-1 focus:ring-[#0d3e2e] focus:border-[#0d3e2e]"
          />

          <a
            href="https://edistricts.tn.gov.in/revenue/verifyCertificate.html"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[12px] font-bold flex items-center justify-center gap-2 transition shrink-0 shadow-xs"
          >
            Verify on e-District Portal <ExternalLink size={13} />
          </a>
        </div>

        <p className="font-sans text-[11px] text-[#7a6a5a] flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-700" />
          Directly checks the official Revenue Department cryptographic ledger. No third-party tampering possible.
        </p>
      </div>

      {/* 3 Core Verification Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* QR Code Verification */}
        <div className="rounded-2xl border border-[#efe3cc] bg-white p-5 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 flex items-center justify-center font-bold">
            <QrCode size={20} />
          </div>
          <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">1. Instant QR Code Scan</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Every e-Sevai certificate contains a 2D QR Code. Scan it using any smartphone camera or Tamil Nadu e-District app to view the applicant’s name, caste, income, and Tahsildar digital signature instant confirmation.
          </p>
        </div>

        {/* e-Sanad Apostille */}
        <div className="rounded-2xl border border-[#efe3cc] bg-white p-5 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 flex items-center justify-center font-bold">
            <Globe size={20} />
          </div>
          <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">2. e-Sanad Online Apostille</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Planning higher education abroad? Ministry of External Affairs (MEA) provides contactless online verification and apostille attestation for Indian academic degrees at <a href="https://esanad.nic.in" target="_blank" rel="noopener noreferrer" className="text-[#0d3e2e] underline font-semibold">esanad.nic.in</a>.
          </p>
        </div>

        {/* Download Approved PDF */}
        <div className="rounded-2xl border border-[#efe3cc] bg-white p-5 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 flex items-center justify-center font-bold">
            <Download size={20} />
          </div>
          <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">3. Download Approved PDF</h4>
          <p className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed">
            Once approved via SMS notification, log into <a href="https://www.tnesevai.tn.gov.in/Citizen/" target="_blank" rel="noopener noreferrer" className="text-[#0d3e2e] underline font-semibold">tnesevai.tn.gov.in/Citizen/</a>, open "Check Status / Download", and print your digitally signed certificate on A4 paper.
          </p>
        </div>
      </div>
    </div>
  );
}
