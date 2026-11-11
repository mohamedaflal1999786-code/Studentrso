import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Career Assistant — Class 10 to PhD Education & Career Guidance',
  description:
    'Get interactive multi-factor academic, course, scholarship, and career pathway guidance tailored for Indian school, college, and postgraduate students.',
  alternates: { canonical: 'https://www.studentrso.in/career-assistant' },
};

export default function CareerAssistantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
