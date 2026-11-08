import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifySessionToken,
  getAccountById,
  getAccountByEmail,
  UserProfileData,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';
import { generatePersonalizedRecommendations } from '@/lib/recommendation-engine';

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

    let profile: UserProfileData | null = null;
    const supabase = getSupabaseServerClient();

    // 1. Fetch real student profile from live Supabase database
    if (sessionToken) {
      const decoded = verifySessionToken(sessionToken);
      if (decoded && decoded.userId && supabase) {
        try {
          const { data: dbProfile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', decoded.userId)
            .maybeSingle();

          if (dbProfile) {
            profile = dbProfile as UserProfileData;
          } else if (decoded.email) {
            const { data: profileByEmail } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('email', decoded.email)
              .maybeSingle();
            if (profileByEmail) profile = profileByEmail as UserProfileData;
          }
        } catch (err) {
          console.warn('Error reading user profile for recommendations:', err);
        }

        // Fallback to local memory store if DB query failed
        if (!profile) {
          const account = getAccountById(decoded.userId) || (decoded.email ? getAccountByEmail(decoded.email) : null);
          if (account) profile = account.profile;
        }

        if (profile && !profile.gender) {
          profile.gender = (profile.notification_preferences as any)?.gender || 'Male';
        }
      }
    }

    if (!profile && accessToken && supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser(accessToken);
        if (user) {
          const { data: dbProfile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          if (dbProfile) profile = dbProfile as UserProfileData;
        }
      } catch {
        // Continue
      }
    }

    // Baseline neutral profile if not completed onboarding
    if (!profile) {
      profile = {
        id: 'guest',
        email: 'guest@studentrso.in',
        full_name: 'Student Guest',
        state: 'Tamil Nadu',
        education_level: 'Undergraduate',
        studied_in_tn_govt_school: false,
        is_first_graduate: false,
        annual_family_income: 'Below ₹2,50,000',
        study_interests: [],
        career_interests: [],
        learning_preferences: [],
        onboarding_completed: false,
      };
    }

    const recommendations = generatePersonalizedRecommendations(profile);

    // Grouping by match tier
    const strongMatches = recommendations.filter((r) => r.matchStatus === 'Strong Match');
    const possibleMatches = recommendations.filter((r) => r.matchStatus === 'Possible Match');
    const moreInfoNeeded = recommendations.filter((r) => r.matchStatus === 'More Information Needed');

    return NextResponse.json(
      {
        total: recommendations.length,
        counts: {
          strong: strongMatches.length,
          possible: possibleMatches.length,
          moreInfo: moreInfoNeeded.length,
        },
        recommendations,
        profileSummary: {
          education_level: profile.education_level || 'Undergraduate',
          course: profile.course || '',
          institution_name: profile.institution_name || '',
          is_first_graduate: profile.is_first_graduate,
          studied_in_tn_govt_school: profile.studied_in_tn_govt_school,
          onboarding_completed: profile.onboarding_completed,
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not generate recommendations.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
