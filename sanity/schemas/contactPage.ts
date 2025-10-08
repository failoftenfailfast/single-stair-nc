import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'CONTACT',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'GET IN TOUCH WITH OUR TEAM. WE\'RE HERE TO ANSWER QUESTIONS, DISCUSS PARTNERSHIPS, AND HELP YOU GET INVOLVED.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formTitle',
      title: 'Contact Form Title',
      type: 'string',
      initialValue: 'SEND US A MESSAGE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inquiryTypes',
      title: 'Inquiry Types',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['General Inquiry', 'Media & Press', 'Partnership', 'Policy & Research', 'Volunteer'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'SEND MESSAGE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactInfoTitle',
      title: 'Contact Information Title',
      type: 'string',
      initialValue: 'CONTACT INFORMATION',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactInfoItems',
      title: 'Contact Information',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Contact Type', validation: (Rule) => Rule.required() },
          { name: 'email', type: 'string', title: 'Email', validation: (Rule) => Rule.required() },
          { name: 'description', type: 'text', title: 'Description', validation: (Rule) => Rule.required() }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officesTitle',
      title: 'Office Locations Title',
      type: 'string',
      initialValue: 'OFFICE LOCATIONS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officeLocations',
      title: 'Office Locations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'city', type: 'string', title: 'City', validation: (Rule) => Rule.required() },
          { name: 'address', type: 'text', title: 'Address', validation: (Rule) => Rule.required() },
          { name: 'phone', type: 'string', title: 'Phone', validation: (Rule) => Rule.required() },
          { name: 'hours', type: 'string', title: 'Hours', validation: (Rule) => Rule.required() }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'followUsTitle',
      title: 'Follow Us Title',
      type: 'string',
      initialValue: 'FOLLOW OUR WORK',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'followUsDescription',
      title: 'Follow Us Description',
      type: 'text',
      initialValue: 'Stay updated on our advocacy efforts and policy developments.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string', title: 'Platform' },
          { name: 'url', type: 'url', title: 'URL' },
          { name: 'label', type: 'string', title: 'Label' }
        ]
      }]
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
          initialValue: 'Contact Us - Single Stair North Carolina Housing Advocacy',
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          initialValue: 'Get in touch with Single Stair North Carolina. Contact our team for questions, partnerships, media inquiries, or to get involved in housing policy reform.',
        },
        { name: 'image', title: 'SEO Image', type: 'image' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Contact Page',
      };
    },
  },
});
