import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Dashboard',
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
