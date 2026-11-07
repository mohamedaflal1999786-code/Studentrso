// app/api/scholarships/download/route.ts
// Secure download endpoint for Module 01: Scholarship Hub data files in ZIP, JSON, or CSV formats

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get('format') || 'zip').toLowerCase();

    const publicDownloadsDir = path.join(process.cwd(), 'public', 'downloads');
    const dataSubDir = path.join(publicDownloadsDir, 'module-01-scholarship-data');

    if (format === 'json') {
      const jsonPath = path.join(dataSubDir, 'scholarships-master.json');
      if (!fs.existsSync(jsonPath)) {
        return NextResponse.json({ error: 'JSON dataset not found' }, { status: 404 });
      }
      const data = fs.readFileSync(jsonPath, 'utf8');
      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="module-01-scholarships-master.json"',
        },
      });
    }

    if (format === 'csv') {
      const csvPath = path.join(dataSubDir, 'scholarships-master.csv');
      if (!fs.existsSync(csvPath)) {
        return NextResponse.json({ error: 'CSV dataset not found' }, { status: 404 });
      }
      const data = fs.readFileSync(csvPath, 'utf8');
      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="module-01-scholarships-master.csv"',
        },
      });
    }

    // Default: ZIP Archive
    const zipPath = path.join(publicDownloadsDir, 'module-01-scholarship-data.zip');
    if (!fs.existsSync(zipPath)) {
      return NextResponse.json({ error: 'ZIP archive not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(zipPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="module-01-scholarship-data.zip"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process download request', details: error?.message },
      { status: 500 }
    );
  }
}
