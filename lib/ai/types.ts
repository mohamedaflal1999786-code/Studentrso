// lib/ai/types.ts
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  sources?: CitationSource[];
  isStreaming?: boolean;
}

export interface CitationSource {
  title: string;
  url: string;
  authority: string;
  verified: boolean;
}

export type EducationLevel =
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'Diploma / Polytechnic'
  | 'ITI'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'PhD / Research Scholar'
  | 'Graduate Job Seeker';

export interface StudentProfile {
  educationLevel?: EducationLevel;
  currentCourse?: string;
  streamOrSubject?: string;
  institutionType?: 'Government' | 'Government-Aided' | 'Private University' | 'Autonomous College' | 'Other';
  state?: string;
  careerInterests?: string[];
  skills?: string[];
  educationGoals?: string;
  preferredLearningStyle?: 'Step-by-step' | 'Visual & Examples' | 'Theoretical & Deep' | 'Practical & Hands-on';
  targetExams?: string[];
}

export type AnswerLengthPreference =
  | 'auto'
  | 'detailed'
  | 'brief'
  | 'one-sentence'
  | 'step-by-step'
  | 'beginner'
  | 'full-procedure'
  | 'comparison'
  | 'direct-only';

export type AIProviderId = 'auto' | 'gemini' | 'openai' | 'anthropic' | 'groq' | 'grounded-engine';

export interface AIProviderStatus {
  id: AIProviderId;
  name: string;
  isAvailable: boolean;
  model: string;
  description: string;
  envKeyRequired: string;
}

export interface ConversationSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  studentProfile?: StudentProfile;
  lengthPreference?: AnswerLengthPreference;
}

export interface QuickActionPrompt {
  id: string;
  title: string;
  description: string;
  iconName: string;
  prompt: string;
  category: 'Explore' | 'Learn' | 'Career' | 'Admissions';
}

// Model candidate hierarchy with automatic multi-model fallback across quota pools
export const MODEL_CANDIDATES = [
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
];
