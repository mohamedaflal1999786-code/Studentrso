import { createClient, SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

export function getSupabaseEnv() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    '';
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';

  const isConfigured = Boolean(
    url &&
    anonKey &&
    !url.includes('your_supabase_project_url') &&
    !anonKey.includes('your_supabase_anon_key')
  );

  return {
    url,
    anonKey,
    serviceKey: serviceKey && !serviceKey.includes('your_') ? serviceKey : anonKey,
    isConfigured,
  };
}

/**
 * Client-side Supabase instance (browser singleton)
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;
  if (browserClient) return browserClient;

  const { url, anonKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured) return null;

  browserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  });

  return browserClient;
}

/**
 * Server-side Supabase instance for Next.js Route Handlers
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const { url, serviceKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured) return null;

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
