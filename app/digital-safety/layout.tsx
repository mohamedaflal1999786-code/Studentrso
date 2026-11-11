import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Safety & Cyber-Wellness Shield — Privacy & 1930 Cyber Help',
  description:
    'Protect student digital privacy, recognize scams and loan/job frauds, practice cyber safety checklists, and access 1930 National Cyber Crime Helpline.',
  alternates: { canonical: 'https://www.studentrso.in/digital-safety' },
};

export default function DigitalSafetyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
