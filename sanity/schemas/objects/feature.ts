import { defineType } from 'sanity';

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'e.g., user, lightning, heart',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
