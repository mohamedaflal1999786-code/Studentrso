import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship, Skill & Employment Exchange — NATS, NCS & Govt Jobs',
  description:
    'Find AICTE internships, PM Internship Scheme, NATS apprenticeships, TN Velaivaaippu, NCS portals, and verified skill development programmes.',
  alternates: { canonical: 'https://www.studentrso.in/internships' },
};

export default function InternshipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
