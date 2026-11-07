import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Signed out.' });
  response.cookies.set('student_rso_session', '', { httpOnly: true, sameSite: 'lax', maxAge: 0, path: '/' });
  response.cookies.set('student_rso_access_token', '', { httpOnly: true, sameSite: 'lax', maxAge: 0, path: '/' });
  response.cookies.set('student_rso_refresh_token', '', { httpOnly: true, sameSite: 'lax', maxAge: 0, path: '/' });
  return response;
}
