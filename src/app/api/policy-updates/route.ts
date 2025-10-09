import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'n8639pbu',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

const queryByScope: Record<string, string> = {
  nc: `*[_type == "policyUpdate" && scope == "nc"] | order(date desc)[0...10]{
    _id,
    date,
    locationName,
    title,
    description,
    statusKind,
    billNumber,
    link
  }`,
  national: `*[_type == "policyUpdate" && scope == "national"] | order(date desc)[0...10]{
    _id,
    date,
    locationName,
    title,
    description,
    statusKind,
    billNumber,
    link
  }`,
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scope = (searchParams.get('scope') || 'nc').toLowerCase();
    const query = queryByScope[scope];
    if (!query) {
      return NextResponse.json({ error: 'Invalid scope' }, { status: 400 });
    }
    const data = await client.fetch(query);
    const res = NextResponse.json({ scope, updates: data ?? [] });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res;
  } catch {
    return NextResponse.json({ error: 'Failed to load policy updates' }, { status: 500 });
  }
}


