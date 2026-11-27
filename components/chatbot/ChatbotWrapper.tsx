'use client';

import dynamic from 'next/dynamic';

const PlatformBrainChatbot = dynamic(
  () => import('./PlatformBrainChatbot').then((mod) => mod.PlatformBrainChatbot),
  { ssr: false }
);

export function ChatbotWrapper() {
  return <PlatformBrainChatbot />;
}
