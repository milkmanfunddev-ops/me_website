import { defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
});
