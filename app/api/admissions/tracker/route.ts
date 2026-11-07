// app/api/admissions/tracker/route.ts
import { NextResponse } from 'next/server';
import { ApplicationStatus } from '@/lib/admissions-data';

export const dynamic = 'force-dynamic';

export interface AdmissionApplicationItem {
  id: string;
  processName: string;
  authority: string;
  courseApplied: string;
  referenceNumber: string;
  submissionDate: string;
  status: ApplicationStatus;
  deadlineDate: string;
  counsellingDate: string;
  documentStatus: 'Pending Verification' | 'Documents Verified' | 'Additional Upload Required' | 'Not Submitted';
  nextAction: string;
  notes?: string;
  updatedAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Security check: ensure no passwords, OTPs or Aadhaar credentials are transmitted
    const bodyString = JSON.stringify(body).toLowerCase();
    if (
      bodyString.includes('password') ||
      bodyString.includes('otp') ||
      bodyString.includes('aadhaar_full') ||
      bodyString.includes('bank_pin')
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Security Violation: Never transmit or store passwords, OTPs, or secret credentials in this tracker.',
        },
        { status: 400 }
      );
    }

    const {
      processName,
      authority,
      courseApplied,
      referenceNumber,
      submissionDate,
      status = 'Application Started',
      deadlineDate,
      counsellingDate,
      documentStatus = 'Pending Verification',
      nextAction,
      notes,
    } = body;

    if (!processName || !courseApplied) {
      return NextResponse.json(
        { success: false, error: 'Admission process name and course are required.' },
        { status: 400 }
      );
    }

    const item: AdmissionApplicationItem = {
      id: 'app-' + Date.now(),
      processName: String(processName).trim(),
      authority: String(authority || 'Statutory Admission Authority').trim(),
      courseApplied: String(courseApplied).trim(),
      referenceNumber: String(referenceNumber || 'N/A').trim(),
      submissionDate: submissionDate || new Date().toISOString().split('T')[0],
      status: status as ApplicationStatus,
      deadlineDate: deadlineDate || 'Refer to Official Gazette',
      counsellingDate: counsellingDate || 'Awaiting Notification',
      documentStatus,
      nextAction: nextAction || 'Verify registration status on official portal',
      notes: notes ? String(notes).slice(0, 500) : undefined,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Admission application tracked successfully.',
      item,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process admission tracking item', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
