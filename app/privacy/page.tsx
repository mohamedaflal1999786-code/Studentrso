'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Mail, Lock, EyeOff, FileText, CheckCircle, Scale, Database } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
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
            <Shield size={14} /> Student Data Ethics &amp; Transparency
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111814] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#57534e] text-base sm:text-lg leading-relaxed max-w-2xl">
            Student RSO is an independent public digital platform dedicated to protecting learner rights. We believe student data is private, sacred, and non-commercial.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#57534e]">
            <span>Effective Date: <strong>{lastUpdated}</strong></span>
            <span>·</span>
            <span>Governance: <strong>Digital Personal Data Protection (DPDP) Act</strong></span>
          </div>
        </div>

        {/* Core Pillars Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center">
              <EyeOff size={18} />
            </div>
            <h3 className="font-serif text-base font-bold text-[#111814]">Zero Commercial Selling</h3>
            <p className="text-xs text-[#57534e] leading-relaxed">
              We never monetize, auction, or sell student profiles, phone numbers, or academic credentials to private colleges or advertisers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center">
              <Lock size={18} />
            </div>
            <h3 className="font-serif text-base font-bold text-[#111814]">Encrypted &amp; Isolated</h3>
            <p className="text-xs text-[#57534e] leading-relaxed">
              User records are isolated using PostgreSQL Row Level Security (RLS) and encrypted in transit (TLS 1.3) and at rest.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center">
              <Database size={18} />
            </div>
            <h3 className="font-serif text-base font-bold text-[#111814]">Student Ownership</h3>
            <p className="text-xs text-[#57534e] leading-relaxed">
              You retain full control over your saved opportunities and profile. You can update or delete your information at any time.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-[#2b2118] text-sm sm:text-base leading-relaxed">
          {/* 1. What Information We Collect */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">1</span>
              Information We Collect
            </h2>
            <p className="text-[#57534e]">
              Student RSO operates on a principle of data minimization. We only collect the minimal information necessary to deliver verified educational navigation and personalized opportunity recommendations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#57534e]">
              <li><strong>Account Credentials:</strong> Email address and hashed passwords (or OAuth identity tokens if you choose Google Sign-In) to secure your account.</li>
              <li><strong>Academic Profile (Optional):</strong> Education cohort (e.g. Class 10, Class 12, Undergraduate, Postgraduate, PhD), district/state, stream of study, and category criteria solely for matching eligible scholarships, entrance exams, and internships.</li>
              <li><strong>Saved Opportunities:</strong> Bookmarks, status tracking, and personalized notes created within your student dashboard.</li>
              <li><strong>Diagnostic Telemetry:</strong> Anonymized performance metrics to ensure server availability, anti-bot protection, and accessibility compliance.</li>
            </ul>
          </section>

          {/* 2. What We NEVER Collect */}
          <section className="space-y-3 p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#92400e] flex items-center gap-2">
              <Shield size={20} className="text-[#92400e]" />
              Sensitive Data We Never Collect
            </h2>
            <p className="text-[#78350f] text-sm leading-relaxed">
              Student RSO is an advisory and navigation directory. We <strong>NEVER</strong> collect or store:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#78350f] font-medium pt-1">
              <div className="flex items-center gap-1.5">✕ Bank Account or Debit/Credit Card details</div>
              <div className="flex items-center gap-1.5">✕ Aadhaar numbers or Biometric records</div>
              <div className="flex items-center gap-1.5">✕ Government portal passwords or OTPs</div>
              <div className="flex items-center gap-1.5">✕ Official DigiLocker master credentials</div>
            </div>
          </section>

          {/* 3. How Your Information is Used */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">2</span>
              How Your Information Is Used
            </h2>
            <p className="text-[#57534e]">Your information is strictly utilized to:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#57534e]">
              <li>Match student cohorts with verified government and institutional welfare schemes (e.g. NSP, Pudhumai Penn, Tamil Pudhalvan, TNEA, AICTE).</li>
              <li>Maintain your personal application trackers, notes, and deadline reminders.</li>
              <li>Provide instant AI assistance and safety guidance via the student career helper.</li>
              <li>Prevent unauthorized system access, automated scrapers, and credential abuse.</li>
            </ul>
          </section>

          {/* 4. Data Security & Storage */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0d3e2e] text-white text-xs flex items-center justify-center font-mono">3</span>
              Data Protection &amp; Security Standards
            </h2>
            <p className="text-[#57534e]">
              We implement industry-grade security protocols following OWASP Top 10 recommendations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#57534e]">
              <li><strong>Row-Level Security (RLS):</strong> Every user record in our database is protected by database-enforced policies ensuring no user can read or modify another student&apos;s data.</li>
              <li><strong>Secure Session Management:</strong> Cryptographically signed HMAC sessions and secure HTTP-only cookies prevent session hijacking and cross-site scripting (XSS).</li>
              <li><strong>Zero Third-Party Trackers:</strong> We do not deploy invasive commercial behavioral ad trackers or sell browsing history to ad brokers.</li>
            </ul>
          </section>

          {/* 5. Student Rights Under Indian Law */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] flex items-center gap-2">
              <Scale size={20} className="text-[#0d3e2e]" />
              Your Rights (DPDP Act)
            </h2>
            <p className="text-[#57534e]">
              In accordance with applicable privacy laws and digital safety standards, students possess the following rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd]">
                <strong className="block font-serif text-sm text-[#111814]">Right to Access</strong>
                <span className="text-xs text-[#57534e]">View all profile data and saved bookmarks associated with your account.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd]">
                <strong className="block font-serif text-sm text-[#111814]">Right to Correction</strong>
                <span className="text-xs text-[#57534e]">Edit your personal and educational profile details anytime from the dashboard.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd]">
                <strong className="block font-serif text-sm text-[#111814]">Right to Erasure</strong>
                <span className="text-xs text-[#57534e]">Request the permanent removal of your account, saved preferences, and telemetry data.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd]">
                <strong className="block font-serif text-sm text-[#111814]">Right to Grievance Redressal</strong>
                <span className="text-xs text-[#57534e]">Direct inquiries to our dedicated Privacy Officer with prompt response within 48 hours.</span>
              </div>
            </div>
          </section>

          {/* 6. Contact & Grievance Officer */}
          <section className="p-6 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#111814] flex items-center gap-2">
              <Mail className="text-[#0d3e2e]" size={20} />
              Privacy Officer &amp; Contact Information
            </h2>
            <p className="text-sm text-[#57534e] leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact our team directly:
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
            <p className="text-xs text-[#57534e]">
              We respond to all privacy, access, and data verification requests within 24 to 48 business hours.
            </p>
          </section>
        </div>
      </main>

      <Footer onNavigate={(id) => { window.location.href = `/#${id}`; }} />
    </div>
  );
}
