import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import connectMongoDB from '@/lib/mongodb';
import ContactLog from '@/models/ContactLog';
import { rateLimit } from '@/lib/rateLimit';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const limitResult = rateLimit(ip, {
      maxTokens: 5,
      refillIntervalMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in 15 minutes.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
          },
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

    // 3. Save to PostgreSQL
    const contact = await prisma.contact.create({
      data: { name, email, message },
    });

    // 4. Log to MongoDB
    try {
      await connectMongoDB();
      const userAgent = request.headers.get('user-agent') || 'Unknown';
      await ContactLog.create({
        name,
        email,
        submittedAt: new Date(),
        ip,
        userAgent,
      });
    } catch (mongoError) {
      // Log error but do not block the request since Postgres save was successful
      console.error('Failed to log contact to MongoDB:', mongoError);
    }

    const response = NextResponse.json(contact, { status: 201 });
    response.headers.set('X-RateLimit-Limit', '5');
    response.headers.set('X-RateLimit-Remaining', limitResult.remaining.toString());
    return response;
  } catch (error) {
    console.error('Failed to submit contact:', error);
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 });
  }
}
