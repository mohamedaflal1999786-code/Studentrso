'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, Mail, AlertTriangle, ShieldCheck, CheckCircle2, Info, Scale } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsAndConditionsPage() {
  const lastUpdated = 'November 24, 2026';

  return (
    <div className="min-h-screen bg-[#f2f8f4] text-[#1c1917] flex flex-col font-sans">
      <Header
        onSignIn={() => { window.location.href = '/auth'; }}
        onNavigate={(id) => { window.location.href = `/#${id}`; }}
        onOpenProfile={() => { window.location.href = '/dashboard'; }}
        onServiceClick={(id) => { window.location.href = `/#${id}`; }}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d3e2e] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="border-b border-[#d8e5dd] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf5f0] border border-[#d8e5dd] text-[#0d3e2e] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Scale size={14} /> Public Service Terms &amp; Conditions
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111814] tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-[#57534e] text-base sm:text-lg leading-relaxed max-w-2xl">
            Please read these Terms of Service carefully before utilizing Student RSO. By accessing our platform, you agree to comply with and be bound by the following conditions.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#57534e]">
            <span>Last Revised: <strong>{lastUpdated}</strong></span>
            <span>·</span>
            <span>Platform Status: <strong>Non-Commercial Public Digital Service</strong></span>
          </div>
        </div>

        {/* Crucial Statutory Notice */}
        <div className="p-5 rounded-2xl bg-[#edf5f0] border border-[#d8e5dd] mb-10 flex items-start gap-3.5">
          <Info size={22} className="text-[#0d3e2e] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-[#0d3e2e]">
              Statutory Platform Notice &amp; Non-Affiliation
            </h3>
            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
              Student RSO (Rights, Services &amp; Opportunities) is an independent student information, guidance, and digital navigation platform. 
              <strong> Student RSO is not a government agency, institutional admission board, or examination authority.</strong> 
              Official applications, certificates, admissions, and financial disbursements remain under the sole jurisdiction of respective state and central authorities.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10 text-[#2b2118] text-sm sm:text-base leading-relaxed">
          {/* Section 1: Nature of Service */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">1</span>
              Nature of Platform &amp; Free Public Access
            </h2>
            <p className="text-[#57534e]">
              Student RSO provides free, organized digital public access to verified educational schemes, welfare opportunities, statutory rights, anti-ragging safeguards, and administrative checklists across 10 modules:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#57534e]">
              <li>All services, tools, guides, and trackers are 100% free of charge for learners and parents.</li>
              <li>There are no subscription fees, premium tiers, paywalled information, or commission-based recommendations.</li>
              <li>All external links direct students solely to official government domains (such as <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-[#d8e5dd]">.gov.in</code>, <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-[#d8e5dd]">.nic.in</code>, <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-[#d8e5dd]">.ac.in</code>) and authorized institutional portals.</li>
            </ul>
          </section>

          {/* Section 2: User Account & Fair Use */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">2</span>
              User Accounts &amp; Fair Use Policy
            </h2>
            <p className="text-[#57534e]">
              When creating an account on Student RSO to access personalized tracking and bookmarks:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#57534e]">
              <li>You agree to provide accurate email credentials and keep your account access credentials secure.</li>
              <li>You may not use automated bots, scrapers, or exploits to extract database records, disrupt server availability, or harvest student contact data.</li>
              <li>Accounts found engaging in unauthorized automated requests, credential stuffing, or harmful behavior will be restricted or terminated to safeguard community integrity.</li>
            </ul>
          </section>

          {/* Section 3: Official Verification & Accuracy Disclaimer */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">3</span>
              Information Accuracy &amp; Official Verification
            </h2>
            <p className="text-[#57534e]">
              While our editorial and automated verification engines continuously cross-verify scholarship deadlines, government guidelines, and examination circulars:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#57534e]">
              <li>Government departments, universities, and examination boards frequently update deadlines, eligibility criteria, and quotas.</li>
              <li>Students are advised to cross-check critical final submission dates on the official portal linked within each opportunity card before submitting applications.</li>
              <li>Student RSO assumes no legal liability for changes made by external authorities or missed institutional deadlines.</li>
            </ul>
          </section>

          {/* Section 4: AI Career Assistant & Guidance Disclaimer */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">4</span>
              AI Student Assistant Usage
            </h2>
            <p className="text-[#57534e]">
              Module 05 (AI Career Assistant) provides automated conversational roadmaps, study techniques, and career explorations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#57534e]">
              <li>Guidance generated by the assistant is designed for educational exploration and should be considered supplementary to qualified academic counseling.</li>
              <li>The AI engine is tuned with strict safety guardrails and will never recommend unaccredited commercial universities or unauthorized fee-paying middlemen.</li>
            </ul>
          </section>

          {/* Section 5: Intellectual Property & Public License */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">5</span>
              Intellectual Property &amp; Fair Access
            </h2>
            <p className="text-[#57534e]">
              The Student RSO software framework, UI design system, and editorial summaries are protected intellectual property. Government emblems, logos, circular citations, and regulatory guidelines remain the property of their respective statutory bodies and are referenced under fair dealing for educational guidance and public transparency.
            </p>
          </section>

          {/* Section 6: Inquiries & Contact */}
          <section className="p-6 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#111814] flex items-center gap-2">
              <Mail className="text-[#0d3e2e]" size={20} />
              Inquiries, Feedback &amp; Legal Notices
            </h2>
            <p className="text-sm text-[#57534e] leading-relaxed">
              For questions concerning these Terms &amp; Conditions, or to report an issue with an educational link or procedure, please contact our administrative desk:
            </p>
            <div className="inline-flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#d8e5dd]">
              <Mail size={18} className="text-[#0d3e2e]" />
              <div>
                <div className="text-xs text-[#57534e] font-medium">Official Contact Email:</div>
                <a
                  href="mailto:studentrsoin@gmail.com"
                  className="font-mono text-sm font-bold text-[#0d3e2e] hover:underline"
                >
                  studentrsoin@gmail.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onNavigate={(id) => { window.location.href = `/#${id}`; }} />
    </div>
  );
}
