import { defineType } from 'sanity';

export default defineType({
  name: 'policyUpdate',
  title: 'Policy Update',
  type: 'document',
  fields: [
    {
      name: 'scope',
      title: 'Scope',
      type: 'string',
      description: 'NC-specific or National update',
      options: {
        list: [
          { title: 'North Carolina', value: 'nc' },
          { title: 'National', value: 'national' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'locationName',
      title: 'Location / Jurisdiction',
      type: 'string',
      description: 'e.g., Wake County, Washington State',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'statusKind',
      title: 'Status Kind',
      type: 'string',
      description: 'Used to color-code updates in the UI',
      options: {
        list: [
          { title: 'Signed', value: 'signed' },
          { title: 'Passed Both', value: 'passed_both' },
          { title: 'Passed Chamber', value: 'passed_chamber' },
          { title: 'Committee', value: 'committee' },
          { title: 'Introduced', value: 'introduced' },
          { title: 'Studying', value: 'studying' },
          { title: 'General Update', value: 'update' },
        ],
      },
    },
    {
      name: 'billNumber',
      title: 'Bill Number',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Reference Link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'locationName',
    },
  },
});


