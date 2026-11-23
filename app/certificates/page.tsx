'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Compass,
  FileCheck,
  ShieldCheck,
  Building,
  GraduationCap,
  Layers,
  Sparkles,
  FolderLock,
  HelpCircle,
  Clock,
  ListTodo,
  Search,
  Globe,
  FileText,
  User,
  Activity,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import { DocumentItem } from '@/lib/certificates-data';

// Component Sections
import { CertificateOverviewDashboard } from '@/components/certificates/CertificateOverviewDashboard';
import { FindMyCertificateFinder } from '@/components/certificates/FindMyCertificateFinder';
import { DocumentReadinessChecker } from '@/components/certificates/DocumentReadinessChecker';
import { GovernmentCertificatesSection } from '@/components/certificates/GovernmentCertificatesSection';
import { IdentityDocumentsSection } from '@/components/certificates/IdentityDocumentsSection';
import { SchoolDocumentsSection } from '@/components/certificates/SchoolDocumentsSection';
import { DiplomaDocumentsSection } from '@/components/certificates/DiplomaDocumentsSection';
import { CollegeDocumentsSection } from '@/components/certificates/CollegeDocumentsSection';
import { PostgraduateDocumentsSection } from '@/components/certificates/PostgraduateDocumentsSection';
import { DigiLockerCentre } from '@/components/certificates/DigiLockerCentre';
import { ApplicationGuidanceSection } from '@/components/certificates/ApplicationGuidanceSection';
import { DownloadVerificationSection } from '@/components/certificates/DownloadVerificationSection';
import { ValidityRenewalAssistant } from '@/components/certificates/ValidityRenewalAssistant';
import { MyDocumentChecklist } from '@/components/certificates/MyDocumentChecklist';
import { MyApplicationTracker } from '@/components/certificates/MyApplicationTracker';
import { OfficialServiceDirectory } from '@/components/certificates/OfficialServiceDirectory';
import { CertificateFaqsSection } from '@/components/certificates/CertificateFaqsSection';
import { CertificateDetailModal } from '@/components/certificates/CertificateDetailModal';
import { CertificateDiagnosticsModal } from '@/components/certificates/CertificateDiagnosticsModal';

export type CertificateTab =
  | 'overview'
  | 'finder'
  | 'govt'
  | 'identity'
  | 'school'
  | 'diploma'
  | 'college'
  | 'pg'
  | 'digilocker'
  | 'guidance'
  | 'download-verify'
  | 'validity'
  | 'readiness'
  | 'checklist'
  | 'tracker'
  | 'directory'
  | 'faqs';

