'use client';

import React from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Search,
  Compass,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Building,
  AlertCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  FolderLock,
  Layers,
  Activity,
} from 'lucide-react';
import { CERTIFICATES_CATALOGUE, DocumentItem } from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface CertificateOverviewDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onOpenDocModal: (doc: DocumentItem) => void;
  onOpenDiagnostics: () => void;
}

export function CertificateOverviewDashboard({
  onNavigateTab,
  onOpenDocModal,
  onOpenDiagnostics,
}: CertificateOverviewDashboardProps) {
  const topServices = CERTIFICATES_CATALOGUE.slice(0, 6);

  const categories = [
    {
      id: 'govt',
      name: 'Tamil Nadu Revenue & Govt',
      desc: 'Community (REV-101), Nativity (REV-102), Income (REV-103), First Graduate (REV-104), OBC-NCL (REV-115)',
      icon: Building,
      badge: '10 Services',
    },
    {
      id: 'identity',
      name: 'National Identity Documents',
      desc: 'Aadhaar (Lifetime validity), PAN Card, Voter ID (18+ Form 6), Passport',
      icon: ShieldCheck,
      badge: '4 Documents',
    },
    {
      id: 'readiness',
      name: 'Document Readiness Checker',
      desc: 'Evaluate all required documents for 13 specific purposes across 9 education stages',
      icon: FileCheck,
      badge: 'Interactive Engine',
    },
    {
      id: 'school',
      name: 'School Education Documents',
      desc: 'SSLC 10th marksheet, HSC 11th & 12th marksheets, Transfer Certificate, EMIS number',
      icon: GraduationCap,
      badge: 'Class 10 - 12',
    },
    {
      id: 'diploma',
      name: 'Diploma & Polytechnic',
      desc: 'DoTE marksheets, provisional diploma, consolidated marksheets, ITI certificates',
      icon: Layers,
      badge: 'Technical Board',
    },
    {
      id: 'college',
      name: 'Undergraduate College Degrees',
      desc: 'Semester marksheets, consolidated grade sheets, provisional, degree, conduct certificates',
      icon: GraduationCap,
      badge: 'University Level',
    },
    {
      id: 'pg',
      name: 'Postgraduate & Research',
      desc: 'PG degrees, Ph.D coursework, JRF/SRF awards, publication records, post-doctoral credentials',
      icon: Sparkles,
      badge: 'Higher Research',
    },
    {
      id: 'digilocker',
      name: 'DigiLocker Centre',
      desc: 'Step-by-step guide to fetch authentic digitally signed certificates with Rule 9A legal parity',
      icon: FolderLock,
      badge: 'Digital India',
    },
    {
      id: 'validity',
      name: 'Validity & Renewal Intelligence',
      desc: 'Precise statutory validity rules — no false universal 1-year expiry assumptions',
      icon: Clock,
      badge: 'Statutory Rules',
    },
    {
      id: 'tracker',
      name: 'My Application Tracker',
      desc: 'Track official reference numbers for e-Sevai, DGE, or university certificates in one place',
      icon: Search,
      badge: 'External Tracker',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Card */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0d3e2e]/20 bg-[#0d3e2e]/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            <ShieldCheck size={13} />
            TAMIL NADU &amp; GOVERNMENT OF INDIA STUDENT DOCUMENT GATEWAY
          </div>
          <h2 className="font-serif text-[24px] sm:text-[30px] font-bold text-[#2b2118] leading-tight">
            Every Important Student Document. One Trusted Place.
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-[#5c4a3a] leading-relaxed">
            Eliminate document confusion for admissions, counseling, scholarships, examinations, and government job applications. Verified step-by-step guides, official e-District portals, statutory validity rules, and interactive readiness checkers for all students from Class 10 to PhD scholars.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigateTab('finder')}
              className="rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] px-4 py-2.5 font-sans text-[13px] font-bold text-white shadow-xs transition flex items-center gap-1.5"
            >
              <Compass size={15} />
              Find My Certificate
            </button>
            <button
              onClick={() => onNavigateTab('readiness')}
              className="rounded-xl border border-[#efe3cc] bg-white hover:bg-[#fbf5e9] px-4 py-2.5 font-sans text-[13px] font-semibold text-[#2b2118] transition flex items-center gap-1.5 shadow-2xs"
            >
              <FileCheck size={15} className="text-[#0d3e2e]" />
              Check Document Readiness
            </button>
            <button
              onClick={onOpenDiagnostics}
              className="rounded-xl border border-[#efe3cc] bg-white hover:bg-[#fbf5e9] px-3.5 py-2.5 font-mono text-[11px] text-[#7a6a5a] transition flex items-center gap-1.5"
            >
              <Activity size={13} className="text-emerald-700" />
              Source Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* Core Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
              Document Service Areas
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Educational credentials, revenue certificates, DigiLocker guides, and evaluation tools
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigateTab(cat.id)}
                className="group relative cursor-pointer rounded-2xl border border-[#efe3cc] bg-white hover:border-[#0d3e2e]/40 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 flex items-center justify-center font-bold">
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a] bg-[#fbf5e9] border border-[#efe3cc]">
                      {cat.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-[17px] font-bold text-[#2b2118] group-hover:text-[#0d3e2e] transition">
                    {cat.name}
                  </h4>
                  <p className="font-sans text-[12px] text-[#5c4a3a] mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#efe3cc] flex items-center justify-between font-sans text-[12px] font-semibold text-[#0d3e2e]">
                  <span>Explore Service</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Most Frequently Required Certificates */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#efe3cc]">
          <div>
            <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
              Most Requested Student Certificates
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Direct access to Tamil Nadu Revenue e-Sevai services, fees, and processing time
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('govt')}
            className="font-sans text-[12px] font-bold text-[#0d3e2e] hover:underline flex items-center gap-1 self-start"
          >
            View all services <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topServices.map((doc) => (
            <CertificateCard
              key={doc.id}
              document={doc}
              onOpenDocModal={onOpenDocModal}
            />
          ))}
        </div>
      </div>

      {/* Statutory Guidance Note */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#f8f1e3] p-5 flex items-start gap-3.5 text-[#2b2118]">
        <AlertCircle size={20} className="text-[#0d3e2e] shrink-0 mt-0.5" />
        <div className="font-sans text-[12px] text-[#5c4a3a] leading-relaxed space-y-1">
          <strong className="font-serif text-[14px] font-bold text-[#2b2118] block">
            Statutory Validity Principles:
          </strong>
          <p>
            1. <strong>Community Certificates</strong> in Tamil Nadu carry permanent lifetime validity and do not expire annually.
          </p>
          <p>
            2. <strong>Income Certificates</strong> have purpose-dependent validity (e.g. current financial year for scholarships; not a universal 1-year expiration rule).
          </p>
          <p>
            3. <strong>DigiLocker documents</strong> issued directly by recognized government authorities have full legal equivalence to physical originals under Rule 9A of IT Rules 2016.
          </p>
        </div>
      </div>
    </div>
  );
}
