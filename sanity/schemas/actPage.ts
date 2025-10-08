import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'actPage',
  title: 'Act Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Take Action',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'TAKE ACTION',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'YOUR VOICE MATTERS. MAKE A DIRECT IMPACT ON SINGLE-STAIR HOUSING POLICY IN NORTH CAROLINA THROUGH TARGETED ADVOCACY.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for the hero section',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'FIND YOUR REPRESENTATIVE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'VIEW PROGRESS MAP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          initialValue: 'Take Action - Single Stair Housing Advocacy in North Carolina',
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          initialValue: 'Join the movement for single-stair housing policy reform in North Carolina. Find your representatives, track legislative progress, and get involved in creating better, more affordable housing.',
        },
        {
          name: 'image',
          title: 'SEO Image',
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Act Page',
      };
    },
  },
});
