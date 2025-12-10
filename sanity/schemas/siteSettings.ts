import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'social', title: 'Social Media' },
    { name: 'downloads', title: 'Download Links' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'seo', title: 'SEO Defaults' },
  ],
  fields: [
    // Branding
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Mealvana Endurance',
      group: 'branding',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      group: 'branding',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'branding',
    }),

    // Navigation
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      group: 'navigation',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
      ],
    }),

    // Footer
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
      initialValue: 'Milkman Inc. All rights reserved.',
      description: 'Year will be added automatically',
    }),

    // Social Media
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'strava', title: 'Strava Club URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      ],
    }),

    // Download Links
    defineField({
      name: 'downloadLinks',
      title: 'App Download Links',
      type: 'object',
      group: 'downloads',
      fields: [
        {
          name: 'appStore',
          title: 'App Store URL',
          type: 'url',
          description: 'Apple App Store link',
        },
        {
          name: 'playStore',
          title: 'Google Play URL',
          type: 'url',
          description: 'Google Play Store link',
        },
        {
          name: 'testFlight',
          title: 'TestFlight URL',
          type: 'url',
          description: 'Beta testing via TestFlight',
          initialValue: 'https://testflight.apple.com/join/1HJG86nz',
        },
      ],
    }),

    // Contact Info
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'email',
          title: 'Support Email',
          type: 'string',
          initialValue: 'support@mealvana.io',
        },
        {
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          initialValue: 'Milkman Inc.',
        },
        {
          name: 'address',
          title: 'Mailing Address',
          type: 'text',
          rows: 3,
          initialValue: '1500 1st Ave N\nBirmingham, AL 35203',
        },
      ],
    }),

    // SEO Defaults
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Default title for pages without their own',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2,
          description: 'Default description for pages without their own (150-160 chars recommended)',
        },
        {
          name: 'ogImage',
          title: 'Default OG Image',
          type: 'image',
          description: 'Default image for social sharing',
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Without the @ symbol',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
