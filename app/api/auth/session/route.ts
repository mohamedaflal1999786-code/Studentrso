import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifySessionToken,
  getAccountById,
  getAccountByEmail,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken =
      cookieStore.get('student_rso_session')?.value ||
      request.headers.get('cookie')?.match(/student_rso_session=([^;]+)/)?.[1];
    const accessToken =
      cookieStore.get('student_rso_access_token')?.value ||
      request.headers.get('cookie')?.match(/student_rso_access_token=([^;]+)/)?.[1];

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
            const formatted = {
              ...profile,
              gender: profile.gender || (profile.notification_preferences as any)?.gender || 'Male',
            };
            return NextResponse.json(
              {
                user: { id: profile.id, email: profile.email || decoded.email },
                profile: formatted,
              },
              {
                headers: {
                  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
              }
            );
          }

          // Fallback by email lookup
          if (decoded.email) {
            const { data: profileByEmail } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('email', decoded.email)
              .maybeSingle();

            if (profileByEmail) {
              const formattedByEmail = {
                ...profileByEmail,
                gender: profileByEmail.gender || (profileByEmail.notification_preferences as any)?.gender || 'Male',
              };
              return NextResponse.json(
                {
                  user: { id: profileByEmail.id, email: profileByEmail.email },
                  profile: formattedByEmail,
                },
                {
                  headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                  },
                }
              );
            }
          }
        }

        // Fallback to local memory store
        const account =
          getAccountById(decoded.userId) ||
          (decoded.email ? getAccountByEmail(decoded.email) : null);
        if (account) {
          return NextResponse.json(
            {
              user: { id: account.id, email: account.email },
              profile: account.profile,
            },
            {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              },
            }
          );
        }

        // If session token is cryptographically valid, return baseline user profile
        return NextResponse.json(
          {
            user: { id: decoded.userId, email: decoded.email },
            profile: {
              id: decoded.userId,
              email: decoded.email,
              full_name: 'Student',
              onboarding_completed: false,
            },
          },
          {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
          }
        );
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

        return NextResponse.json(
          {
            user: { id: user.id, email: user.email },
            profile: profile || {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || 'Student',
              onboarding_completed: false,
            },
          },
          {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
          }
        );
      }
    }

    return NextResponse.json(
      { user: null, profile: null },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { user: null, profile: null },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  }
}
