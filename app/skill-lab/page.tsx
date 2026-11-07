'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Activity,
  User,
  Search,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Filter,
  X,
  Compass,
  GraduationCap,
  Layers,
  Award,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import {
  SKILL_CATEGORIES,
  SkillCategory,
  PATHWAY_STAGES,
  TRUSTED_OFFICIAL_RESOURCES,
} from '@/lib/skill-lab-data';
import { SkillCategoryCard } from '@/components/skill-lab/SkillCategoryCard';
import { SkillCategoryDetailModal } from '@/components/skill-lab/SkillCategoryDetailModal';
import { DailyPracticeSection } from '@/components/skill-lab/DailyPracticeSection';
import { InteractivePracticeCentre } from '@/components/skill-lab/InteractivePracticeCentre';
import { LearningPathwaySection } from '@/components/skill-lab/LearningPathwaySection';
import { TrustedResourcesSection } from '@/components/skill-lab/TrustedResourcesSection';
import { SkillLabDiagnosticsModal } from '@/components/skill-lab/SkillLabDiagnosticsModal';

type Module09Tab =
  | 'categories'
  | 'daily-practice'
  | 'interactive-tools'
  | 'pathway'
  | 'resources'
  | 'progress';

function SkillLabContent() {
  const { user, profile: authProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Module09Tab>('categories');

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<number | 'all'>('all');

  // Modals state
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Auth Dialog state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Completed categories progress (persisted in localStorage)
  const [completedCategoryIds, setCompletedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('studentrso_skill_lab_progress');
        if (saved) {
          setCompletedCategoryIds(JSON.parse(saved));
        }
      } catch {
        // Fallback gracefully
      }
    }
  }, []);

  function handleToggleComplete(categoryId: string) {
    setCompletedCategoryIds((prev) => {
      const exists = prev.includes(categoryId);
      const next = exists ? prev.filter((id) => id !== categoryId) : [...prev, categoryId];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('studentrso_skill_lab_progress', JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  }

  function handleViewDetails(category: SkillCategory) {
    setSelectedCategory(category);
    setDetailModalOpen(true);
  }

  function handleStartLearning(category: SkillCategory) {
    setSelectedCategory(category);
    setDetailModalOpen(true);
  }

  function handleSelectCategoryById(categoryId: string) {
    const cat = SKILL_CATEGORIES.find((c) => c.id === categoryId);
    if (cat) {
      setSelectedCategory(cat);
      setDetailModalOpen(true);
    }
  }

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.filter((cat) => {
      const matchesSearch =
        searchQuery === '' ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.learningObjectives.some((obj) => obj.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStage =
        selectedStageFilter === 'all' || cat.stageNumber === selectedStageFilter;

      return matchesSearch && matchesStage;
    });
  }, [searchQuery, selectedStageFilter]);

  const navTabs = [
    { id: 'categories', label: `1. All Learning Categories (${SKILL_CATEGORIES.length})`, icon: <BookOpen size={15} /> },
    { id: 'daily-practice', label: '2. Daily 15-Min Workout', icon: <Sparkles size={15} /> },
    { id: 'interactive-tools', label: '3. Practice Centre & Tools', icon: <Compass size={15} /> },
    { id: 'pathway', label: '4. 8-Stage Pathway', icon: <Layers size={15} /> },
    { id: 'resources', label: `5. Trusted Resources (${TRUSTED_OFFICIAL_RESOURCES.length})`, icon: <GraduationCap size={15} /> },
    { id: 'progress', label: `6. My Progress (${completedCategoryIds.length}/8)`, icon: <Award size={15} /> },
  ];

  return (
    <main className="min-h-screen bg-[#fbf5e9] text-[#2b2118]">
      {/* 1. Top Navbar (Identical to Module 01) */}
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
              Language, Soft-Skills &amp; Confidence Lab
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              type="button"
              onClick={() => setDiagnosticsOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#fbf5e9] transition cursor-pointer"
              title="Inspect Module 09 Curriculum & Portal Telemetry"
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
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#8c2f39] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#6d1824] transition cursor-pointer"
              >
                Sign In to Sync
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Banner Strip (Identical to Module 01 Maroon Palette) */}
      <section className="border-b border-[#efe3cc] bg-[#8c2f39] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                <Sparkles size={13} /> STUDENT RSO 2.0 · MODULE 09: LANGUAGE, SOFT-SKILLS &amp; CONFIDENCE LAB
              </div>
              <h1 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Speak Clearly. Grow with Confidence.
              </h1>
              <p className="font-serif italic text-[16px] sm:text-[18px] text-[#f5cf7b]">
                Build your communication. Strengthen your confidence. Prepare for your future.
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-white/90">
                A comprehensive student development centre for English communication, professional behaviour, interpersonal skills, interview readiness, presentation techniques, and personal confidence building.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('daily-practice')}
                className="rounded-xl bg-white px-4 py-2.5 font-sans text-[13px] font-bold text-[#8c2f39] hover:bg-[#f6ede0] shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={16} /> Daily 15-Min Workout
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pathway')}
                className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-white/20 cursor-pointer flex items-center gap-1.5"
              >
                <Layers size={15} /> 8-Stage Career Pathway
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs (Identical to Module 01 tab scrollbar) */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto border-b border-[#efe3cc] pb-2 scrollbar-none">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as Module09Tab)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ALL LEARNING CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Search and Stage Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#fdfbf6] border border-[#efe3cc]">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
                <input
                  type="text"
                  placeholder="Search skills, interview questions, email guides, speaking tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#efe3cc] font-sans text-[13px] text-[#2b2118] bg-white focus:border-[#8c2f39] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a6a5a] hover:text-[#2b2118]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Stage Filter */}
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-[#8c2f39]" />
                <select
                  value={selectedStageFilter}
                  onChange={(e) =>
                    setSelectedStageFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                  }
                  className="px-3 py-2 rounded-lg border border-[#efe3cc] bg-white font-sans text-[13px] text-[#2b2118] focus:border-[#8c2f39] focus:outline-none cursor-pointer"
                >
                  <option value="all">All 8 Stages</option>
                  {PATHWAY_STAGES.map((s) => (
                    <option key={s.stageNumber} value={s.stageNumber}>
                      Stage {s.stageNumber}: {s.title.split('—')[1] || s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredCategories.map((cat) => (
                <SkillCategoryCard
                  key={cat.id}
                  category={cat}
                  isCompleted={completedCategoryIds.includes(cat.id)}
                  onViewDetails={handleViewDetails}
                  onStartLearning={handleStartLearning}
                />
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12 bg-[#fdfbf6] rounded-xl border border-[#efe3cc] space-y-2">
                <p className="font-serif text-[18px] font-bold text-[#2b2118]">
                  No matching skill modules found
                </p>
                <p className="font-sans text-[13px] text-[#7a6a5a]">
                  Try clearing your search query or selecting &ldquo;All 8 Stages&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStageFilter('all');
                  }}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#8c2f39] text-white font-sans text-[12px] font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DAILY PRACTICE WORKOUT */}
        {activeTab === 'daily-practice' && <DailyPracticeSection />}

        {/* TAB 3: INTERACTIVE PRACTICE TOOLS */}
        {activeTab === 'interactive-tools' && <InteractivePracticeCentre />}

        {/* TAB 4: 8-STAGE PATHWAY */}
        {activeTab === 'pathway' && (
          <LearningPathwaySection
            completedCategoryIds={completedCategoryIds}
            onSelectCategoryById={handleSelectCategoryById}
          />
        )}

        {/* TAB 5: TRUSTED OFFICIAL RESOURCES */}
        {activeTab === 'resources' && <TrustedResourcesSection />}

        {/* TAB 6: MY LEARNING PROGRESS */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#efe3cc]">
                <div>
                  <h2 className="font-serif text-[24px] font-bold text-[#2b2118]">
                    Your Personal Learning Progress
                  </h2>
                  <p className="font-sans text-[13px] text-[#7a6a5a]">
                    Track your journey across all 8 skill lab modules. Progress is safely saved locally on your device.
                  </p>
                </div>
                <div className="font-mono text-[14px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  {completedCategoryIds.length} of 8 Modules Completed ({Math.round((completedCategoryIds.length / 8) * 100)}%)
                </div>
              </div>

              {/* Progress Checklist Table */}
              <div className="space-y-3">
                {SKILL_CATEGORIES.map((cat) => {
                  const done = completedCategoryIds.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                        done ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-[#efe3cc]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleComplete(cat.id)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition cursor-pointer ${
                            done ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-[#d8c7ad] bg-white'
                          }`}
                        >
                          {done && <CheckCircle2 size={16} />}
                        </button>
                        <div>
                          <span className="font-sans text-[14px] font-bold text-[#2b2118] block">
                            {cat.number}. {cat.title}
                          </span>
                          <span className="font-sans text-[12px] text-[#7a6a5a]">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleViewDetails(cat)}
                        className="px-3 py-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] text-[#8c2f39] font-sans text-[12px] font-bold hover:bg-[#f6ede0] transition cursor-pointer"
                      >
                        {done ? 'Review' : 'Open Lesson'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer */}
      <footer className="border-t border-[#efe3cc] bg-[#fdfbf6] py-8 px-4 text-center font-sans text-[12px] text-[#7a6a5a] mt-16">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-[#2b2118]">
            Student RSO 2.0 · Module 09: Language, Soft-Skills &amp; Confidence Lab
          </p>
          <p>
            Public digital infrastructure for learner development across Tamil Nadu. All circulars and courses reference authorized public platforms (Naan Mudhalvan, NCS, SWAYAM Plus).
          </p>
        </div>
      </footer>

      {/* 5. Modals & Dialogs */}
      <SkillCategoryDetailModal
        category={selectedCategory}
        isOpen={detailModalOpen}
        isCompleted={Boolean(selectedCategory && completedCategoryIds.includes(selectedCategory.id))}
        onClose={() => setDetailModalOpen(false)}
        onToggleComplete={handleToggleComplete}
      />

      <SkillLabDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />

      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />
    </main>
  );
}

export default function SkillLabPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf5e9] flex items-center justify-center text-[#2b2118] font-sans">
          Loading Language, Soft-Skills &amp; Confidence Lab...
        </div>
      }
    >
      <SkillLabContent />
    </Suspense>
  );
}
