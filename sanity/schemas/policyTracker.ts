import { defineType } from 'sanity';

export default defineType({
  name: 'policyTracker',
  title: 'Policy Tracker',
  type: 'document',
  fields: [
    {
      name: 'state',
      title: 'State',
      type: 'string',
    },
  ],
});








