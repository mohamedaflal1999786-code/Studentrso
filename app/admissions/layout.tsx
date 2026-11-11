import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Admission & Education Continuity — Counselling & Transfers',
  description:
    'Single-window admission counselling guides (TNEA, JoSAA, NEET, CUET), college/branch transfers, NEP ABC credit mobility, and break-of-study re-entry rules.',
  alternates: { canonical: 'https://www.studentrso.in/admissions' },
};

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
