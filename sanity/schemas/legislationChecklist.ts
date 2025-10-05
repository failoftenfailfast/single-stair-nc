import { defineType } from 'sanity';

export default defineType({
  name: 'legislationChecklist',
  title: 'Legislation Checklist',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});





