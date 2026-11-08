import { NextResponse } from 'next/server';
import {
  verifySessionToken,
  getAccountById,
  getAccountByEmail,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const cookiesHeader = request.headers.get('cookie') || '';
    const sessionToken = cookiesHeader.match(/student_rso_session=([^;]+)/)?.[1];
    const accessToken = cookiesHeader.match(/student_rso_access_token=([^;]+)/)?.[1];

    const supabase = getSupabaseServerClient();

    // 1. Verify Student RSO session token
    if (sessionToken) {
      const decoded = verifySessionToken(sessionToken);
      if (decoded && decoded.userId) {
        // Query live Supabase database for persistent profile
        if (supabase) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', decoded.userId)
            .maybeSingle();

          if (profile) {
            return NextResponse.json({
              user: { id: profile.id, email: profile.email || decoded.email },
              profile,
            });
          }
        }

        // Fallback to local memory store
        const account =
          getAccountById(decoded.userId) ||
          (decoded.email ? getAccountByEmail(decoded.email) : null);
        if (account) {
          return NextResponse.json({
            user: { id: account.id, email: account.email },
            profile: account.profile,
          });
        }

        // If session token is cryptographically valid, return baseline user profile
        return NextResponse.json({
          user: { id: decoded.userId, email: decoded.email },
          profile: {
            id: decoded.userId,
            email: decoded.email,
            full_name: 'Student',
            onboarding_completed: false,
          },
        });
      }
    }

    // 2. Check Supabase access token directly
    if (accessToken && supabase) {
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
          profile: profile || {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'Student',
            onboarding_completed: false,
          },
        });
      }
    }

    return NextResponse.json({ user: null, profile: null });
  } catch {
    return NextResponse.json({ user: null, profile: null });
  }
}
