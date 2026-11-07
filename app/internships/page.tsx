'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Building,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Sparkles,
  Bookmark,
  ShieldAlert,
  Search,
  ExternalLink,
  ShieldCheck,
  User
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import {
  VERIFIED_OPPORTUNITIES,
  OpportunityListing,
  SavedApplicationRecord,
  ApplicationStage
} from '@/lib/internship-data';

import { OpportunityDetailModal } from '@/components/internships/OpportunityDetailModal';
import { InternshipOverviewDashboard } from '@/components/internships/InternshipOverviewDashboard';
import { GovernmentInternshipsSection } from '@/components/internships/GovernmentInternshipsSection';
import { PrivateInternshipsSection } from '@/components/internships/PrivateInternshipsSection';
import { ApprenticeshipSection } from '@/components/internships/ApprenticeshipSection';
import { SkillDevelopmentSection } from '@/components/internships/SkillDevelopmentSection';
import { EmploymentExchangeSection } from '@/components/internships/EmploymentExchangeSection';
import { GovernmentJobsSection } from '@/components/internships/GovernmentJobsSection';
import { PrivateJobsSection } from '@/components/internships/PrivateJobsSection';
import { MyOpportunitiesSection } from '@/components/internships/MyOpportunitiesSection';
import { CareerResourcesSection } from '@/components/internships/CareerResourcesSection';

const STORAGE_KEY_SAVED_OPPORTUNITIES = 'student_rso_saved_opportunities_v1';

type TabId =
  | 'overview'
  | 'government-internships'
  | 'private-internships'
  | 'apprenticeships'
  | 'skill-development'
  | 'employment-exchange'
  | 'government-jobs'
  | 'private-jobs'
  | 'my-applications'
  | 'career-resources';

function InternshipPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabId) || 'overview';

  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityListing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // User Auth & Dialog
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Tracked Applications state
  const [trackedRecords, setTrackedRecords] = useState<SavedApplicationRecord[]>([]);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED_OPPORTUNITIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTrackedRecords(parsed);
        }
      }
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  // Sync to LocalStorage & Backend API
  const saveRecords = (newRecords: SavedApplicationRecord[]) => {
    setTrackedRecords(newRecords);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_OPPORTUNITIES, JSON.stringify(newRecords));
    } catch {
      // Ignore storage quota
    }
  };

  const savedIds = new Set(trackedRecords.map((r) => r.opportunityId));

  const handleSelectOpportunity = (opp: OpportunityListing) => {
    setSelectedOpportunity(opp);
    setModalOpen(true);
  };

  const handleToggleSaveOpportunity = (opp: OpportunityListing) => {
    if (savedIds.has(opp.id)) {
      const updated = trackedRecords.filter((r) => r.opportunityId !== opp.id);
      saveRecords(updated);
    } else {
      const newRec: SavedApplicationRecord = {
        id: `app-${Date.now()}`,
        opportunityId: opp.id,
        opportunityTitle: opp.title,
        organisation: opp.organisation,
        category: opp.category,
        stage: 'Saved',
        deadline: opp.applicationClosingDate,
        officialPortalUrl: opp.officialApplicationUrl,
        updatedAt: new Date().toISOString(),
      };
      saveRecords([newRec, ...trackedRecords]);
    }
  };

  const handleUpdateStage = (
    id: string,
    stage: ApplicationStage,
    refNo?: string,
    interviewDate?: string,
    notes?: string
  ) => {
    const updated = trackedRecords.map((rec) => {
      if (rec.id === id) {
        return {
          ...rec,
          stage,
          referenceNumber: refNo !== undefined ? refNo : rec.referenceNumber,
          interviewDate: interviewDate !== undefined ? interviewDate : rec.interviewDate,
          notes: notes !== undefined ? notes : rec.notes,
          updatedAt: new Date().toISOString(),
        };
      }
      return rec;
    });
    saveRecords(updated);
  };

  const handleRemoveTracked = (id: string) => {
    const updated = trackedRecords.filter((r) => r.id !== id);
    saveRecords(updated);
  };

  const handleOpenOfficialUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'overview', label: '1. Overview', icon: <Search size={15} /> },
    { id: 'government-internships', label: '2. Government Internships', icon: <Building size={15} /> },
    { id: 'private-internships', label: '3. Private Internships', icon: <Briefcase size={15} /> },
    { id: 'apprenticeships', label: '4. Apprenticeships (NATS/NAPS)', icon: <GraduationCap size={15} /> },
    { id: 'skill-development', label: '5. Skill Development', icon: <Award size={15} /> },
    { id: 'employment-exchange', label: '6. TN Employment Exchange', icon: <Layers size={15} /> },
    { id: 'government-jobs', label: '7. Government Jobs', icon: <Sparkles size={15} /> },
    { id: 'private-jobs', label: '8. Private Company Jobs', icon: <Briefcase size={15} /> },
    { id: 'my-applications', label: '9. My Applications', icon: <Bookmark size={15} />, badge: trackedRecords.length },
    { id: 'career-resources', label: '10. Career Resources', icon: <ShieldAlert size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fbf5e9] text-[#2b2118]">
      {/* Top Sticky Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#efe3cc] bg-[#fdfbf6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#8c2f39] hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Student RSO</span>
            </Link>
            <span className="text-[#efe3cc]">|</span>
            <span className="font-serif text-[17px] font-bold text-[#2b2118] hidden sm:inline">
              Internship, Skill &amp; Employment Exchange
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>LIVE • ZERO-FEE VERIFIED</span>
            </span>

            {user ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
                <User size={14} className="text-[#8c2f39]" />
                {user.email?.split('@')[0]}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#8c2f39] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#6d1824] transition-colors"
              >
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Strip (Shared Student RSO Maroon Theme) */}
      <section className="border-b border-[#efe3cc] bg-[#8c2f39] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <Briefcase size={13} /> STUDENT RSO 2.0 · MODULE 08: INTERNSHIP, SKILL &amp; EMPLOYMENT EXCHANGE
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Turn Your Skills into Opportunities.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Discover verified internships, apprenticeships (NATS/NAPS), Naan Mudhalvan skill initiatives, and TN Employment Exchange registration without commercial broker fees or fraud.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveTab('government-internships')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#8c2f39] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Building size={16} /> Government Internships
              </button>
              <button
                onClick={() => setActiveTab('employment-exchange')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                TN Employment Exchange
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Horizontal Category Navigation Tabs Bar */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#efe3cc] pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && Boolean(tab.badge) && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#efe3cc] text-[#2b2118]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        {activeTab === 'overview' && (
          <InternshipOverviewDashboard
            opportunities={VERIFIED_OPPORTUNITIES}
            onSelectOpportunity={handleSelectOpportunity}
            onNavigateTab={(tab) => setActiveTab(tab as TabId)}
            onSaveOpportunity={handleToggleSaveOpportunity}
            savedIds={savedIds}
            onApplyOfficial={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'government-internships' && (
          <GovernmentInternshipsSection
            opportunities={VERIFIED_OPPORTUNITIES}
            onSelectOpportunity={handleSelectOpportunity}
            onSaveOpportunity={handleToggleSaveOpportunity}
            savedIds={savedIds}
            onApplyOfficial={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'private-internships' && (
          <PrivateInternshipsSection
            opportunities={VERIFIED_OPPORTUNITIES}
            onSelectOpportunity={handleSelectOpportunity}
            onSaveOpportunity={handleToggleSaveOpportunity}
            savedIds={savedIds}
            onApplyOfficial={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'apprenticeships' && (
          <ApprenticeshipSection
            opportunities={VERIFIED_OPPORTUNITIES}
            onSelectOpportunity={handleSelectOpportunity}
            onSaveOpportunity={handleToggleSaveOpportunity}
            savedIds={savedIds}
            onApplyOfficial={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'skill-development' && <SkillDevelopmentSection />}

        {activeTab === 'employment-exchange' && <EmploymentExchangeSection />}

        {activeTab === 'government-jobs' && (
          <GovernmentJobsSection
            opportunities={VERIFIED_OPPORTUNITIES}
            onSelectOpportunity={handleSelectOpportunity}
            onSaveOpportunity={handleToggleSaveOpportunity}
            savedIds={savedIds}
            onApplyOfficial={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'private-jobs' && (
          <PrivateJobsSection
            opportunities={VERIFIED_OPPORTUNITIES}
            onSelectOpportunity={handleSelectOpportunity}
            onSaveOpportunity={handleToggleSaveOpportunity}
            savedIds={savedIds}
            onApplyOfficial={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'my-applications' && (
          <MyOpportunitiesSection
            trackedRecords={trackedRecords}
            onUpdateStage={handleUpdateStage}
            onRemoveRecord={handleRemoveTracked}
            onOpenOfficialUrl={handleOpenOfficialUrl}
          />
        )}

        {activeTab === 'career-resources' && <CareerResourcesSection />}
      </div>

      {/* Opportunity Detail Modal */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleToggleSaveOpportunity}
        isSaved={selectedOpportunity ? savedIds.has(selectedOpportunity.id) : false}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}

export default function InternshipModulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf5e9] flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#8c2f39] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg font-bold text-[#8c2f39]">
              Loading Internship, Skill &amp; Employment Exchange...
            </p>
          </div>
        </div>
      }
    >
      <InternshipPageContent />
    </Suspense>
  );
}
