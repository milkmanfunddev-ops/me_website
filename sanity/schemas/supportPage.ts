import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 2,
      initialValue: "We're here to help! If you have questions, feedback, or need assistance with Mealvana, please don't hesitate to reach out.",
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Section Title',
      type: 'string',
      initialValue: 'Send Us a Message',
    }),
    defineField({
      name: 'formspreeId',
      title: 'Formspree Form ID',
      type: 'string',
      description: 'The Formspree form ID (e.g., "xldyagzr")',
    }),
    defineField({
      name: 'subjectOptions',
      title: 'Subject Dropdown Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['General Question', 'Bug Report', 'Feature Request', 'Account Issue', 'Other'],
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'Other Ways to Reach Us',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'support@mealvana.io',
    }),
    defineField({
      name: 'responseTime',
      title: 'Response Time Text',
      type: 'string',
      initialValue: 'We typically respond within 24-48 hours.',
    }),
    defineField({
      name: 'faqTitle',
      title: 'FAQ Section Title',
      type: 'string',
      initialValue: 'Common Questions',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [{ type: 'faq' }],
    }),
    defineField({
      name: 'addressTitle',
      title: 'Address Section Title',
      type: 'string',
      initialValue: 'Mailing Address',
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Mailing Address',
      type: 'text',
      rows: 4,
      initialValue: 'Milkman Inc.\n1500 1st Ave N\nBirmingham, AL 35203',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Support Page',
        subtitle: 'Contact form and FAQ settings',
      };
    },
  },
});
