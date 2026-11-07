import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

export interface AuthSessionData {
  client: SupabaseClient;
  user: User;
  isAdmin: boolean;
}

export function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key, isConfigured: Boolean(url && key) };
}

export function getClientWithUser(accessToken: string): SupabaseClient {
  const { url, key, isConfigured } = getSupabaseEnv();
  if (!isConfigured || !url || !key) {
    throw new Error('Supabase environment is not configured.');
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

const ADMIN_EMAILS = [
  'admin@studentrso.org',
  'moderator@studentrso.org',
  'admin@studentrso.in',
  ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()) : []),
];

export async function getAuthenticatedUser(request: Request): Promise<AuthSessionData | null> {
  const raw = request.headers.get('cookie')?.match(/student_rso_access_token=([^;]+)/)?.[1];
  if (!raw) return null;
  const accessToken = decodeURIComponent(raw);

  try {
    const client = getClientWithUser(accessToken);
    const { data, error } = await client.auth.getUser(accessToken);
    if (error || !data.user) return null;

    const user = data.user;
    const userEmail = (user.email || '').toLowerCase();
    const isEmailAdmin = ADMIN_EMAILS.includes(userEmail);
    const isMetaAdmin = user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin';

    // Also verify profile table if available
    let isProfileAdmin = false;
    try {
      const { data: profile } = await client
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      if (profile && (isEmailAdmin || isMetaAdmin)) {
        isProfileAdmin = true;
      }
    } catch {
      // ignore
    }

    const isAdmin = isEmailAdmin || isMetaAdmin || isProfileAdmin;

    return { client, user, isAdmin };
  } catch {
    return null;
  }
}
