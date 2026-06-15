import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1).max(150),
  category: z.string().min(1).max(50),
  imageUrl: z.string().url().max(500),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const projects = await prisma.project.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = projectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { title, category, imageUrl } = result.data;
    const project = await prisma.project.create({
      data: {
        title,
        category,
        imageUrl,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
