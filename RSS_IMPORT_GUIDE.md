# RSS Import Guide

This guide explains how to populate the `/learn/articles` section with content from the CITYBUILDER RSS feed.

## Setup

1. **Environment Variables**: Make sure you have the following environment variables set in your `.env` file:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token_here
```

The `SANITY_WRITE_TOKEN` is required for importing data. You can obtain this from your Sanity project's API settings.

## Running the Import

To populate articles from the CITYBUILDER RSS feed (`https://citybuildernc.org/feed`), run:

```bash
npm run import-rss
```

This script will:
- ✅ Fetch the latest articles from the CITYBUILDER RSS feed
- ✅ Parse article metadata (title, description, publication date, etc.)
- ✅ Extract relevant tags based on content keywords
- ✅ Skip articles that have already been imported
- ✅ Create new Substack posts in your Sanity dataset
- ✅ Mark the first new article as featured

## What Gets Imported

Each article includes:

- **Title**: The article headline
- **Slug**: URL-friendly version of the title
- **Description**: Clean text excerpt from the article
- **URL**: Link to the original Substack article
- **Published Date**: When the article was published
- **Author**: Set to "CITYBUILDER"
- **Tags**: Automatically extracted based on content keywords
- **Content**: Full HTML content from the RSS feed
- **Featured**: First new article is marked as featured

## Viewing Articles

Once imported, articles will be available at:
- `/learn/articles` - Main articles listing page
- Individual articles link to the original Substack posts

## Keywords for Auto-Tagging

The import script automatically tags articles based on these keywords:
- housing, density, zoning, transit, development, affordability
- bikes, biking, walkability, urbanism, planning, policy
- durham, raleigh, triangle, north carolina, nc
- single-stair, stair, apartment, building, construction
- parking, vision zero, safety, infrastructure

## Manual Management

After importing, you can:
- Edit articles in your Sanity Studio
- Mark different articles as featured
- Add custom tags
- Update descriptions
- Archive outdated content

## Automation

To keep articles updated, you can:
- Set up a cron job to run `npm run import-rss` regularly
- Use GitHub Actions or Vercel Cron Jobs
- Run manually when new content is published

## Troubleshooting

If you encounter issues:

1. **Environment Variables**: Verify all required variables are set
2. **Sanity Token**: Ensure your write token has proper permissions
3. **Network**: Check if the RSS feed URL is accessible
4. **Schema**: Make sure the Sanity schemas are properly deployed

For more details, check the console output when running the import script.
