import { createClient, SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

const DEFAULT_SUPABASE_URL = 'https://venwgcsyqgonummzzepo.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_cPTEK1unPkvwqPbtTemNWw_yjDB7Ra5';
const DEFAULT_SERVICE_KEY = 'sb_secret_j08Lnf8ePI6KzxSl7bIXpw_k8mbmuH4';

export function getSupabaseEnv() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;

  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY;

  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    DEFAULT_SERVICE_KEY;

  const isConfigured = Boolean(
    url &&
    anonKey &&
    !url.includes('your_supabase_project_url') &&
    !anonKey.includes('your_supabase_anon_key')
  );

  return {
    url,
    anonKey,
    serviceKey,
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

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Returns true when value is a valid RFC-4122 UUID accepted by Postgres uuid columns. */
export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_REGEX.test(value.trim());
}

/**
 * Validates JWT structure and expiration locally before calling supabase.auth.getUser(),
 * preventing unnecessary HTTP 401/403 Auth warnings on non-Supabase or expired tokens.
 */
export function isValidUnexpiredSupabaseJwt(token: unknown): token is string {
  if (typeof token !== 'string') return false;
  const trimmed = token.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 3 || !parts[1]) return false;

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json =
      typeof atob === 'function'
        ? atob(padded)
        : Buffer.from(padded, 'base64').toString('utf8');
    const payload = JSON.parse(json) as { sub?: unknown; exp?: unknown };
    if (!isUuid(payload.sub)) return false;
    if (typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now() + 5000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
