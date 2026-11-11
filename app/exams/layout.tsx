import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exams & Opportunity Hub — TNPSC, UPSC, SSC, JEE, NEET & Entrance Exams',
  description:
    'Explore verified Indian competitive examinations, national entrance tests, admission counselling portals, exam calendars, and course-wise eligibility tools.',
  alternates: { canonical: 'https://www.studentrso.in/exams' },
};

export default function ExamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
