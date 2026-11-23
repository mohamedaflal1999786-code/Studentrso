'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Eye, Volume2, Globe, HeartHandshake, ShieldCheck, HelpCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AccessibilityPage() {
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
            <HeartHandshake size={14} /> Digital Inclusivity &amp; Universal Access
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111814] tracking-tight mb-4">
            Accessibility Statement
          </h1>
          <p className="text-[#57534e] text-base sm:text-lg leading-relaxed max-w-2xl">
            Student RSO is built for all learners regardless of physical ability, device type, or internet connection speed. We adhere to WCAG 2.1 Level AA standards.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#57534e]">
            <span>Standard: <strong>WCAG 2.1 Level AA Compliant</strong></span>
            <span>·</span>
            <span>Last Reviewed: <strong>{lastUpdated}</strong></span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#292524]">
          {/* Section 1 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#d8e5dd] shadow-2xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] mb-3 flex items-center gap-2.5">
              <Eye className="text-[#0d3e2e]" size={22} />
              1. Visual &amp; Screen Reader Accessibility
            </h2>
            <p className="text-[#57534e] mb-4">
              We design all digital user interfaces with high optical contrast ratios (minimum 4.5:1 for standard text, 3:1 for large text) and semantic HTML tags:
            </p>
            <ul className="space-y-2 text-[#44403c] list-disc pl-5">
              <li><strong>Descriptive ALT text</strong> on all instructional diagrams, scheme badges, and emblems.</li>
              <li><strong>Keyboard Navigation</strong>: Full keyboard accessibility using Tab, Shift+Tab, and Enter across all menus and modals.</li>
              <li><strong>Scalable typography</strong>: Layouts adapt cleanly up to 200% zoom without horizontal scrolling or text clipping.</li>
              <li><strong>Clear focus indicators</strong> on all interactive buttons, links, and input elements.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#d8e5dd] shadow-2xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] mb-3 flex items-center gap-2.5">
              <Volume2 className="text-[#0d3e2e]" size={22} />
              2. Assistive Voice &amp; Speech Technology
            </h2>
            <p className="text-[#57534e] mb-4">
              Our inbuilt <strong>Student RSO Brain Guide</strong> provides speech-to-text input and natural text-to-speech audio feedback for visually impaired learners:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd]">
                <h3 className="font-bold text-[#0d3e2e] mb-1">Voice Recognition</h3>
                <p className="text-xs text-[#57534e]">Voice query support in both English and Tamil for hands-free navigation across all 10 modules.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd]">
                <h3 className="font-bold text-[#0d3e2e] mb-1">Text-to-Speech Output</h3>
                <p className="text-xs text-[#57534e]">Instant audio synthesis reading out eligibility criteria, deadlines, and application steps.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#d8e5dd] shadow-2xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] mb-3 flex items-center gap-2.5">
              <Globe className="text-[#0d3e2e]" size={22} />
              3. Multi-Device &amp; Low-Bandwidth Support
            </h2>
            <p className="text-[#57534e] mb-3">
              Educational equity requires digital infrastructure that works seamlessly on budget smartphones, public library terminals, and low-speed 2G/3G connections in rural areas:
            </p>
            <ul className="space-y-2 text-[#44403c] list-disc pl-5">
              <li>Responsive fluid layout adapted for all mobile screen sizes from 320px upwards.</li>
              <li>Minimal script payload with zero tracking scripts, bloatware, or heavy animations.</li>
              <li>Direct fallback links to official government portal portals if client scripting is disabled.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#d8e5dd] shadow-2xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111814] mb-3 flex items-center gap-2.5">
              <HelpCircle className="text-[#0d3e2e]" size={22} />
              4. Accessibility Feedback &amp; Support
            </h2>
            <p className="text-[#57534e] mb-4">
              If you experience any accessibility barriers while using Student RSO or require information in an alternate accessible format, please contact our accessibility coordinator:
            </p>
            <div className="p-4 rounded-xl bg-[#f8fbf9] border border-[#d8e5dd] text-sm">
              <p><strong>Accessibility Support Team</strong>: Student RSO Digital Inclusivity</p>
              <p className="mt-1">Email: <a href="mailto:studentrsoin@gmail.com" className="text-[#0d3e2e] underline font-mono">studentrsoin@gmail.com</a></p>
              <p className="mt-1">Response Commitment: We respond to accessibility assistance requests within 2 business days.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer onNavigate={(id) => { window.location.href = `/#${id}`; }} />
    </div>
  );
}
