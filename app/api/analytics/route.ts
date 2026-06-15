import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectMongoDB from '@/lib/mongodb';
import AnalyticsEvent from '@/models/AnalyticsEvent';

const analyticsSchema = z.object({
  eventType: z.string().min(1),
  page: z.string().min(1),
  element: z.string().min(1),
  sessionId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = analyticsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { eventType, page, element, sessionId } = result.data;

    await connectMongoDB();
    const event = await AnalyticsEvent.create({
      eventType,
      page,
      element,
      sessionId,
      timestamp: new Date(),
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Failed to log analytics event:', error);
    return NextResponse.json({ error: 'Failed to log analytics event' }, { status: 500 });
  }
}
