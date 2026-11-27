'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Phone, ShieldAlert, Clock, CheckCircle2, Copy, Check, MessageSquare, Building2, HelpCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ContactInfoPage() {
  const [copied, setCopied] = useState(false);
  const email = 'studentrsoin@gmail.com';

  function handleCopyEmail() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const helplines = [
    {
      title: 'Anti-Ragging National Helpline (24x7)',
      number: '1800-180-5522',
      details: 'Toll-free emergency anti-ragging support (UGC & Supreme Court Mandate)',
      href: 'tel:18001805522',
    },
    {
      title: 'National Cyber Crime Reporting Helpline',
      number: '1930',
      details: 'Ministry of Home Affairs portal for cyber fraud and online harassment',
      href: 'tel:1930',
    },
    {
      title: 'Emergency Response Support System (ERSS)',
      number: '112',
      details: 'All-India emergency number for immediate police, fire, or medical aid',
      href: 'tel:112',
    },
    {
      title: 'Women & Student Safety Helpline',
      number: '181',
      details: 'State emergency helpline for women and student safety assistance',
      href: 'tel:181',
    },
  ];

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
            <Mail size={14} /> Student Support &amp; Grievance Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111814] tracking-tight mb-4">
            Contact Information
          </h1>
          <p className="text-[#57534e] text-base sm:text-lg leading-relaxed max-w-2xl">
            Have questions about student services, scholarship verifications, or portal navigation? Reach out directly to our student support team.
          </p>
        </div>

        {/* Primary Contact Card: studentrsoin@gmail.com */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#d8e5dd] shadow-sm mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0d3e2e] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Mail size={26} />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0d3e2e]">
                Official Direct Email
              </span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-[#111814] break-all">
                {email}
              </div>
              <p className="text-xs sm:text-sm text-[#57534e]">
                Inquiries, feedback, verified source reports, and platform assistance.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <a
              href={`mailto:${email}`}
              className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail size={16} />
              <span>Send Email</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-4 py-3 rounded-xl border border-[#d8e5dd] bg-[#f8fbf9] hover:bg-[#edf5f0] text-[#1c1917] font-sans text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-700" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Operating Hours & Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] flex items-start gap-3">
            <Clock size={20} className="text-[#0d3e2e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-serif font-bold text-[#111814]">Response Time</strong>
              <span className="text-xs text-[#57534e]">Within 24–48 hours for student guidance and inquiries.</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] flex items-start gap-3">
            <ShieldAlert size={20} className="text-[#0d3e2e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-serif font-bold text-[#111814]">Safety Inquiries</strong>
              <span className="text-xs text-[#57534e]">Anti-ragging and urgent student grievance prioritization.</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] flex items-start gap-3">
            <Building2 size={20} className="text-[#0d3e2e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-serif font-bold text-[#111814]">Institutional Links</strong>
              <span className="text-xs text-[#57534e]">Verification of circulars from official TN &amp; Central portals.</span>
            </div>
          </div>
        </div>

        {/* Emergency Government Helplines (Crucial for Student Safety) */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-between pb-2 border-b border-[#d8e5dd]">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814]">
                24x7 Statutory Emergency Helplines
              </h2>
              <p className="text-xs sm:text-sm text-[#57534e]">
                For immediate emergency safety, anti-ragging, cyber fraud, or police assistance:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helplines.map((h) => (
              <a
                key={h.number}
                href={h.href}
                className="p-5 rounded-2xl bg-[#f8fbf9] border border-[#d8e5dd] hover:border-[#0d3e2e] hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xl font-bold text-[#0d3e2e] group-hover:underline">
                      {h.number}
                    </span>
                    <Phone size={18} className="text-[#0d3e2e] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#111814] mb-1">
                    {h.title}
                  </h3>
                  <p className="text-xs text-[#57534e]">
                    {h.details}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="p-6 rounded-2xl bg-[#edf5f0] border border-[#d8e5dd] space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#0d3e2e] flex items-center gap-2">
            <HelpCircle size={18} />
            Important Note Regarding Official Applications
          </h3>
          <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
            Please note that Student RSO does not collect application fees or process official certificate approvals directly. All applications must be submitted through the official government portal linked within each service (e.g. TN e-District, NSP, or Examination Portal). For questions regarding a pending application with a government department, please contact the specific department&apos;s helpline directly.
          </p>
        </div>
      </main>

      <Footer onNavigate={(id) => { window.location.href = `/#${id}`; }} />
    </div>
  );
}
