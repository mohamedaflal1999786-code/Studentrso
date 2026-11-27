import './globals.css';
import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import Script from 'next/script';
import { AuthProvider } from '@/lib/auth-context';
import { ChatbotWrapper } from '@/components/chatbot/ChatbotWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.studentrso.in'),
  title: {
    default: 'Student RSO — Rights, Services & Opportunities',
    template: '%s | Student RSO',
  },
  description:
    'A pathway hub helping Indian students discover scholarships, government exams, anti-ragging resources, and AI-guided career planning.',
  alternates: {
    canonical: 'https://www.studentrso.in/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.studentrso.in/',
    siteName: 'Student RSO',
    title: 'Student RSO — Rights, Services & Opportunities',
    description:
      'Discover verified scholarships, student safety resources, e-Sevai certificates, competitive exams, internships, and AI career guidance.',
    images: [
      {
        url: '/images/student-rso-logo.png',
        width: 1024,
        height: 809,
        alt: 'Student RSO Emblem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student RSO — Rights, Services & Opportunities',
    description:
      'Official pathway hub for scholarships, student safety, certificates, competitive exams, internships, and AI career guidance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    shortcut: '/favicon.png',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.studentrso.in/#website',
      url: 'https://www.studentrso.in',
      name: 'Student RSO',
      description:
        'Student-centered digital ecosystem offering verified scholarships, safety reporting, certificate verification, exam alerts, AI career guidance, admissions, and skill development.',
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.studentrso.in/#organization',
      name: 'Student RSO',
      url: 'https://www.studentrso.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.studentrso.in/favicon.png',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="google-adsense-account" content="ca-pub-3381210415508925" />
        <link rel="preload" as="image" href="/images/student-rso-emblem.jpg" fetchPriority="high" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3381210415508925"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} ${newsreader.variable}`} style={{ fontFamily: 'var(--font-sans)' }}>
        <AuthProvider>
          {children}
          <ChatbotWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
