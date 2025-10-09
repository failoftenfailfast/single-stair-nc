import { createClient } from '@sanity/client';
import Parser from 'rss-parser';

// Configuration
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN; // Need write token for imports

const client = createClient({
  projectId: SANITY_PROJECT_ID!,
  dataset: SANITY_DATASET!,
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'media:content', 'media:thumbnail']
  }
});

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseDate(dateString: string): string {
  return new Date(dateString).toISOString();
}

function cleanDescription(description: string): string {
  // Remove HTML tags and decode HTML entities
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractTags(title: string, description: string): string[] {
  const tags: Set<string> = new Set();
  
  // Common housing/urban planning keywords
  const keywords = [
    'housing', 'density', 'zoning', 'transit', 'development', 'affordability',
    'bikes', 'biking', 'walkability', 'urbanism', 'planning', 'policy',
    'durham', 'raleigh', 'triangle', 'north carolina', 'nc',
    'single-stair', 'stair', 'apartment', 'building', 'construction',
    'parking', 'vision zero', 'safety', 'infrastructure'
  ];
  
  const text = (title + ' ' + description).toLowerCase();
  
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  });
  
  return Array.from(tags).slice(0, 5); // Limit to 5 tags
}

async function getOpenGraphImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { method: 'GET' });
    const html = await res.text();
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (ogMatch && ogMatch[1]) return ogMatch[1];
    const twitterMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (twitterMatch && twitterMatch[1]) return twitterMatch[1];
    return null;
  } catch {
    return null;
  }
}

async function uploadImageToSanity(imageUrl: string): Promise<{ assetRef: any; originalUrl: string } | null> {
  try {
    const resp = await fetch(imageUrl);
    if (!resp.ok) return null;
    const arrayBuf = await resp.arrayBuffer();
    const fileName = imageUrl.split('/').pop() || 'thumbnail.jpg';
    const asset = await client.assets.upload('image', Buffer.from(arrayBuf), { filename: fileName });
    return { assetRef: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }, originalUrl: imageUrl };
  } catch {
    return null;
  }
}

async function resolveThumbnailForItem(item: any, fallbackPageUrl: string): Promise<{ image: any; originalUrl?: string } | null> {
  const enclosureUrl: string | undefined = (item?.enclosure && (item.enclosure.url || item.enclosure.url)) || undefined;
  const mediaContentUrl: string | undefined = (item && (item['media:content']?.url || item['media:content']?.$?.url)) || undefined;
  const mediaThumbUrl: string | undefined = (item && (item['media:thumbnail']?.url || item['media:thumbnail']?.$?.url)) || undefined;
  const candidate = enclosureUrl || mediaContentUrl || mediaThumbUrl;
  let imageUrl = candidate || null;
  if (!imageUrl) {
    imageUrl = await getOpenGraphImage(fallbackPageUrl);
  }
  if (!imageUrl) return null;
  const uploaded = await uploadImageToSanity(imageUrl);
  if (!uploaded) return null;
  return { image: uploaded.assetRef, originalUrl: uploaded.originalUrl };
}

export async function fetchAndParseRSS(): Promise<void> {
  try {
    console.log('Fetching RSS feeds configuration from Sanity settings...');
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{ news }`);
    const primaryUrl: string | null = settings?.news?.rssFeedUrl || null;
    const primaryLabel: string = settings?.news?.sourceLabel || 'CITYBUILDER';
    const extraFeeds: Array<{label?: string; url?: string; enabled?: boolean}> = settings?.news?.feeds || [];

    const feedsToProcess: Array<{ url: string; label: string }> = [];
    if (primaryUrl) feedsToProcess.push({ url: primaryUrl, label: primaryLabel });
    for (const f of extraFeeds) {
      if (f?.url && (f.enabled ?? true)) {
        feedsToProcess.push({ url: f.url, label: f.label || new URL(f.url).hostname });
      }
    }

    if (feedsToProcess.length === 0) {
      feedsToProcess.push({ url: 'https://citybuildernc.org/feed', label: 'CITYBUILDER' });
    }

    for (const feedDef of feedsToProcess) {
      console.log(`Fetching RSS feed from ${feedDef.url}...`);
      const feed = await parser.parseURL(feedDef.url);
      console.log(`Found ${feed.items.length} items in ${feedDef.label}`);
      
      for (const item of feed.items) {
      try {
        const title = item.title!;
        const url = item.link!;
        const guid = item.guid!;
        const publishedAt = parseDate(item.pubDate!);
        
        // Check if post already exists
        const existingPost = await client.fetch(
          `*[_type == "substackPost" && guid == $guid][0]`,
          { guid }
        );
        
        if (existingPost) {
          console.log(`Post already exists: ${title}`);
          continue;
        }
        
        const description = item.contentSnippet || item.content || '';
        const cleanedDescription = cleanDescription(description);
        
        // Get full content if available
        const content = (item as any)['content:encoded'] || item.content || '';
        
        const tags = extractTags(title, cleanedDescription);
        
        const thumb = await resolveThumbnailForItem(item, url);

        const substackPost = {
          _type: 'substackPost',
          title,
          slug: {
            _type: 'slug',
            current: createSlug(title)
          },
          guid,
          url,
          publishedAt,
          description: cleanedDescription,
          content,
          author: feedDef.label || 'CITYBUILDER',
          featured: false,
          tags,
          ...(thumb?.image ? { thumbnail: thumb.image } : {}),
          ...(thumb?.originalUrl ? { thumbnailOriginalUrl: thumb.originalUrl } : {}),
        };
        
        console.log(`Creating post: ${title}`);
        await client.create(substackPost);
        
      } catch (itemError) {
        console.error('Error processing item:', itemError);
        continue;
      }
      }
    }
    
    console.log('RSS import completed successfully!');
    
  } catch (error) {
    console.error('Error importing RSS feed:', error);
    throw error;
  }
}

export async function markPostAsFeatured(postId: string): Promise<void> {
  try {
    // First, unmark any existing featured posts
    const featuredPosts = await client.fetch(
      `*[_type == "substackPost" && featured == true]`
    );
    
    for (const post of featuredPosts) {
      await client.patch(post._id).set({ featured: false }).commit();
    }
    
    // Then mark the new post as featured
    await client.patch(postId).set({ featured: true }).commit();
    
    console.log('Featured post updated successfully!');
    
  } catch (error) {
    console.error('Error updating featured post:', error);
    throw error;
  }
}

// CLI function for manual import
export async function runImport(): Promise<void> {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    console.error('Missing Sanity configuration. Please check your environment variables.');
    return;
  }
  
  if (!SANITY_TOKEN) {
    console.error('Missing SANITY_WRITE_TOKEN. This is required for importing data.');
    return;
  }
  
  try {
    await fetchAndParseRSS();
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// If run directly
if (require.main === module) {
  runImport();
}
