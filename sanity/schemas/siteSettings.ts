import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Single Stair NC',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'news',
      title: 'News & RSS',
      type: 'object',
      fields: [
        {
          name: 'rssFeedUrl',
          title: 'RSS Feed URL',
          type: 'url',
          description: 'Primary RSS/Atom feed for news articles',
          initialValue: 'https://citybuildernc.org/feed',
          validation: (Rule) => Rule.uri({ allowRelative: false }).required(),
        },
        {
          name: 'sourceLabel',
          title: 'Source Label',
          type: 'string',
          description: 'Display name for the news source',
          initialValue: 'CITYBUILDER',
        },
        {
          name: 'feeds',
          title: 'Additional RSS Feeds',
          type: 'array',
          description: 'Manage multiple RSS/Atom sources. Toggle enabled to include in imports.',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'url', title: 'Feed URL', type: 'url', validation: (Rule) => Rule.uri({ allowRelative: false }).required() },
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
              ],
              preview: {
                select: { title: 'label', subtitle: 'url', enabled: 'enabled' },
                prepare({ title, subtitle, enabled }) {
                  return { title: `${title || 'Feed'}`, subtitle: `${subtitle}${enabled === false ? ' (disabled)' : ''}` };
                }
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'object',
      fields: [
        { name: 'brand500', title: 'Brand 500', type: 'color', options: { disableAlpha: true } },
        { name: 'brand600', title: 'Brand 600', type: 'color', options: { disableAlpha: true } },
        { name: 'brand700', title: 'Brand 700', type: 'color', options: { disableAlpha: true } },
        { name: 'brand800', title: 'Brand 800', type: 'color', options: { disableAlpha: true } },
        { name: 'surfacePrimary', title: 'Surface Primary', type: 'color', options: { disableAlpha: true } },
        { name: 'surfaceSecondary', title: 'Surface Secondary', type: 'color', options: { disableAlpha: true } },
        { name: 'surfaceInverse', title: 'Surface Inverse', type: 'color', options: { disableAlpha: true } },
        { name: 'contentPrimary', title: 'Content Primary', type: 'color', options: { disableAlpha: true } },
        { name: 'contentSecondary', title: 'Content Secondary', type: 'color', options: { disableAlpha: true } },
        { name: 'contentInverse', title: 'Content Inverse', type: 'color', options: { disableAlpha: true } },
        { name: 'borderPrimary', title: 'Border Primary', type: 'color', options: { disableAlpha: true } },
        { name: 'borderSecondary', title: 'Border Secondary', type: 'color', options: { disableAlpha: true } },
        { name: 'borderFocus', title: 'Border Focus', type: 'color', options: { disableAlpha: true } },
      ]
    }),
    defineField({
      name: 'tagline',
      title: 'Site Tagline',
      type: 'string',
      initialValue: 'NORTH CAROLINA',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      initialValue: 'Advocating for better housing design through single-stair buildings. Creating more livable, affordable, and sustainable communities across North Carolina.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main site logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (16x16 or 32x32)',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
          { name: 'href', type: 'string', title: 'URL', validation: (Rule) => Rule.required() },
          { name: 'external', type: 'boolean', title: 'External Link', initialValue: false }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text', validation: (Rule) => Rule.required() },
        { name: 'href', type: 'string', title: 'Button URL', validation: (Rule) => Rule.required() }
      ]
    }),
    defineField({
      name: 'footerBrandDescription',
      title: 'Footer Brand Description',
      type: 'text',
      initialValue: 'Advocating for better housing design through single-stair buildings. Creating more livable, affordable, and sustainable communities across North Carolina.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerSections',
      title: 'Footer Navigation Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Section Title', validation: (Rule) => Rule.required() },
          {
            name: 'links',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Link Label', validation: (Rule) => Rule.required() },
                { name: 'href', type: 'string', title: 'Link URL', validation: (Rule) => Rule.required() }
              ]
            }],
            title: 'Section Links',
            validation: (Rule) => Rule.required()
          }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'string',
      initialValue: 'STAY INFORMED',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'text',
      initialValue: 'Get updates on single-stair legislation, new research, and advocacy opportunities.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'newsletterButtonText',
      title: 'Newsletter Button Text',
      type: 'string',
      initialValue: 'SUBSCRIBE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string', title: 'Platform', validation: (Rule) => Rule.required() },
          { name: 'url', type: 'url', title: 'URL', validation: (Rule) => Rule.required() },
          { name: 'label', type: 'string', title: 'Label' }
        ]
      }]
    }),
    defineField({
      name: 'footerBottomLinks',
      title: 'Footer Bottom Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Link Label', validation: (Rule) => Rule.required() },
          { name: 'href', type: 'string', title: 'Link URL', validation: (Rule) => Rule.required() }
        ]
      }],
      initialValue: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Contact', href: '/contact' }
      ]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: 'Single Stair North Carolina. All rights reserved.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Default SEO Title',
          type: 'string',
          initialValue: 'Single Stair North Carolina - Housing Policy Advocacy & Reform'
        },
        {
          name: 'description',
          title: 'Default SEO Description',
          type: 'text',
          initialValue: 'Single Stair North Carolina advocates for building code reforms to enable single-stair residential buildings, creating more affordable, livable, and sustainable housing across our state.'
        },
        { name: 'image', title: 'Default SEO Image', type: 'image' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
      };
    },
  },
});
