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
    item: ['content:encoded']
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

export async function fetchAndParseRSS(): Promise<void> {
  try {
    console.log('Fetching RSS feed URL from Sanity settings...');
    const feedUrl: string | null = await client.fetch(
      `*[_type == "siteSettings"][0].news.rssFeedUrl`
    );
    const resolvedFeedUrl = feedUrl || 'https://citybuildernc.org/feed';
    console.log(`Fetching RSS feed from ${resolvedFeedUrl}...`);
    
    const feed = await parser.parseURL(resolvedFeedUrl);
    
    console.log(`Found ${feed.items.length} items in RSS feed`);
    
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
          author: 'CITYBUILDER',
          featured: false,
          tags,
        };
        
        console.log(`Creating post: ${title}`);
        await client.create(substackPost);
        
      } catch (itemError) {
        console.error('Error processing item:', itemError);
        continue;
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
