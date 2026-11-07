import { NextResponse } from 'next/server';
import { DiscoveryEngine } from '@/lib/discovery-engine';
import { GENUINE_SCHOLARSHIP_CATALOGUE } from '@/lib/scholarships-data';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.CRON_SECRET;

    // If a CRON_SECRET is configured, enforce security; otherwise permit internal automated ping
    if (secret && authHeader !== `Bearer ${secret}`) {
      const urlSecret = new URL(request.url).searchParams.get('secret');
      if (urlSecret !== secret) {
        return NextResponse.json({ error: 'Unauthorized: Invalid cron execution secret' }, { status: 401 });
      }
    }

    const engine = DiscoveryEngine.getInstance();
    const report = await engine.executeDiscoveryRun(GENUINE_SCHOLARSHIP_CATALOGUE);

    return NextResponse.json({
      success: true,
      message: 'Automated scholarship discovery run completed successfully.',
      report,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Discovery run execution failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
