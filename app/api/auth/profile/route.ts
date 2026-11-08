import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifySessionToken,
  updateUserProfile,
  UserProfileData,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken =
      cookieStore.get('student_rso_session')?.value ||
      request.headers.get('cookie')?.match(/student_rso_session=([^;]+)/)?.[1];
    const accessToken =
      cookieStore.get('student_rso_access_token')?.value ||
      request.headers.get('cookie')?.match(/student_rso_access_token=([^;]+)/)?.[1];

    let userId: string | null = null;
    let userEmail: string | null = null;

    if (sessionToken) {
      const decoded = verifySessionToken(sessionToken);
      if (decoded && decoded.userId) {
        userId = decoded.userId;
        userEmail = decoded.email || null;
      }
    }

    const supabase = getSupabaseServerClient();

    if (!userId && accessToken && supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser(accessToken);
        if (user) {
          userId = user.id;
          userEmail = user.email || null;
        }
      } catch {
        // Continue
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'You must be signed in to update your profile.' }, { status: 401 });
    }

    const body = (await request.json()) as Partial<UserProfileData>;

    // Sanitize updates
    const updates: Partial<UserProfileData> = {};
    if (typeof body.full_name === 'string') updates.full_name = body.full_name.trim();
    if (typeof body.phone === 'string') updates.phone = body.phone.trim();
    if (typeof body.date_of_birth === 'string') updates.date_of_birth = body.date_of_birth;
    if (typeof body.state === 'string') updates.state = body.state.trim();
    if (typeof body.district === 'string') updates.district = body.district.trim();
    if (typeof body.city === 'string') updates.city = body.city.trim();
    if (typeof body.education_level === 'string') updates.education_level = body.education_level;
    if (typeof body.course === 'string') updates.course = body.course.trim();
    if (typeof body.specialization === 'string') updates.specialization = body.specialization.trim();
    if (typeof body.academic_year === 'string') updates.academic_year = body.academic_year;
    if (typeof body.institution_name === 'string') updates.institution_name = body.institution_name.trim();
    if (typeof body.graduation_year === 'number') updates.graduation_year = body.graduation_year;
    if (typeof body.academic_percentage === 'number') updates.academic_percentage = body.academic_percentage;
    if (typeof body.cgpa === 'number') updates.cgpa = body.cgpa;
    if (typeof body.annual_family_income === 'string') updates.annual_family_income = body.annual_family_income;
    if (typeof body.community_category === 'string') updates.community_category = body.community_category;
    if (typeof body.gender === 'string') updates.gender = body.gender as 'Male' | 'Female' | 'Transgender' | 'Other';
    if (typeof body.studied_in_tn_govt_school === 'boolean') updates.studied_in_tn_govt_school = body.studied_in_tn_govt_school;
    if (typeof body.is_first_graduate === 'boolean') updates.is_first_graduate = body.is_first_graduate;
    if (typeof body.is_single_girl_child === 'boolean') updates.is_single_girl_child = body.is_single_girl_child;
    if (typeof body.has_disability === 'boolean') updates.has_disability = body.has_disability;
    if (typeof body.avatar_url === 'string' || body.avatar_url === null) {
      updates.avatar_url = body.avatar_url === '' ? null : body.avatar_url;
    }
    if (Array.isArray(body.study_interests)) updates.study_interests = body.study_interests;
    if (Array.isArray(body.career_interests)) updates.career_interests = body.career_interests;
    if (Array.isArray(body.learning_preferences)) updates.learning_preferences = body.learning_preferences;
    if (body.notification_preferences && typeof body.notification_preferences === 'object') {
      updates.notification_preferences = body.notification_preferences;
    }
    if (typeof body.onboarding_completed === 'boolean') updates.onboarding_completed = body.onboarding_completed;

    // Update in-memory account store for local fallback
    const updated = updateUserProfile(userId, updates);

    // Sync to Supabase user_profiles table with service role client (bypasses RLS)
    let persistentProfile = null;
    if (supabase) {
      try {
        // Query existing profile to safely merge notification preferences and preserve gender
        let existingGender = updated?.gender || 'Male';
        let existingNotificationPrefs: Record<string, unknown> = {};

        const { data: existingRow } = await supabase
          .from('user_profiles')
          .select('gender, notification_preferences')
          .eq('id', userId)
          .maybeSingle();

        if (existingRow) {
          if (existingRow.gender) existingGender = existingRow.gender;
          if (existingRow.notification_preferences && typeof existingRow.notification_preferences === 'object') {
            existingNotificationPrefs = existingRow.notification_preferences as Record<string, unknown>;
            if (existingNotificationPrefs.gender && typeof existingNotificationPrefs.gender === 'string') {
              existingGender = existingNotificationPrefs.gender as any;
            }
          }
        }

        const safeGender = updates.gender || existingGender;
        const incomingPrefs = (updates.notification_preferences as Record<string, unknown>) || {};
        const mergedNotificationPrefs = {
          ...existingNotificationPrefs,
          ...incomingPrefs,
          gender: safeGender,
        };

        const { gender, ...dbFields } = updates;
        const dbPayload: Record<string, unknown> = {
          id: userId,
          email: userEmail,
          ...dbFields,
          notification_preferences: mergedNotificationPrefs,
          updated_at: new Date().toISOString(),
        };

        if (updates.avatar_url === null) {
          dbPayload.avatar_url = null;
        }

        const { data: dbProfile, error: dbError } = await supabase
          .from('user_profiles')
          .upsert(dbPayload, { onConflict: 'id' })
          .select()
          .maybeSingle();

        if (dbError) {
          console.error('Supabase user_profiles upsert error:', dbError.message);
        } else if (dbProfile) {
          persistentProfile = {
            ...dbProfile,
            gender: dbProfile.gender || (dbProfile.notification_preferences as any)?.gender || safeGender,
          };
        }
      } catch (err) {
        console.warn('Supabase DB error:', err);
      }
    }

    return NextResponse.json({
      message: 'Profile updated successfully.',
      profile: persistentProfile || updated || updates,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not update profile.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
