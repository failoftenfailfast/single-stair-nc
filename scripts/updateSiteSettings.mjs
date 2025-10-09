import 'dotenv/config';
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function run() {
  const title = "The Outdated Rule That’s Killing Our Cities";
  const description = "find out why changing this one outdated law can fill in the missing middle of North Carolina's housing without compromsing safety or quality of life";

  if (!projectId || !token) {
    console.error('Missing SANITY project credentials in environment.');
    process.exit(1);
  }

  try {
    console.log('🔄 Updating siteSettings...');
    await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings' });
    const result = await client.patch('siteSettings').set({ title, description }).commit();

    console.log('✅ Updated siteSettings:', result._id, result._rev);
  } catch (err) {
    console.error('❌ Failed to update siteSettings:', err?.message || err);
    process.exit(1);
  }
}

run();


