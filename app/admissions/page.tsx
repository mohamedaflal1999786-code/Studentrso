// app/admissions/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Compass,
  GraduationCap,
  Layers,
  Award,
  Brain,
  FileText,
  Search,
  Building,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  FileCheck2,
  HelpCircle,
  Sparkles,
  Phone,
  Bookmark,
  Share2,
  User,
  Activity
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import { AdmissionsDiagnosticsModal } from '@/components/admissions/AdmissionsDiagnosticsModal';
import {
  EducationStage,
  AdmissionPathway,
  ADMISSION_PATHWAYS,
  getPathwayById,
  searchPathways
} from '@/lib/admissions-data';

// Component Sections
import { AdmissionsOverviewDashboard } from '@/components/admissions/AdmissionsOverviewDashboard';
import { AdmissionGuidanceCatalogue } from '@/components/admissions/AdmissionGuidanceCatalogue';
import { GovernmentPortalsSection } from '@/components/admissions/GovernmentPortalsSection';
import { TransferAndReentryCentre } from '@/components/admissions/TransferAndReentryCentre';
import { CreditAndAcademicMobility } from '@/components/admissions/CreditAndAcademicMobility';
import { AdmissionDocumentsSection } from '@/components/admissions/AdmissionDocumentsSection';
import { AdmissionDeadlineCalendar } from '@/components/admissions/AdmissionDeadlineCalendar';
import { AdmissionTrackerSection } from '@/components/admissions/AdmissionTrackerSection';
import { AdmissionProcedureModal } from '@/components/admissions/AdmissionProcedureModal';

export type AdmissionsNavTab =
  | 'overview'
  | 'admission-guidance'
  | 'govt-portals'
  | 'transfer-reentry'
  | 'credit-mobility'
  | 'required-documents'
  | 'admission-deadlines'
  | 'my-applications'
  | 'help-guidance';

const NAV_TABS: { id: AdmissionsNavTab; label: string; icon: any }[] = [
  { id: 'overview', label: '1. Overview', icon: Compass },
  { id: 'admission-guidance', label: '2. Admission Guidance (10th to PhD)', icon: GraduationCap },
  { id: 'govt-portals', label: '3. Official Portals Directory', icon: Building },
  { id: 'transfer-reentry', label: '4. Transfer & Re-entry Centre', icon: Layers },
  { id: 'credit-mobility', label: '5. Credit Transfer (ABC/APAAR)', icon: Award },
  { id: 'required-documents', label: '6. Required Documents', icon: FileCheck2 },
  { id: 'admission-deadlines', label: '7. Deadlines & Calendar', icon: Calendar },
  { id: 'my-applications', label: '8. My Applications Tracker', icon: FileText },
  { id: 'help-guidance', label: '9. Help & Department Contacts', icon: HelpCircle },
];

