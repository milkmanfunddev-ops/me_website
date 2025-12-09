import { defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
});
