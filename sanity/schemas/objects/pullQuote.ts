import { defineType } from 'sanity';

export default defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Who said this quote (optional)',
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Source of the quote (e.g., book title, study name)',
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Orange accent)', value: 'default' },
          { title: 'Large (Centered, prominent)', value: 'large' },
          { title: 'Subtle (Gray border)', value: 'subtle' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      quote: 'quote',
      attribution: 'attribution',
    },
    prepare({ quote, attribution }) {
      return {
        title: `"${quote?.substring(0, 50)}..."`,
        subtitle: attribution ? `— ${attribution}` : 'Pull Quote',
      };
    },
  },
});
