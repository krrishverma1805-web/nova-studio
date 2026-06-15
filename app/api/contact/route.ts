import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import connectMongo from '@/lib/mongodb';
import ContactLog from '@/models/ContactLog';
import { rateLimit } from '@/lib/rateLimit';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    // 1. Rate Limiting Check
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const limitResult = rateLimit(ip, {
      maxTokens: 5,
      refillIntervalMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before submitting again.' },
        {
          status: 429,
          headers: { 'Retry-After': '900' }, // 15 minutes in seconds
        }
      );
    }

    // 2. Validate request body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, message } = result.data;

    // Save to PostgreSQL first — this is critical
    const contact = await prisma.contact.create({ data: { name, email, message } });

    // Log to MongoDB — non-critical, fail silently
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    try {
      await connectMongo();
      await ContactLog.create({ name, email, submittedAt: new Date(), ip, userAgent });
    } catch (err) {
      console.error('ContactLog write failed:', err);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to submit contact:', error);
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 });
  }
}
