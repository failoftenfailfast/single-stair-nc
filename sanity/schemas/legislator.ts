import { defineType } from 'sanity';

export default defineType({
  name: 'legislator',
  title: 'Legislator',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
  ],
});








