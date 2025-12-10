import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Mealvana Team',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // Standard text blocks
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
        // Image with caption
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        // YouTube video embed
        {
          type: 'youtubeEmbed',
        },
        // Code block with syntax highlighting
        {
          type: 'codeBlock',
        },
        // Pull quote
        {
          type: 'pullQuote',
        },
        // Callout box
        {
          name: 'callout',
          title: 'Callout Box',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Tip', value: 'tip' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'emoji',
              title: 'Emoji',
              type: 'string',
              initialValue: '💡',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
            },
          ],
          preview: {
            select: {
              emoji: 'emoji',
              title: 'title',
              text: 'text',
            },
            prepare({ emoji, title, text }) {
              return {
                title: `${emoji || '💡'} ${title || 'Callout'}`,
                subtitle: text?.substring(0, 50) + '...',
              };
            },
          },
        },
        // CTA Box
        {
          name: 'ctaBox',
          title: 'CTA Box',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
            },
            {
              name: 'highlight',
              title: 'Highlight Text',
              type: 'string',
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'buttonUrl',
              title: 'Button URL',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: `CTA: ${title || 'Call to Action'}`,
              };
            },
          },
        },
        // Data Table
        {
          name: 'dataTable',
          title: 'Data Table',
          type: 'object',
          fields: [
            {
              name: 'caption',
              title: 'Table Caption',
              type: 'string',
            },
            {
              name: 'headers',
              title: 'Headers',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Cells',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              caption: 'caption',
            },
            prepare({ caption }) {
              return {
                title: `Table: ${caption || 'Data Table'}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'heroImage',
      author: 'author',
    },
    prepare({ title, date, media, author }) {
      return {
        title,
        subtitle: `${author || 'No author'} • ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
        media,
      };
    },
  },
});
