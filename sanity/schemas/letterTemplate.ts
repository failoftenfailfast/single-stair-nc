import { defineType } from 'sanity';

export default defineType({
  name: 'letterTemplate',
  title: 'Letter Template',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
  ],
});










