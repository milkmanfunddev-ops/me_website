import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Fuel Your Best Race',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroPrimaryButton',
      title: 'Hero Primary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
      ],
    }),
    defineField({
      name: 'heroSecondaryButton',
      title: 'Hero Secondary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
      ],
    }),

    // Problem Statement Section
    defineField({
      name: 'problemTitle',
      title: 'Problem Statement Title',
      type: 'string',
    }),
    defineField({
      name: 'problemDescription',
      title: 'Problem Statement Description',
      type: 'text',
      rows: 3,
    }),

    // Features Section
    defineField({
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'string',
      initialValue: 'How It Works',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          type: 'object',
          title: 'Feature',
          fields: [
            { name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., user, lightning, heart' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Athletes Are Saying',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'testimonial',
          type: 'object',
          title: 'Testimonial',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role/Title', type: 'string' },
            { name: 'image', title: 'Photo', type: 'image' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'role' },
          },
        }),
      ],
    }),

    // FAQ Section
    defineField({
      name: 'faqTitle',
      title: 'FAQ Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'faq',
          type: 'object',
          title: 'FAQ',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
          preview: {
            select: { title: 'question' },
          },
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      };
    },
  },
});
