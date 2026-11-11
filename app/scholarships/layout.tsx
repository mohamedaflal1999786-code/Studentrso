import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scholarship Hub — Tamil Nadu & Central Government Scholarships',
  description:
    'Discover verified Tamil Nadu State and Central NSP scholarships, check eligibility automatically, and track scholarship applications and renewals.',
  alternates: { canonical: 'https://www.studentrso.in/scholarships' },
};

export default function ScholarshipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
