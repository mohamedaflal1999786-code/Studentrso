'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Activity,
  User,
  Search,
  Sparkles,
  Shield,
  ShieldAlert,
  PhoneCall,
  CheckSquare,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Lock,
  Layers,
  Award,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import {
  SAFETY_FEATURES,
  SafetyFeature,
  OFFICIAL_CYBER_RESOURCES,
} from '@/lib/digital-safety-data';
import { SafetyFeatureCard } from '@/components/digital-safety/SafetyFeatureCard';
import { SafetyFeatureDetailModal } from '@/components/digital-safety/SafetyFeatureDetailModal';
import { CyberScamQuizSection } from '@/components/digital-safety/CyberScamQuizSection';
import { CyberSafetyChecklistSection } from '@/components/digital-safety/CyberSafetyChecklistSection';
import { PrivacySelfAssessmentSection } from '@/components/digital-safety/PrivacySelfAssessmentSection';
import { EmergencyActionGuideSection } from '@/components/digital-safety/EmergencyActionGuideSection';
import { CyberResourcesDirectorySection } from '@/components/digital-safety/CyberResourcesDirectorySection';
import { AdditionalGuidanceSection } from '@/components/digital-safety/AdditionalGuidanceSection';
import { DigitalSafetyDiagnosticsModal } from '@/components/digital-safety/DigitalSafetyDiagnosticsModal';

type Module10Tab =
  | 'features'
  | 'emergency'
  | 'quiz'
  | 'checklist'
  | 'privacy'
  | 'portals'
  | 'guides';

