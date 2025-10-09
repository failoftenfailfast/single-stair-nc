import { NextResponse } from 'next/server';
import { fetchAndParseRSS } from '../../../../utils/rssImporter';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await fetchAndParseRSS();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}