function AdmissionsCentreContent() {
  const { user, profile: authProfile } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = (searchParams.get('tab') as AdmissionsNavTab) || 'overview';
  const idParam = searchParams.get('id');

  const [activeTab, setActiveTab] = useState<AdmissionsNavTab>(tabParam);
  const [selectedPathway, setSelectedPathway] = useState<AdmissionPathway | null>(null);
  const [selectedStage, setSelectedStage] = useState<EducationStage>('All Stages');
  const [searchQuery, setSearchQuery] = useState('');
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (tabParam && NAV_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
    if (idParam) {
      const match = getPathwayById(idParam);
      if (match) setSelectedPathway(match);
    }
  }, [tabParam, idParam]);

  function handleTabChange(tab: AdmissionsNavTab) {
    setActiveTab(tab);
    router.push(`/admissions?tab=${tab}`, { scroll: false });
  }

  function handleSelectPathway(pathway: AdmissionPathway) {
    setSelectedPathway(pathway);
  }

  return (
    <div className="min-h-screen bg-[#f2f8f4] text-[#2b2118] flex flex-col font-sans">
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
              Student Admission &amp; Education Continuity Centre
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              type="button"
              onClick={() => setDiagnosticsOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#d8e5dd] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#f2f8f4] transition cursor-pointer"
              title="Inspect Admission Portals & Single-Window Telemetry"
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
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#0d3e2e] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c] transition cursor-pointer"
              >
                Sign In
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
                <GraduationCap size={13} /> STUDENT RSO 2.0 · MODULE 06: ADMISSION &amp; CONTINUITY
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Find Your Path to Higher Education.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Official Tamil Nadu and national admission pathways, single-window counselling procedures, institutional transfers, break-of-study re-admission, and academic credit mobility from Class 10 to PhD scholars.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => handleTabChange('admission-guidance')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#0d3e2e] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap size={16} /> Explore Pathways
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('transfer-reentry')}
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-white/20 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Layers size={16} /> Transfer &amp; Re-entry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#d8e5dd]">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-sans text-[13px] font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'bg-white border border-[#d8e5dd] text-[#7a6a5a] hover:bg-[#f2f8f4] hover:text-[#2b2118]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0d3e2e]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <AdmissionsOverviewDashboard
              selectedStage={selectedStage}
              onSelectStage={(stg) => {
                setSelectedStage(stg);
                handleTabChange('admission-guidance');
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectPathway={handleSelectPathway}
              onNavigateTab={(t) => handleTabChange(t as AdmissionsNavTab)}
            />
          )}

          {activeTab === 'admission-guidance' && (
            <AdmissionGuidanceCatalogue
              onSelectPathway={handleSelectPathway}
              initialStage={selectedStage}
            />
          )}

          {activeTab === 'govt-portals' && <GovernmentPortalsSection />}

          {activeTab === 'transfer-reentry' && <TransferAndReentryCentre />}

          {activeTab === 'credit-mobility' && <CreditAndAcademicMobility />}

          {activeTab === 'required-documents' && <AdmissionDocumentsSection />}

          {activeTab === 'admission-deadlines' && <AdmissionDeadlineCalendar />}

          {activeTab === 'my-applications' && <AdmissionTrackerSection />}

          {activeTab === 'help-guidance' && (
            <div className="p-6 rounded-3xl bg-white border border-[#d8e5dd] space-y-6 text-xs sm:text-sm text-[#2b2118]">
              <div className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0d3e2e]">
                  Student Help, Grievance Resolution &amp; Official Department Directory
                </h2>
                <p className="text-xs text-[#7a6a5a]">
                  If you face admission blocks, withholding of Transfer Certificates, capitation fee demands, or
                  unlawful rejection of readmission, contact the authorized state statutory bodies directly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#f2f8f4] border border-[#d8e5dd] space-y-2 text-xs">
                  <span className="font-bold text-[#0d3e2e] block uppercase">
                    1. DIRECTORATE OF TECHNICAL EDUCATION (DOTE)
                  </span>
                  <p className="text-[#7a6a5a]">
                    For Engineering (TNEA) and Polytechnic diploma admission queries, certificates retention complaints, and lateral entry.
                  </p>
                  <p className="font-mono text-[#2b2118]">Phone: 044-22350525 / Email: dotehelpdesk@tn.gov.in</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f2f8f4] border border-[#d8e5dd] space-y-2 text-xs">
                  <span className="font-bold text-[#0d3e2e] block uppercase">
                    2. DIRECTORATE OF COLLEGIATE EDUCATION (DCE)
                  </span>
                  <p className="text-[#7a6a5a]">
                    For Government Arts &amp; Science colleges, private aided colleges, transfer permissions, and scholarship endorsement.
                  </p>
                  <p className="font-mono text-[#2b2118]">Phone: 044-24344844 / Email: tngasa2026@gmail.com</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f2f8f4] border border-[#d8e5dd] space-y-2 text-xs">
                  <span className="font-bold text-[#0d3e2e] block uppercase">
                    3. UGC E-SAMADHAAN STUDENT PORTAL
                  </span>
                  <p className="text-[#7a6a5a]">
                    Centralized grievance mechanism for university fee refunds, original document return, and readmission denial.
                  </p>
                  <p className="font-mono text-[#2b2118]">Portal: samadhaan.ugc.ac.in / Toll-Free: 1800-111-656</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f2f8f4] border border-[#d8e5dd] space-y-2 text-xs">
                  <span className="font-bold text-[#0d3e2e] block uppercase">
                    4. TAMIL NADU CM HELPLINE
                  </span>
                  <p className="text-[#7a6a5a]">
                    Direct state grievance redressal for any school or college education interruption.
                  </p>
                  <p className="font-mono text-[#2b2118]">Helpline: 1100 (Toll-Free, 24/7)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Responsible Education Continuity Disclaimer */}
        <div className="rounded-2xl border border-[#d8e5dd] bg-[#fdfbf6] p-4 text-xs text-[#7a6a5a] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#2b2118]">
            <ShieldCheck className="w-4 h-4 text-[#5e8b7e]" />
            <span>Statutory Non-Affiliation Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            Student RSO 2.0 is a non-commercial educational guidance platform. It does not conduct admissions, sell application forms, or charge fees. All admissions, counselling seat allotments, and transfers are conducted exclusively by authorized statutory bodies: DOTE, DME, DCE, Anna University, NTA, JoSAA, and state universities on their official .gov.in and .ac.in portals.
          </p>
        </div>
      </main>

      {/* Procedure Modal */}
      <AdmissionProcedureModal
        pathway={selectedPathway}
        isOpen={Boolean(selectedPathway)}
        onClose={() => setSelectedPathway(null)}
        onTrackApplication={() => {
          handleTabChange('my-applications');
        }}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />

      {/* Diagnostics Modal */}
      <AdmissionsDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f2f8f4] flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#0d3e2e] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg font-bold text-[#0d3e2e]">Loading Admission Centre...</p>
          </div>
        </div>
      }
    >
      <AdmissionsCentreContent />
    </Suspense>
  );
}
