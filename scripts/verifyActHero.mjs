import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'n8639pbu',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

const query = '*[_id == "actPage"][0]{ heroTitle, heroDescription }';

try {
  const data = await client.fetch(query);
  console.log(JSON.stringify(data, null, 2));
} catch (err) {
  console.error('Failed to fetch actPage:', err);
  process.exit(1);
}


