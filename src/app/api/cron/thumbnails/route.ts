import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN!;

const client = createClient({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET, apiVersion: '2023-05-03', token: SANITY_TOKEN, useCdn: false });

export const runtime = 'nodejs';

export async function GET() {
  try {
    const posts = await client.fetch(`[
      ...*[_type == "substackPost" && !defined(thumbnail)][0...50],
      ...*[_type == "manualNewsLink" && !defined(thumbnail)][0...50]
    ]`);

    // No-op placeholder; thumbnails handled during import. This endpoint exists for future backfill logic if needed.
    return NextResponse.json({ ok: true, checked: posts.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}


