import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Helper to check if document exists
async function documentExists(type, id) {
  const doc = await client.fetch(`*[_type == "${type}" && _id == "${id}"][0]`);
  return !!doc;
}

// Seed What's New Page Settings
async function seedWhatsNewPage() {
  console.log('\n📰 Seeding What\'s New Page Settings...');

  const existing = await client.fetch(`*[_type == "whatsNewPage"][0]`);
  if (existing) {
    console.log('  ✓ What\'s New page settings already exist');
    return;
  }

  await client.create({
    _type: 'whatsNewPage',
    title: "What's New",
    subtitle: 'Stay up to date with the latest features and improvements to Mealvana Endurance.',
    comingSoonTitle: 'Coming Soon',
    comingSoonIntro: "We're actively working on new features to help you fuel your best performance:",
    comingSoonFeatures: [
      'Integration with popular fitness platforms (Strava, Garmin, TrainingPeaks)',
      'Race day packing lists and reminders',
      'Post-race recovery nutrition plans',
      'Social sharing and community features',
      'Advanced analytics and performance tracking',
    ],
    ctaText: 'Have a feature request or feedback?',
    ctaButtonText: 'Contact Us',
    ctaButtonLink: '/support',
  });
  console.log('  ✓ Created What\'s New page settings');
}

// Seed Initial Release Note
async function seedReleaseNotes() {
  console.log('\n🚀 Seeding Release Notes...');

  const existing = await client.fetch(`*[_type == "releaseNote"][0]`);
  if (existing) {
    console.log('  ✓ Release notes already exist');
    return;
  }

  await client.create({
    _type: 'releaseNote',
    version: '1.0',
    title: 'Initial Release',
    releaseDate: '2024-12-01',
    isLatest: true,
    summary: "We're excited to launch Mealvana Endurance! This initial release brings you science-based nutrition planning for endurance athletes, powered by AI and evidence-based research.",
    features: [
      { _key: nanoid(), title: 'AI-Powered Nutrition Plans', description: 'Personalized fueling strategies tailored to your race distance, pace, and preferences' },
      { _key: nanoid(), title: 'Science-Based Calculations', description: 'Built on ACSM energy expenditure formulas and evidence-based sports nutrition research' },
      { _key: nanoid(), title: 'Food Preference Integration', description: "Tell us what you like and dislike, and we'll plan around your taste" },
      { _key: nanoid(), title: 'Phase-Specific Guidance', description: 'Separate recommendations for pre-run, during-run, and post-run nutrition' },
      { _key: nanoid(), title: 'Gut Training Support', description: 'Gradual carbohydrate progression based on your gut training level' },
      { _key: nanoid(), title: 'Race Day Calendar', description: 'Track upcoming races and plan your nutrition timeline' },
      { _key: nanoid(), title: 'Carb Loading Calculator', description: 'Multi-day carbohydrate loading plans for race week' },
      { _key: nanoid(), title: 'Weather-Aware Hydration', description: 'Sodium and fluid recommendations that adjust for conditions' },
      { _key: nanoid(), title: 'Offline-First Design', description: 'Full functionality without internet connection' },
    ],
    supportedSports: [
      'Running (5K to Ultra-marathons)',
      'Cycling',
      'Swimming',
      'Triathlon',
    ],
  });
  console.log('  ✓ Created initial release note (v1.0)');
}

// Seed Support Page
async function seedSupportPage() {
  console.log('\n💬 Seeding Support Page...');

  const existing = await client.fetch(`*[_type == "supportPage"][0]`);
  if (existing) {
    console.log('  ✓ Support page already exists');
    return;
  }

  await client.create({
    _type: 'supportPage',
    title: 'Contact Us',
    subtitle: "We're here to help! If you have questions, feedback, or need assistance with Mealvana, please don't hesitate to reach out.",
    formTitle: 'Send Us a Message',
    formspreeId: 'xldyagzr',
    subjectOptions: ['General Question', 'Bug Report', 'Feature Request', 'Account Issue', 'Other'],
    contactTitle: 'Other Ways to Reach Us',
    contactEmail: 'support@mealvana.io',
    responseTime: 'We typically respond within 24-48 hours.',
    faqTitle: 'Common Questions',
    faqs: [
      {
        _key: nanoid(),
        _type: 'faq',
        question: 'How do I reset my password?',
        answer: 'You can reset your password from the login screen by tapping "Forgot Password" and following the instructions sent to your email.',
      },
      {
        _key: nanoid(),
        _type: 'faq',
        question: 'How do I delete my account?',
        answer: 'To delete your account and all associated data, please email us at support@mealvana.io with the subject line "Account Deletion Request."',
      },
    ],
    addressTitle: 'Mailing Address',
    mailingAddress: 'Milkman Inc.\n1500 1st Ave N\nBirmingham, AL 35203',
  });
  console.log('  ✓ Created support page');
}

// Update Site Settings with new fields
async function updateSiteSettings() {
  console.log('\n⚙️ Updating Site Settings...');

  const existing = await client.fetch(`*[_type == "siteSettings"][0]`);
  if (!existing) {
    console.log('  ⚠ No site settings found. Creating...');
    await client.create({
      _type: 'siteSettings',
      siteName: 'Mealvana Endurance',
      siteDescription: 'Science-based nutrition plans for endurance athletes.',
      downloadLinks: {
        testFlight: 'https://testflight.apple.com/join/1HJG86nz',
      },
      contactInfo: {
        email: 'support@mealvana.io',
        companyName: 'Milkman Inc.',
        address: '1500 1st Ave N\nBirmingham, AL 35203',
      },
      copyrightText: 'Milkman Inc. All rights reserved.',
    });
    console.log('  ✓ Created site settings');
    return;
  }

  // Update with new fields if they don't exist
  const updates = {};

  if (!existing.downloadLinks) {
    updates.downloadLinks = {
      testFlight: 'https://testflight.apple.com/join/1HJG86nz',
    };
  }

  if (!existing.contactInfo) {
    updates.contactInfo = {
      email: 'support@mealvana.io',
      companyName: 'Milkman Inc.',
      address: '1500 1st Ave N\nBirmingham, AL 35203',
    };
  }

  if (!existing.copyrightText) {
    updates.copyrightText = 'Milkman Inc. All rights reserved.';
  }

  if (Object.keys(updates).length > 0) {
    await client.patch(existing._id).set(updates).commit();
    console.log('  ✓ Updated site settings with new fields');
  } else {
    console.log('  ✓ Site settings already up to date');
  }
}

// Main function
async function main() {
  console.log('🌱 Seeding Sanity Content...');
  console.log('================================');

  try {
    await seedWhatsNewPage();
    await seedReleaseNotes();
    await seedSupportPage();
    await updateSiteSettings();

    console.log('\n================================');
    console.log('✅ Content seeding complete!');
    console.log('\nNew document types created:');
    console.log('  - What\'s New Page Settings');
    console.log('  - Release Notes');
    console.log('  - Support Page');
    console.log('\nYou can now edit these in Sanity Studio.');
  } catch (error) {
    console.error('\n❌ Error seeding content:', error);
    process.exit(1);
  }
}

main();
