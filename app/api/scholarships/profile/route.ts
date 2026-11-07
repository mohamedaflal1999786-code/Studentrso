import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ profile: null, message: 'Unauthenticated' });
    }

    const { client, user } = auth;
    const { data, error } = await client
      .from('student_scholarship_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ profile: data || null });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch student scholarship profile.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Sign in to save your eligibility profile.' }, { status: 401 });
    }

    const body = await request.json();
    const { client, user } = auth;

    const profileData = {
      user_id: user.id,
      education_level: body.educationLevel || null,
      current_course: body.currentCourse ? String(body.currentCourse).trim().slice(0, 100) : null,
      current_year: body.currentYear ? String(body.currentYear).trim().slice(0, 50) : null,
      institution_type: body.institutionType || null,
      academic_percentage: typeof body.academicPercentage === 'number' ? body.academicPercentage : null,
      annual_income_range: body.annualIncomeRange || null,
      state: body.state || 'Tamil Nadu',
      district: body.district ? String(body.district).trim().slice(0, 100) : null,
      community_category: body.communityCategory || null,
      gender: body.gender || null,
      has_disability: Boolean(body.hasDisability),
      studied_in_tn_govt_school: Boolean(body.studiedInTnGovtSchool),
      is_single_girl_child: Boolean(body.isSingleGirlChild),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from('student_scholarship_profiles')
      .upsert(profileData, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, profile: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save student profile.' },
      { status: 500 }
    );
  }
}
