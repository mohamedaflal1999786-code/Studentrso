'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * UrlMasker
 * Automatically masks the browser address bar to root ("/") so the visitor
 * sees clean domain "studentrso.in" at all times across all modules and subpages.
 * Exempts active authentication callback exchange to allow OAuth code handling.
 */
export function UrlMasker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Do not interfere with OAuth callback query params during code exchange
    if (window.location.pathname.startsWith('/auth/callback')) {
      return;
    }

    // Mask address bar to '/' (displays as studentrso.in in browser)
    if (window.location.pathname !== '/') {
      try {
        window.history.replaceState(window.history.state, '', '/');
      } catch {
        // Safe fallback
      }
    }
  }, [pathname]);

  return null;
}
