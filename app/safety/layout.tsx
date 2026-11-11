import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety & Grievance System — Anti-Ragging, Helplines & Student Rights',
  description:
    'Access verified emergency helplines (112, 1800-180-5522 UGC Anti-Ragging, 1930 Cyber Crime), statutory authorities, and step-by-step grievance reporting guidance.',
  alternates: { canonical: 'https://www.studentrso.in/safety' },
};

export default function SafetyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
