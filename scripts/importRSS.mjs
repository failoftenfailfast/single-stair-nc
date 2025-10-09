import { createClient } from '@sanity/client';
import Parser from 'rss-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_TOKEN) {
  console.error('❌ Missing required environment variables. Please check your .env file.');
  console.log('Required variables:');
  console.log('- NEXT_PUBLIC_SANITY_PROJECT_ID');
  console.log('- NEXT_PUBLIC_SANITY_DATASET');
  console.log('- SANITY_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

const parser = new Parser({
  customFields: {
    item: ['content:encoded']
  }
});

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseDate(dateString) {
  return new Date(dateString).toISOString();
}

function cleanDescription(description) {
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

function extractTags(title, description) {
  const tags = new Set();
  
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

async function importRSSFeed() {
  try {
    console.log('🚀 Resolving RSS feeds from Sanity settings...');
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{ news }`);
    const primaryUrl = settings?.news?.rssFeedUrl || 'https://citybuildernc.org/feed';
    const primaryLabel = settings?.news?.sourceLabel || 'CITYBUILDER';
    const extraFeeds = settings?.news?.feeds || [];

    const feeds = [];
    if (primaryUrl) feeds.push({ url: primaryUrl, label: primaryLabel });
    for (const f of extraFeeds) {
      if (f?.url && (f.enabled ?? true)) feeds.push({ url: f.url, label: f.label || new URL(f.url).hostname });
    }

    let imported = 0;
    let skipped = 0;

    for (const feedDef of feeds) {
      console.log(`📰 Fetching ${feedDef.label}: ${feedDef.url}`);
      const feed = await parser.parseURL(feedDef.url);
      console.log(`   Found ${feed.items.length} items`);
      
      for (const item of feed.items) {
      try {
        const title = item.title;
        const url = item.link;
        const guid = item.guid;
        const publishedAt = parseDate(item.pubDate);
        
        // Check if post already exists
        const existingPost = await client.fetch(
          `*[_type == "substackPost" && guid == $guid][0]`,
          { guid }
        );
        
        if (existingPost) {
          console.log(`⏭️  Post already exists: ${title}`);
          skipped++;
          continue;
        }
        
        const description = item.contentSnippet || item.content || '';
        const cleanedDescription = cleanDescription(description);
        
        // Get full content if available
        const content = item['content:encoded'] || item.content || '';
        
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
          author: feedDef.label || 'CITYBUILDER',
          featured: imported === 0, // Make the first new post featured
          tags,
        };
        
        console.log(`✅ Creating post: ${title}`);
        await client.create(substackPost);
        imported++;
        
      } catch (itemError) {
        console.error('❌ Error processing item:', itemError);
        continue;
      }
      }
    }
    
    console.log('🎉 RSS import completed successfully!');
    console.log(`📊 Summary: ${imported} imported, ${skipped} skipped`);
    
  } catch (error) {
    console.error('💥 Error importing RSS feed:', error);
    process.exit(1);
  }
}

// Run the import
importRSSFeed();
