import { defineType } from 'sanity';

export default defineType({
  name: 'policyTracker',
  title: 'Policy Tracker',
  type: 'document',
  fields: [
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      description: 'Whether this record is for a state or a county',
      options: {
        list: [
          { title: 'State', value: 'state' },
          { title: 'County', value: 'county' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'id',
      title: 'Identifier',
      type: 'string',
      description: 'Stable identifier, e.g. state code (nc) or county key (mecklenburg)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stateId',
      title: 'State ID',
      type: 'string',
      description: 'For counties, the parent state code (e.g. nc)',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Human-readable name of the jurisdiction',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'No Activity', value: 'no_activity' },
          { title: 'Bill Introduced', value: 'introduced' },
          { title: 'In Committee', value: 'committee' },
          { title: 'Passed One Chamber', value: 'passed_chamber' },
          { title: 'Passed Both Chambers', value: 'passed_both' },
          { title: 'Signed into Law', value: 'signed' },
          { title: 'Failed', value: 'failed' },
          { title: 'Under Study', value: 'studying' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'billNumber',
      title: 'Bill Number',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'nextStep',
      title: 'Next Step',
      type: 'text',
    },
    {
      name: 'sponsor',
      title: 'Sponsor',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
    },
  },
});










