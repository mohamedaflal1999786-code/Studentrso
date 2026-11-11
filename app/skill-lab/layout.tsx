import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language, Soft-Skills & Confidence Lab — Communication & Interviews',
  description:
    'Build English fluency, presentation confidence, interview skills, and workplace readiness with structured daily practice and Naan Mudhalvan resources.',
  alternates: { canonical: 'https://www.studentrso.in/skill-lab' },
};

export default function SkillLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
