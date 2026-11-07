import { NextResponse } from 'next/server';
import {
  verifySessionToken,
  getAccountById,
  getAccountByEmail,
  getSupabaseClient,
  UserProfileData,
} from '@/lib/auth-service';
import { generatePersonalizedRecommendations } from '@/lib/recommendation-engine';

export async function GET(request: Request) {
  try {
    const cookiesHeader = request.headers.get('cookie') || '';
    const sessionToken = cookiesHeader.match(/student_rso_session=([^;]+)/)?.[1];
    const accessToken = cookiesHeader.match(/student_rso_access_token=([^;]+)/)?.[1];

    let profile: UserProfileData | null = null;

    if (sessionToken) {
      const decoded = verifySessionToken(sessionToken);
      if (decoded) {
        const account = getAccountById(decoded.userId) || getAccountByEmail(decoded.email);
        if (account) {
          profile = account.profile;
        }
      }
    }

    if (!profile && accessToken) {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser(accessToken);
        if (user) {
          const { data: dbProfile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          if (dbProfile) profile = dbProfile;
        }
      }
    }

    // Default fallback student profile if guest previewing or brand new
    if (!profile) {
      profile = {
        id: 'guest',
        email: 'guest@studentrso.in',
        full_name: 'Student Guest',
        state: 'Tamil Nadu',
        education_level: 'Undergraduate',
        studied_in_tn_govt_school: true,
        is_first_graduate: true,
        annual_family_income: 'Below ₹2,50,000',
        study_interests: ['Computer Science and IT', 'Engineering'],
        career_interests: ['Internships', 'Higher education'],
        learning_preferences: ['Scholarships', 'Certificates'],
        onboarding_completed: false,
      };
    }

    const recommendations = generatePersonalizedRecommendations(profile);

    // Grouping by match tier
    const strongMatches = recommendations.filter((r) => r.matchStatus === 'Strong Match');
    const possibleMatches = recommendations.filter((r) => r.matchStatus === 'Possible Match');
    const moreInfoNeeded = recommendations.filter((r) => r.matchStatus === 'More Information Needed');

    return NextResponse.json({
      total: recommendations.length,
      counts: {
        strong: strongMatches.length,
        possible: possibleMatches.length,
        moreInfo: moreInfoNeeded.length,
      },
      recommendations,
      profileSummary: {
        education_level: profile.education_level || 'Undergraduate',
        course: profile.course || 'Degree Program',
        is_first_graduate: profile.is_first_graduate,
        studied_in_tn_govt_school: profile.studied_in_tn_govt_school,
        onboarding_completed: profile.onboarding_completed,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not generate recommendations.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
