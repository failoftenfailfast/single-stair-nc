import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'n8639pbu',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

const rssQuery = `*[_type == "substackPost"] | order(publishedAt desc){
  _id,
  title,
  description,
  url,
  publishedAt,
  author,
  featured,
  tags
}`;

const manualQuery = `*[_type == "manualNewsLink"] | order(publishedAt desc){
  _id,
  title,
  description,
  url,
  publishedAt,
  source,
  featured,
  tags
}`;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [rssPosts, manualPosts] = await Promise.all([
      client.fetch(rssQuery),
      client.fetch(manualQuery),
    ]);

    const combined = [...(rssPosts || []), ...(manualPosts || [])].sort(
      (a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const res = NextResponse.json({ posts: combined });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res;
  } catch {
    return NextResponse.json({ error: 'Failed to load news' }, { status: 500 });
  }
}


