import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  try {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const provided = (body && body.secret) || request.headers.get('x-revalidate-secret');
    if (provided !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tag = body?.tag as string | undefined;
    const path = body?.path as string | undefined;

    if (tag) {
      revalidateTag(tag);
    }
    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, tag: tag || null, path: path || null });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}


