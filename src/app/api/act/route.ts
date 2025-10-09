import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'n8639pbu',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

const query = `*[_id == "actPage"][0]{
  title,
  heroTitle,
  heroDescription,
  heroBackgroundImage{
    ...,
    asset->
  },
  primaryButtonText,
  secondaryButtonText,
  seo
}`;

export async function GET() {
  try {
    const data = await client.fetch(query);
    return NextResponse.json(data ?? {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load act page' }, { status: 500 });
  }
}


