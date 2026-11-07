// components/career-assistant/QuickActionsBar.tsx
'use client';

import {
  Sparkles,
  BookOpen,
  Compass,
  Layers,
  Award,
  GraduationCap,
  Calendar,
  FileText,
  Briefcase,
  Landmark,
  FileSearch,
  HelpCircle
} from 'lucide-react';
import { QuickActionPrompt } from '@/lib/ai/types';

export const QUICK_ACTIONS: QuickActionPrompt[] = [
  {
    id: 'ask-anything',
    title: 'Ask Anything',
    description: 'Ask any question across education, career, or general knowledge.',
    iconName: 'HelpCircle',
    prompt: 'I have a question about my studies and career. Can you guide me?',
    category: 'Explore',
  },
  {
    id: 'explain-topic',
    title: 'Explain a Topic',
    description: 'Teach any concept step-by-step with simple examples.',
    iconName: 'BookOpen',
    prompt: 'Explain artificial intelligence and machine learning in simple language with real-world examples.',
    category: 'Learn',
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    description: 'Explore verified pathways matching your subjects and interests.',
    iconName: 'Compass',
    prompt: 'What are the best career and higher education options available for my stream and marks?',
    category: 'Career',
  },
  {
    id: 'course-comparison',
    title: 'Course Comparison',
    description: 'Compare two degrees, diplomas, or competitive pathways side-by-side.',
    iconName: 'Layers',
    prompt: 'Explain the difference between BCA and B.Sc Computer Science in detail, including curriculum and career outcomes.',
    category: 'Explore',
  },
  {
    id: 'scholarship-guidance',
    title: 'Scholarship Guidance',
    description: 'Discover central and state government scholarships open to your level.',
    iconName: 'Award',
    prompt: 'What scholarships and fee waiver schemes are available in Tamil Nadu for my education level?',
    category: 'Admissions',
  },
  {
    id: 'entrance-exam-guidance',
    title: 'Entrance Exam Prep',
    description: 'Blueprints, negative marking, and syllabi for TNEA, NEET, JEE, CUET.',
    iconName: 'GraduationCap',
    prompt: 'How does TNEA admission work and how is the 200-mark engineering cut-off calculated?',
    category: 'Admissions',
  },
  {
    id: 'study-plan',
    title: 'Study Timetable',
    description: 'Build a realistic weekly revision schedule with milestone targets.',
    iconName: 'Calendar',
    prompt: 'Create a realistic 4-week study timetable for my upcoming examinations with daily revision slots.',
    category: 'Learn',
  },
  {
    id: 'resume-assistance',
    title: 'Resume Assistance',
    description: 'Prepare a professional, ATS-friendly student resume from scratch.',
    iconName: 'FileText',
    prompt: 'How do I prepare an impressive resume as a college student with no prior full-time work experience?',
    category: 'Career',
  },
  {
    id: 'internship-guidance',
    title: 'Internship Guidance',
    description: 'AICTE portals, NATS apprenticeships, and verified corporate internships.',
    iconName: 'Briefcase',
    prompt: 'How can I apply for official government apprenticeships (NATS 2.0) and technical internships?',
    category: 'Career',
  },
  {
    id: 'govt-job-guidance',
    title: 'Government Jobs',
    description: 'TNPSC, UPSC, SSC CGL, Banking, and Railways recruitment pathways.',
    iconName: 'Landmark',
    prompt: 'What government job examinations (TNPSC, SSC, Banking) can I write after completing my degree?',
    category: 'Career',
  },
  {
    id: 'research-assistant',
    title: 'Research & PhD',
    description: 'UGC NET/JRF guidelines, research proposals, and literature reviews.',
    iconName: 'Sparkles',
    prompt: 'What is the complete statutory process for pursuing a PhD in India under UGC regulations, and how does JRF funding work?',
    category: 'Learn',
  },
  {
    id: 'document-explainer',
    title: 'Document Explainer',
    description: 'Analyze an admission notification, brochure, or syllabus outline.',
    iconName: 'FileSearch',
    prompt: 'I want to analyze an educational notification. What are the key eligibility rules and deadlines?',
    category: 'Explore',
  },
];

interface QuickActionsBarProps {
  onSelectPrompt: (prompt: string) => void;
}

export function QuickActionsBar({ onSelectPrompt }: QuickActionsBarProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#8c2f39]" />;
      case 'Compass': return <Compass className="w-4 h-4 text-[#8c2f39]" />;
      case 'Layers': return <Layers className="w-4 h-4 text-[#8c2f39]" />;
      case 'Award': return <Award className="w-4 h-4 text-[#8c2f39]" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4 text-[#8c2f39]" />;
      case 'Calendar': return <Calendar className="w-4 h-4 text-[#8c2f39]" />;
      case 'FileText': return <FileText className="w-4 h-4 text-[#8c2f39]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#8c2f39]" />;
      case 'Landmark': return <Landmark className="w-4 h-4 text-[#8c2f39]" />;
      case 'FileSearch': return <FileSearch className="w-4 h-4 text-[#8c2f39]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#8c2f39]" />;
      default: return <HelpCircle className="w-4 h-4 text-[#8c2f39]" />;
    }
  };

  return (
    <div className="w-full">
      <div className="text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-2.5 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#8c2f39]" /> Suggested Quick Inquiries
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {QUICK_ACTIONS.slice(0, 8).map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelectPrompt(action.prompt)}
            className="p-3 rounded-xl bg-white border border-[#efe3cc] hover:border-[#8c2f39]/40 hover:bg-[#fbf5e9] text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-[#8c2f39]/10 flex items-center justify-center shrink-0">
                {getIcon(action.iconName)}
              </div>
              <span className="text-xs font-bold text-[#2b2118] group-hover:text-[#8c2f39] transition-colors truncate">
                {action.title}
              </span>
            </div>
            <p className="text-[11px] text-[#7a6a5a] line-clamp-2 leading-relaxed">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