function CertificatesContent() {
  const { user, profile: authProfile } = useAuth();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<CertificateTab>('overview');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Handle URL query parameters (e.g. ?tab=finder or ?tab=readiness)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const validTabs: CertificateTab[] = [
        'overview',
        'finder',
        'govt',
        'identity',
        'school',
        'diploma',
        'college',
        'pg',
        'digilocker',
        'guidance',
        'download-verify',
        'validity',
        'readiness',
        'checklist',
        'tracker',
        'directory',
        'faqs',
      ];
      if (validTabs.includes(tabParam as CertificateTab)) {
        setActiveTab(tabParam as CertificateTab);
      }
    }
  }, [searchParams]);

  const handleOpenDocModal = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setDocModalOpen(true);
  };

  const navTabs: { id: CertificateTab; label: string; icon: any }[] = [
    { id: 'overview', label: '1. Overview', icon: FileText },
    { id: 'finder', label: '2. Find My Certificate', icon: Compass },
    { id: 'govt', label: '3. Government Certificates', icon: Building },
    { id: 'identity', label: '4. Identity Documents', icon: ShieldCheck },
    { id: 'school', label: '5. School Documents', icon: GraduationCap },
    { id: 'diploma', label: '6. Diploma Documents', icon: Layers },
    { id: 'college', label: '7. College Documents', icon: GraduationCap },
    { id: 'pg', label: '8. Postgraduate Documents', icon: Sparkles },
    { id: 'digilocker', label: '9. DigiLocker Centre', icon: FolderLock },
    { id: 'guidance', label: '10. Application Guidance', icon: HelpCircle },
    { id: 'download-verify', label: '11. Download & Verification', icon: CheckCircle2 },
    { id: 'validity', label: '12. Validity & Renewal', icon: Clock },
    { id: 'readiness', label: '13. Document Readiness Checker', icon: FileCheck },
    { id: 'checklist', label: '14. My Document Checklist', icon: ListTodo },
    { id: 'tracker', label: '15. My Application Tracker', icon: Search },
    { id: 'directory', label: '16. Official Service Directory', icon: Globe },
    { id: 'faqs', label: '17. FAQs', icon: HelpCircle },
  ];

  return (
    <main className="min-h-screen bg-[#f2f8f4] text-[#2b2118]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#d8e5dd] bg-[#fdfbf6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#0d3e2e] hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Student RSO</span>
            </Link>
            <span className="text-[#efe3cc]">|</span>
            <span className="font-serif text-[17px] font-bold text-[#2b2118] hidden sm:inline">
              Student Certificate & Document Service Centre
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              onClick={() => setDiagnosticsOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#d8e5dd] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#f2f8f4] transition"
              title="Inspect Official Government Source Telemetry"
            >
              <Activity size={13} className="text-emerald-700" />
              <span>Diagnostics</span>
            </button>

            {user ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8e5dd] bg-[#f2f8f4] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
                <User size={14} className="text-[#0d3e2e]" />
                {authProfile?.full_name || user.email?.split('@')[0]}
              </span>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#0d3e2e] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c]"
              >
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Strip */}
      <section className="border-b border-[#d8e5dd] bg-[#0d3e2e] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <FileCheck2 size={13} /> STUDENT RSO 2.0 · MODULE 03: CERTIFICATE & DOCUMENT SERVICE
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Your Documents, Made Easier.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Apply, access, download and manage important educational and government certificates in one place.
                Verified step-by-step guides, official e-District portals, statutory validity rules, and interactive readiness checkers for all students from Class 10 to PhD scholars.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveTab('readiness')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#0d3e2e] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5"
              >
                <FileCheck size={16} /> Check Document Readiness
              </button>
              <button
                onClick={() => setActiveTab('finder')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 flex items-center gap-1.5"
              >
                <Compass size={15} /> Find My Certificate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#d8e5dd] pb-2 scrollbar-none">
          {navTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition ${
                  isActive
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <CertificateOverviewDashboard
            onNavigateTab={(tab) => setActiveTab(tab as CertificateTab)}
            onOpenDocModal={handleOpenDocModal}
            onOpenDiagnostics={() => setDiagnosticsOpen(true)}
          />
        )}

        {activeTab === 'finder' && (
          <FindMyCertificateFinder
            onOpenDocModal={handleOpenDocModal}
            onNavigateTab={(tab) => setActiveTab(tab as CertificateTab)}
          />
        )}

        {activeTab === 'govt' && (
          <GovernmentCertificatesSection onOpenDocModal={handleOpenDocModal} />
        )}

        {activeTab === 'identity' && (
          <IdentityDocumentsSection onOpenDocModal={handleOpenDocModal} />
        )}

        {activeTab === 'school' && (
          <SchoolDocumentsSection onOpenDocModal={handleOpenDocModal} />
        )}

        {activeTab === 'diploma' && (
          <DiplomaDocumentsSection onOpenDocModal={handleOpenDocModal} />
        )}

        {activeTab === 'college' && (
          <CollegeDocumentsSection onOpenDocModal={handleOpenDocModal} />
        )}

        {activeTab === 'pg' && (
          <PostgraduateDocumentsSection onOpenDocModal={handleOpenDocModal} />
        )}

        {activeTab === 'digilocker' && <DigiLockerCentre />}

        {activeTab === 'guidance' && <ApplicationGuidanceSection />}

        {activeTab === 'download-verify' && <DownloadVerificationSection />}

        {activeTab === 'validity' && <ValidityRenewalAssistant />}

        {activeTab === 'readiness' && (
          <DocumentReadinessChecker
            onOpenDocModal={handleOpenDocModal}
            onNavigateTab={(tab) => setActiveTab(tab as CertificateTab)}
          />
        )}

        {activeTab === 'checklist' && <MyDocumentChecklist />}

        {activeTab === 'tracker' && <MyApplicationTracker />}

        {activeTab === 'directory' && <OfficialServiceDirectory />}

        {activeTab === 'faqs' && <CertificateFaqsSection />}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#d8e5dd] bg-[#fdfbf6] py-8 px-4 text-center font-sans text-[12px] text-[#7a6a5a] mt-16">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-[#2b2118]">
            Student RSO 2.0 – Student Rights, Services &amp; Opportunities Platform · Module 03: Certificate &amp; Document Service
          </p>
          <p>
            Independent digital public service intelligence initiative designed for Tamil Nadu students. Directs exclusively to authorized government domains (.gov.in, .nic.in, .edu.in).
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <CertificateDetailModal
        document={selectedDoc}
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        onSelectAction={(action) => {
          setDocModalOpen(false);
          if (action === 'checklist') setActiveTab('checklist');
          if (action === 'readiness') setActiveTab('readiness');
        }}
      />

      {/* Diagnostics Modal */}
      <CertificateDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />

      {/* Auth Modal */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />
    </main>
  );
}

export default function CertificatesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f2f8f4] flex items-center justify-center text-[#2b2118] font-sans">Loading Certificate & Document Service...</div>}>
      <CertificatesContent />
    </Suspense>
  );
}
