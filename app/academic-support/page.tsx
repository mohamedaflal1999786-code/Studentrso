// app/academic-support/page.tsx
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
  HelpCircle,
  Sparkles,
  User,
  BookOpen,
  Target,
  Laptop,
  MessageSquare,
  Accessibility,
  Activity
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import { AcademicSupportDiagnosticsModal } from '@/components/academic-support/AcademicSupportDiagnosticsModal';
import {
  EducationStage,
  VerifiedLearningResource,
  VERIFIED_LEARNING_RESOURCES
} from '@/lib/academic-data';

// Component Sections
import { AcademicOverviewDashboard } from '@/components/academic-support/AcademicOverviewDashboard';
import { AcademicDifficultiesSection } from '@/components/academic-support/AcademicDifficultiesSection';
import { SubjectWiseLearningSection } from '@/components/academic-support/SubjectWiseLearningSection';
import { FreeLearningResourcesSection } from '@/components/academic-support/FreeLearningResourcesSection';
import { ExamPreparationSection } from '@/components/academic-support/ExamPreparationSection';
import { StudySkillsSection } from '@/components/academic-support/StudySkillsSection';
import { RemedialLearningSection } from '@/components/academic-support/RemedialLearningSection';
import { DigitalSkillsSection } from '@/components/academic-support/DigitalSkillsSection';
import { LanguageDevelopmentSection } from '@/components/academic-support/LanguageDevelopmentSection';
import { AccessibilitySupportSection } from '@/components/academic-support/AccessibilitySupportSection';
import { AssignmentResearchSection } from '@/components/academic-support/AssignmentResearchSection';
import { ResourceDetailModal } from '@/components/academic-support/ResourceDetailModal';

export type AcademicNavTab =
  | 'overview'
  | 'academic-difficulties'
  | 'subject-learning'
  | 'free-resources'
  | 'exam-prep'
  | 'study-skills'
  | 'remedial-learning'
  | 'digital-skills'
  | 'language-skills'
  | 'accessibility'
  | 'assignment-research';

const NAV_TABS: { id: AcademicNavTab; label: string; icon: any }[] = [
  { id: 'overview', label: '1. Overview', icon: Compass },
  { id: 'academic-difficulties', label: '2. Difficulties & Solutions', icon: Target },
  { id: 'subject-learning', label: '3. Subject-wise Learning', icon: BookOpen },
  { id: 'free-resources', label: '4. Free Learning Resources', icon: ShieldCheck },
  { id: 'exam-prep', label: '5. Exam Preparation', icon: Award },
  { id: 'study-skills', label: '6. Study Skills', icon: Brain },
  { id: 'remedial-learning', label: '7. Remedial Learning', icon: Layers },
  { id: 'digital-skills', label: '8. Digital Skills', icon: Laptop },
  { id: 'language-skills', label: '9. Language & Communication', icon: MessageSquare },
  { id: 'accessibility', label: '10. Accessibility & Support', icon: Accessibility },
  { id: 'assignment-research', label: '11. Assignment & Research', icon: FileText },
];

function AcademicSupportContent() {
  const { user, profile: authProfile } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = (searchParams.get('tab') as AcademicNavTab) || 'overview';

  const [activeTab, setActiveTab] = useState<AcademicNavTab>(tabParam);
  const [selectedStage, setSelectedStage] = useState<EducationStage>('All Stages');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<VerifiedLearningResource | null>(null);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (tabParam && NAV_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  function handleTabChange(tab: AcademicNavTab) {
    setActiveTab(tab);
    router.push(`/academic-support?tab=${tab}`, { scroll: false });
  }

  return (
    <div className="min-h-screen bg-[#fbf5e9] text-[#2b2118] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#efe3cc] bg-[#fdfbf6]/95 backdrop-blur-md">
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
              Academic Support &amp; Learning Centre
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              type="button"
              onClick={() => setDiagnosticsOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#fbf5e9] transition cursor-pointer"
              title="Inspect Academic Support & Curriculum Health"
            >
              <Activity size={13} className="text-emerald-700" />
              <span>Diagnostics</span>
            </button>

            {user ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
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
      <section className="border-b border-[#efe3cc] bg-[#0d3e2e] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <BookOpen size={13} /> STUDENT RSO 2.0 · MODULE 07: ACADEMIC SUPPORT &amp; LEARNING CENTRE
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Learn Better. Achieve More.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                Your academic success matters. Find trusted learning resources, academic guidance, study support and practical solutions to overcome educational challenges across Tamil Nadu and national platforms.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => handleTabChange('free-resources')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#0d3e2e] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen size={16} /> Find Learning Resources
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('academic-difficulties')}
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-white/20 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Target size={16} /> Solve Academic Difficulties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#efe3cc]">
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
                    : 'bg-white border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#fbf5e9] hover:text-[#2b2118]'
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
            <AcademicOverviewDashboard
              selectedStage={selectedStage}
              onSelectStage={(stg) => setSelectedStage(stg)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigateTab={(t) => handleTabChange(t as AcademicNavTab)}
              onSelectResource={setSelectedResource}
            />
          )}

          {activeTab === 'academic-difficulties' && <AcademicDifficultiesSection />}

          {activeTab === 'subject-learning' && <SubjectWiseLearningSection />}

          {activeTab === 'free-resources' && (
            <FreeLearningResourcesSection onSelectResource={setSelectedResource} />
          )}

          {activeTab === 'exam-prep' && <ExamPreparationSection />}

          {activeTab === 'study-skills' && <StudySkillsSection />}

          {activeTab === 'remedial-learning' && <RemedialLearningSection />}

          {activeTab === 'digital-skills' && <DigitalSkillsSection />}

          {activeTab === 'language-skills' && <LanguageDevelopmentSection />}

          {activeTab === 'accessibility' && <AccessibilitySupportSection />}

          {activeTab === 'assignment-research' && <AssignmentResearchSection />}
        </div>

        {/* Statutory Non-Affiliation Disclaimer */}
        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-xs text-[#7a6a5a] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#2b2118]">
            <ShieldCheck className="w-4 h-4 text-[#5e8b7e]" />
            <span>Academic Integrity &amp; Official Resource Notice</span>
          </div>
          <p className="leading-relaxed">
            Student RSO 2.0 does not sell copyrighted textbooks, charge subscription fees for government courses, or write assignments for students. All learning resources link directly to authorized official government and institutional repositories: SWAYAM, NPTEL, DIKSHA, NCERT, SCERT Tamil Nadu, IITs, and Central/State Universities.
          </p>
        </div>
      </main>

      {/* Resource Detail Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        isOpen={Boolean(selectedResource)}
        onClose={() => setSelectedResource(null)}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />

      {/* Diagnostics Modal */}
      <AcademicSupportDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />
    </div>
  );
}

export default function AcademicSupportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf5e9] flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#0d3e2e] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg font-bold text-[#0d3e2e]">Loading Academic Support Centre...</p>
          </div>
        </div>
      }
    >
      <AcademicSupportContent />
    </Suspense>
  );
}
