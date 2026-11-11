import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificate & Document Service — e-Sevai, Community & DigiLocker Guide',
  description:
    'Find required student documents, Tamil Nadu e-District & e-Sevai application workflows, validity rules, document readiness checks, and DigiLocker guides.',
  alternates: { canonical: 'https://www.studentrso.in/certificates' },
};

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
