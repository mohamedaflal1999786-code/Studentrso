import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signing In',
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
