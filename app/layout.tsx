import './globals.css';
import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Student RSO — Rights, Services & Opportunities',
  description: 'A pathway hub helping Indian students discover scholarships, government exams, anti-ragging resources, and AI-guided career planning.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${inter.variable} ${newsreader.variable}`} style={{ fontFamily: 'var(--font-sans)' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
