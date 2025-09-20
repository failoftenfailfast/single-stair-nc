import { defineType } from 'sanity';

export default defineType({
  name: 'substackPost',
  title: 'Substack Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});

