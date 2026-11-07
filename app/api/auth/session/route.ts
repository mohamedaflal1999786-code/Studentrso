import { NextResponse } from 'next/server';
import {
  verifySessionToken,
  getAccountById,
  getAccountByEmail,
  getSupabaseClient,
} from '@/lib/auth-service';

export async function GET(request: Request) {
  try {
    const cookiesHeader = request.headers.get('cookie') || '';
    const sessionToken = cookiesHeader.match(/student_rso_session=([^;]+)/)?.[1];
    const accessToken = cookiesHeader.match(/student_rso_access_token=([^;]+)/)?.[1];

    // 1. Check Student RSO custom session
    if (sessionToken) {
      const decoded = verifySessionToken(sessionToken);
      if (decoded) {
        const account = getAccountById(decoded.userId) || getAccountByEmail(decoded.email);
        if (account) {
          return NextResponse.json({
            user: { id: account.id, email: account.email },
            profile: account.profile,
          });
        }
      }
    }

    // 2. Fallback to Supabase access token
    if (accessToken) {
      const supabase = getSupabaseClient();
      if (supabase) {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(accessToken);
        if (!error && user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          return NextResponse.json({
            user: { id: user.id, email: user.email },
            profile,
          });
        }
      }
    }

    return NextResponse.json({ user: null, profile: null });
  } catch {
    return NextResponse.json({ user: null, profile: null });
  }
}