function DigitalSafetyContent() {
  const { user, profile: authProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Module10Tab>('features');

  // Search and Risk Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'all' | 'Critical' | 'High' | 'Important'>('all');

  // Modals state
  const [selectedFeature, setSelectedFeature] = useState<SafetyFeature | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Auth Dialog state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  function handleViewDetails(feature: SafetyFeature) {
    setSelectedFeature(feature);
    setDetailModalOpen(true);
  }

  // Filtered safety features
  const filteredFeatures = useMemo(() => {
    return SAFETY_FEATURES.filter((feat) => {
      const matchesSearch =
        searchQuery === '' ||
        feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.threatsCovered.some((th) => th.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRisk =
        selectedRiskFilter === 'all' || feat.riskSeverity === selectedRiskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, selectedRiskFilter]);

  const navTabs = [
    { id: 'features', label: `1. All Directives (${SAFETY_FEATURES.length})`, icon: <Shield size={15} /> },
    { id: 'emergency', label: '2. Emergency 1930 & Actions', icon: <PhoneCall size={15} /> },
    { id: 'quiz', label: '3. Scam Awareness Quiz (10)', icon: <HelpCircle size={15} /> },
    { id: 'checklist', label: '4. Safety Checklist (10)', icon: <CheckSquare size={15} /> },
    { id: 'privacy', label: '5. Privacy Self-Assessment', icon: <Lock size={15} /> },
    { id: 'portals', label: `6. Official Govt Portals (${OFFICIAL_CYBER_RESOURCES.length})`, icon: <ExternalLink size={15} /> },
    { id: 'guides', label: '7. Cyber-Wellness Guides (5)', icon: <BookOpen size={15} /> },
  ];

  return (
    <main className="min-h-screen bg-[#f2f8f4] text-[#2b2118]">
      {/* 1. Top Navbar (Identical to Module 01 & 09) */}
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
              Digital Safety &amp; Cyber-Wellness Shield
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              type="button"
              onClick={() => setDiagnosticsOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#d8e5dd] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#f2f8f4] transition cursor-pointer"
              title="Inspect Module 10 Cyber Defense & Telemetry"
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
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Banner Strip (Identical to Module 01 Maroon Palette) */}
      <section className="border-b border-[#d8e5dd] bg-[#0d3e2e] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <Shield size={13} /> STUDENT RSO 2.0 · MODULE 10: DIGITAL SAFETY &amp; CYBER-WELLNESS SHIELD
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Stay Safe. Stay Smart Online.
              </h1>
              <p className="font-serif italic text-[16px] sm:text-[18px] text-[#f5cf7b]">
                Online safety, cyberbullying safeguards &amp; digital privacy.
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                A student-centered cyber defense platform providing actionable protection against online harassment, social media identity impersonation, financial fraud (Helpline 1930), device vulnerabilities, and malicious scams.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="tel:1930"
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-rose-800 hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5 cursor-pointer"
                title="Immediate Cyber Financial Fraud Helpline"
              >
                <PhoneCall size={16} /> Call 1930 Helpline
              </a>
              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle size={15} /> Scam Awareness Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs (Identical to Module 01 tab scrollbar) */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#d8e5dd] pb-2 scrollbar-none">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as Module10Tab)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ALL SAFETY DIRECTIVES */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            {/* Search and Risk Severity Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#fdfbf6] border border-[#d8e5dd]">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
                <input
                  type="text"
                  placeholder="Search directives, UPI fraud, impersonation, bullying, malware, deepfakes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#d8e5dd] font-sans text-[13px] text-[#2b2118] bg-white focus:border-[#0d3e2e] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a6a5a] hover:text-[#0d3e2e] text-xs font-mono"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#7a6a5a] uppercase font-bold shrink-0">
                  Risk Level:
                </span>
                <select
                  value={selectedRiskFilter}
                  onChange={(e) => setSelectedRiskFilter(e.target.value as any)}
                  className="rounded-lg border border-[#d8e5dd] bg-white px-3 py-2 font-sans text-[12px] text-[#2b2118] focus:border-[#0d3e2e] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Severity Levels</option>
                  <option value="Critical">Critical Risk Only</option>
                  <option value="High">High Risk Only</option>
                  <option value="Important">Important Risk Only</option>
                </select>
              </div>
            </div>

            {/* Directives Cards Grid (The 6 Primary Feature Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature) => (
                <SafetyFeatureCard
                  key={feature.id}
                  feature={feature}
                  onViewDetails={handleViewDetails}
                  onQuickAction={handleViewDetails}
                />
              ))}
            </div>

            {filteredFeatures.length === 0 && (
              <div className="text-center py-12 rounded-2xl border border-dashed border-[#d8e5dd] bg-white/50">
                <p className="font-serif text-[18px] text-[#7a6a5a]">
                  No safety directives match your search query.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRiskFilter('all');
                  }}
                  className="mt-3 rounded-lg bg-[#0d3e2e] px-4 py-2 font-sans text-[12px] font-bold text-white hover:bg-[#08261c] transition cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EMERGENCY 1930 & ACTIONS */}
        {activeTab === 'emergency' && <EmergencyActionGuideSection />}

        {/* TAB 3: SCAM AWARENESS QUIZ */}
        {activeTab === 'quiz' && <CyberScamQuizSection />}

        {/* TAB 4: SAFETY CHECKLIST */}
        {activeTab === 'checklist' && <CyberSafetyChecklistSection />}

        {/* TAB 5: PRIVACY SELF-ASSESSMENT */}
        {activeTab === 'privacy' && <PrivacySelfAssessmentSection />}

        {/* TAB 6: OFFICIAL GOVT PORTALS */}
        {activeTab === 'portals' && <CyberResourcesDirectorySection />}

        {/* TAB 7: CYBER-WELLNESS GUIDES */}
        {activeTab === 'guides' && <AdditionalGuidanceSection />}
      </div>

      {/* Detail Modal */}
      <SafetyFeatureDetailModal
        feature={selectedFeature}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />

      {/* Diagnostics Modal */}
      <DigitalSafetyDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />
    </main>
  );
}

export default function DigitalSafetyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f2f8f4] flex items-center justify-center font-sans text-[14px] text-[#7a6a5a]">
          Loading Digital Safety &amp; Cyber-Wellness Shield...
        </div>
      }
    >
      <DigitalSafetyContent />
    </Suspense>
  );
}
