import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function updateSiteSettings() {
  console.log('Updating Site Settings...\n');

  // Fetch existing site settings
  const existing = await client.fetch(`*[_type == "siteSettings"][0]`);

  if (!existing) {
    console.log('No site settings found. Creating new document...');
    await client.create({
      _type: 'siteSettings',
      siteName: 'Mealvana Endurance',
      siteDescription: 'Science-based nutrition plans for endurance athletes. Personalized fueling strategies for runners, cyclists, and triathletes.',
      navItems: [
        { _key: nanoid(), _type: 'object', label: 'Home', href: '/' },
        { _key: nanoid(), _type: 'object', label: 'Blog', href: '/blog' },
        { _key: nanoid(), _type: 'object', label: "What's New", href: '/whats-new' },
        { _key: nanoid(), _type: 'object', label: 'Support', href: '/support' },
      ],
      ctaButton: {
        label: 'Download',
        href: 'https://testflight.apple.com/join/1HJG86nz',
      },
      footerDescription: 'Personalized nutrition plans for endurance athletes. Science-backed meal planning tailored to your training, your body, and your goals.',
      footerLinks: [
        { _key: nanoid(), _type: 'object', label: 'Home', href: '/' },
        { _key: nanoid(), _type: 'object', label: 'Blog', href: '/blog' },
        { _key: nanoid(), _type: 'object', label: "What's New", href: '/whats-new' },
        { _key: nanoid(), _type: 'object', label: 'Support', href: '/support' },
      ],
    });
    console.log('Site settings created!');
    return;
  }

  console.log(`Found existing site settings: ${existing._id}`);

  // Update with correct navigation and footer links
  await client
    .patch(existing._id)
    .set({
      navItems: [
        { _key: nanoid(), _type: 'object', label: 'Home', href: '/' },
        { _key: nanoid(), _type: 'object', label: 'Blog', href: '/blog' },
        { _key: nanoid(), _type: 'object', label: "What's New", href: '/whats-new' },
        { _key: nanoid(), _type: 'object', label: 'Support', href: '/support' },
      ],
      ctaButton: {
        label: 'Download',
        href: 'https://testflight.apple.com/join/1HJG86nz',
      },
      footerLinks: [
        { _key: nanoid(), _type: 'object', label: 'Home', href: '/' },
        { _key: nanoid(), _type: 'object', label: 'Blog', href: '/blog' },
        { _key: nanoid(), _type: 'object', label: "What's New", href: '/whats-new' },
        { _key: nanoid(), _type: 'object', label: 'Support', href: '/support' },
      ],
    })
    .commit();

  console.log('Site settings updated successfully!');
  console.log('\nNavigation items now include: Home, Blog, What\'s New, Support');
  console.log('CTA button: Download -> TestFlight link');
}

updateSiteSettings().catch(console.error);
