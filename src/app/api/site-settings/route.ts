import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'n8639pbu',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

const query = `*[_type == "siteSettings"][0]{
  title,
  tagline,
  description,
  logo,
  favicon,
  navigation,
  ctaButton,
  footerBrandDescription,
  footerSections,
  newsletterTitle,
  newsletterDescription,
  newsletterButtonText,
  socialLinks,
  footerBottomLinks,
  theme,
  copyrightText,
  seo
}`;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await client.fetch(query);
    const res = NextResponse.json(data ?? {});
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res;
  } catch {
    return NextResponse.json({ error: 'Failed to load site settings' }, { status: 500 });
  }
}


