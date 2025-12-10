import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'whatsNewPage',
  title: "What's New Page Settings",
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: "What's New",
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Stay up to date with the latest features and improvements to Mealvana Endurance.',
    }),
    defineField({
      name: 'comingSoonTitle',
      title: 'Coming Soon Section Title',
      type: 'string',
      initialValue: 'Coming Soon',
    }),
    defineField({
      name: 'comingSoonIntro',
      title: 'Coming Soon Introduction',
      type: 'text',
      rows: 2,
      initialValue: "We're actively working on new features to help you fuel your best performance:",
    }),
    defineField({
      name: 'comingSoonFeatures',
      title: 'Coming Soon Features',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Integration with popular fitness platforms (Strava, Garmin, TrainingPeaks)',
        'Race day packing lists and reminders',
        'Post-race recovery nutrition plans',
        'Social sharing and community features',
        'Advanced analytics and performance tracking',
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Have a feature request or feedback?',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/support',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "What's New Page Settings",
        subtitle: 'Page intro and coming soon section',
      };
    },
  },
});
