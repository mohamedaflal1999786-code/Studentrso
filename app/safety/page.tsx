'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Landmark,
  ListTodo,
  Lock,
  Phone,
  PhoneCall,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import { SafetyCategory } from '@/lib/safety-data';
import { EmergencySupportPanel } from '@/components/safety/EmergencySupportPanel';
import { SafetyIssueCategories } from '@/components/safety/SafetyIssueCategories';
import { SafetyIssueDetailsModal } from '@/components/safety/SafetyIssueDetailsModal';
import { OfficialPortalsDirectory } from '@/components/safety/OfficialPortalsDirectory';
import { GuidedAuthorityFinder } from '@/components/safety/GuidedAuthorityFinder';
import { ReportingStepsGuide } from '@/components/safety/ReportingStepsGuide';
import { ComplaintChecklistSection } from '@/components/safety/ComplaintChecklistSection';
import { ComplaintReferenceTracker } from '@/components/safety/ComplaintReferenceTracker';
import { SafetyFaqsSection } from '@/components/safety/SafetyFaqsSection';
import { SafetyDiagnosticsModal } from '@/components/safety/SafetyDiagnosticsModal';

type SafetyTab =
  | 'overview'
  | 'categories'
  | 'portals'
  | 'finder'
  | 'steps'
  | 'checklist'
  | 'tracker'
  | 'faqs';

export default function SafetyHubPage() {
  const { user, profile: authProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<SafetyTab>('overview');

  // Modals
  const [selectedCategory, setSelectedCategory] = useState<SafetyCategory | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [diagnosticsModalOpen, setDiagnosticsModalOpen] = useState(false);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleSelectCategory = (cat: SafetyCategory) => {
    setSelectedCategory(cat);
    setDetailsModalOpen(true);
  };

  const primaryTabs: { id: SafetyTab; label: string; icon: any }[] = [
    { id: 'overview', label: '1. Emergency & Overview', icon: ShieldAlert },
    { id: 'categories', label: '2. Issue Categories (10)', icon: ShieldCheck },
    { id: 'portals', label: '3. Official Reporting Portals', icon: Landmark },
    { id: 'finder', label: '4. Guided Authority Finder', icon: Sparkles },
    { id: 'steps', label: '5. Reporting Steps Guide', icon: FileCheck2 },
    { id: 'checklist', label: '6. Preparation Checklist', icon: CheckCircle2 },
    { id: 'tracker', label: '7. Reference Tracker', icon: ListTodo },
    { id: 'faqs', label: '8. Rights FAQs', icon: HelpCircle },
  ];

  return (
    <main className="min-h-screen bg-[#fbf5e9] text-[#2b2118]">
      {/* Top Navbar */}
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
              Student Safety &amp; Grievance Support Centre
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              onClick={() => setDiagnosticsModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#fbf5e9] transition"
              title="Inspect Official Government Source Telemetry"
            >
              <Activity size={13} className="text-emerald-700" />
              <span>Diagnostics</span>
            </button>

            {user ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
                <User size={14} className="text-[#8c2f39]" />
                {authProfile?.full_name || user.email?.split('@')[0]}
              </span>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#8c2f39] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#6d1824]"
              >
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Strip */}
      <section className="border-b border-[#efe3cc] bg-[#8c2f39] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <Shield size={13} /> STUDENT RSO 2.0 · MODULE 02: SAFETY &amp; GRIEVANCE SYSTEM
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Know Your Rights. Find the Right Support.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Find the right official authority to report student problems, understand your rights, prepare a complaint
                and access genuine government support services across Tamil Nadu and Central authorities.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveTab('finder')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#8c2f39] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5"
              >
                <Sparkles size={16} /> Guided Authority Finder
              </button>
              <button
                onClick={() => setActiveTab('portals')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 flex items-center gap-1.5"
              >
                <Landmark size={15} /> Official Government Portals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#efe3cc] pb-2 scrollbar-none">
          {primaryTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition ${
                  isActive
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & EMERGENCY */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <EmergencySupportPanel />
            <div className="pt-2">
              <SafetyIssueCategories onSelectCategory={handleSelectCategory} />
            </div>
          </div>
        )}

        {/* TAB 2: 10 ISSUE CATEGORIES */}
        {activeTab === 'categories' && (
          <SafetyIssueCategories onSelectCategory={handleSelectCategory} />
        )}

        {/* TAB 3: OFFICIAL GOVERNMENT REPORTING DIRECTORY */}
        {activeTab === 'portals' && <OfficialPortalsDirectory />}

        {/* TAB 4: GUIDED AUTHORITY FINDER */}
        {activeTab === 'finder' && <GuidedAuthorityFinder />}

        {/* TAB 5: REPORTING STEPS GUIDE */}
        {activeTab === 'steps' && <ReportingStepsGuide />}

        {/* TAB 6: PREPARATION CHECKLIST */}
        {activeTab === 'checklist' && <ComplaintChecklistSection />}

        {/* TAB 7: REFERENCE TRACKER */}
        {activeTab === 'tracker' && <ComplaintReferenceTracker />}

        {/* TAB 8: RIGHTS FAQS */}
        {activeTab === 'faqs' && <SafetyFaqsSection />}
      </div>

      {/* Issue Details Modal */}
      <SafetyIssueDetailsModal
        category={selectedCategory}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onOpenChecklist={() => {
          setDetailsModalOpen(false);
          setActiveTab('checklist');
        }}
      />

      {/* Autonomous System Diagnostics Modal */}
      <SafetyDiagnosticsModal
        isOpen={diagnosticsModalOpen}
        onClose={() => setDiagnosticsModalOpen(false)}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-[#efe3cc] bg-[#fdfbf6] py-8 text-center text-[12px] text-[#7a6a5a]">
        <div className="mx-auto max-w-7xl px-4 space-y-1">
          <p className="font-semibold text-[#2b2118]">
            Student RSO 2.0 · Student Safety &amp; Grievance Support Centre
          </p>
          <p>
            Public digital infrastructure for educational rights and statutory authority guidance. Zero commercial intermediaries.
            Never collects passwords, OTPs, or medical narratives. For active emergencies, dial 112 immediately.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setDiagnosticsModalOpen(true)}
              className="font-mono text-[11px] text-[#8c2f39] hover:underline inline-flex items-center gap-1"
            >
              <Activity size={12} />
              <span>Official Government Source Audit &amp; Verification Telemetry</span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
