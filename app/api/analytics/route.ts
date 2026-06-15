import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectMongo from '@/lib/mongodb';
import AnalyticsEvent from '@/models/AnalyticsEvent';

const analyticsSchema = z.object({
  eventType: z.string().min(1),
  page: z.string().min(1),
  element: z.string().min(1),
  sessionId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const body = await request.json();
    const result = analyticsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { eventType, page, element, sessionId } = result.data;

    try {
      await connectMongo();
      await AnalyticsEvent.create({
        eventType,
        page,
        element,
        sessionId,
        timestamp: new Date(),
      });
    } catch (err) {
      // analytics write failed silently — non-critical
      console.error('Analytics write failed:', err);
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to log analytics event:', error);
    return NextResponse.json({ error: 'Failed to log analytics event' }, { status: 500 });
  }
}
