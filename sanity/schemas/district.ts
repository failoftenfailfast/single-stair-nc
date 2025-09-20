import { defineType } from 'sanity';

export default defineType({
  name: 'district',
  title: 'District',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
  ],
});

