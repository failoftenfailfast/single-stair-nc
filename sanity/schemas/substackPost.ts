import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'substackPost',
  title: 'Substack Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guid',
      title: 'GUID',
      type: 'string',
      description: 'Unique identifier from RSS feed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Original URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description/Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'text',
      description: 'Full HTML content from RSS feed',
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content (Rich Text)',
      type: 'blockContent',
      description: 'Parsed content as rich text blocks',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'CITYBUILDER',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured article',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      author: 'author',
    },
    prepare({ title, publishedAt, author }) {
      return {
        title,
        subtitle: `${author} • ${new Date(publishedAt).toLocaleDateString()}`,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});


