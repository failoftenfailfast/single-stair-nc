import { defineType } from 'sanity';

export default defineType({
  name: 'legislator',
  title: 'Legislator',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        list: [
          { title: 'State Senator', value: 'State Senator' },
          { title: 'State Representative', value: 'State Representative' },
          { title: 'US Senator', value: 'US Senator' },
          { title: 'US Representative', value: 'US Representative' },
          { title: 'Mayor', value: 'Mayor' },
          { title: 'City Council Member', value: 'City Council Member' },
          { title: 'County Commissioner', value: 'County Commissioner' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'party',
      title: 'Party Affiliation',
      type: 'string',
      options: {
        list: [
          { title: 'Democratic', value: 'D' },
          { title: 'Republican', value: 'R' },
          { title: 'Independent', value: 'I' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      name: 'district',
      title: 'District',
      type: 'string',
      description: 'District number or name (e.g., "District 12", "Senate District 23")',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'NC',
      readOnly: true,
    },
    {
      name: 'county',
      title: 'County',
      type: 'string',
      description: 'Primary county or counties represented',
    },
    {
      name: 'chamber',
      title: 'Chamber',
      type: 'string',
      options: {
        list: [
          { title: 'North Carolina Senate', value: 'NC Senate' },
          { title: 'North Carolina House', value: 'NC House' },
          { title: 'US Senate', value: 'US Senate' },
          { title: 'US House', value: 'US House' },
          { title: 'Local Government', value: 'Local' },
        ],
      },
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'officePhone',
          title: 'Office Phone',
          type: 'string',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
        {
          name: 'mailingAddress',
          title: 'Mailing Address',
          type: 'text',
          rows: 3,
        },
      ],
    },
    {
      name: 'committees',
      title: 'Committee Assignments',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of committees the legislator serves on',
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Without @ symbol',
        },
        {
          name: 'facebook',
          title: 'Facebook Page',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string',
          description: 'Without @ symbol',
        },
      ],
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'text',
      rows: 4,
    },
    {
      name: 'priority',
      title: 'Priority Level',
      type: 'number',
      description: 'Higher numbers = higher priority for advocacy (1-5)',
      initialValue: 3,
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: 'singleStairPosition',
      title: 'Single-Stair Position',
      type: 'string',
      options: {
        list: [
          { title: 'Strongly Supports', value: 'strong_support' },
          { title: 'Supports', value: 'support' },
          { title: 'Neutral/Unknown', value: 'neutral' },
          { title: 'Opposes', value: 'oppose' },
          { title: 'Strongly Opposes', value: 'strong_oppose' },
        ],
      },
      description: 'Legislator\'s known position on single-stair housing',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes for advocacy coordination',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Unnamed Legislator',
        subtitle: subtitle || 'No title',
        media,
      };
    },
  },
});








