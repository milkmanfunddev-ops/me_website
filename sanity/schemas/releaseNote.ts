import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'releaseNote',
  title: 'Release Note',
  type: 'document',
  fields: [
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "1.0", "1.1", "2.0"',
    }),
    defineField({
      name: 'title',
      title: 'Release Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Initial Release", "Performance Improvements"',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isLatest',
      title: 'Is Latest Release?',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as true to show "Latest" badge',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief description of this release',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'improvements',
      title: 'Improvements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of improvements or bug fixes',
    }),
    defineField({
      name: 'supportedSports',
      title: 'Supported Sports',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Running, Cycling, Swimming, Triathlon',
    }),
  ],
  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      releaseDate: 'releaseDate',
      isLatest: 'isLatest',
    },
    prepare({ title, version, releaseDate, isLatest }) {
      return {
        title: `${isLatest ? '🆕 ' : ''}Version ${version} - ${title}`,
        subtitle: releaseDate || 'No date set',
      };
    },
  },
});
