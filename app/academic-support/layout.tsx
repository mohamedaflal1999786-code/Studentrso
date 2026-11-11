import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Support & Learning Centre — Study Toolkits & Free Resources',
  description:
    'Access verified SWAYAM, NPTEL, DIKSHA, NCERT, NDLI resources, remedial learning roadmaps, assignment guidance, and exam preparation toolkits.',
  alternates: { canonical: 'https://www.studentrso.in/academic-support' },
};

export default function AcademicSupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
