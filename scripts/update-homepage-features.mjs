import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const features = [
  {
    title: 'AI-Powered Nutrition Plans',
    description: 'Get personalized fueling strategies powered by advanced AI and linear programming optimization, tailored to your race distance, pace, and preferences.',
    icon: 'brain',
  },
  {
    title: 'Science-Based Calculations',
    description: 'Built on ACSM energy expenditure formulas and evidence-based sports nutrition research from leading endurance athlete studies.',
    icon: 'flask',
  },
  {
    title: 'Personalized Food Preferences',
    description: "Tell us what you like, dislike, and what you're willing to try. Your nutrition plan respects your taste preferences and dietary needs.",
    icon: 'heart',
  },
  {
    title: 'Phase-Specific Guidance',
    description: 'Separate recommendations for pre-run fueling (1-4 hours before), during-run nutrition, and post-run recovery to optimize performance.',
    icon: 'clock',
  },
  {
    title: 'Gut Training Support',
    description: 'Gradually increase carbohydrate intake based on your gut training level—from beginner to advanced endurance athlete.',
    icon: 'running',
  },
  {
    title: 'Macro Target Precision',
    description: 'Detailed carbohydrate, protein, sodium, and hydration targets calculated specifically for your body weight, run duration, and intensity.',
    icon: 'target',
  },
  {
    title: 'Race Day Calendar',
    description: 'Track your upcoming races and training runs with an integrated calendar that helps you plan your nutrition timeline.',
    icon: 'calendar',
  },
  {
    title: 'Offline-First Design',
    description: "All your data stays on your device with full offline functionality. No internet required once you've created your plan.",
    icon: 'mobile',
  },
  {
    title: 'Training Activity Log',
    description: 'Log your training runs, cycling sessions, and swimming workouts to build a complete picture of your endurance training journey.',
    icon: 'list',
  },
  {
    title: 'Carb Loading Calculator',
    description: 'Multi-day carbohydrate loading plans for race week, with meal-by-meal guidance to maximize your glycogen stores.',
    icon: 'utensils',
  },
  {
    title: 'Food Database Integration',
    description: 'Extensive database of endurance-specific foods with detailed nutritional information, including gels, bars, drinks, and whole foods.',
    icon: 'database',
  },
  {
    title: 'Weather-Aware Hydration',
    description: 'Sodium and fluid recommendations adjust based on temperature, humidity, and your personal sweat rate for optimal hydration.',
    icon: 'cloud',
  },
];

async function updateHomepageFeatures() {
  console.log('Updating Homepage with all 12 features...\n');

  // Fetch existing homepage
  const existing = await client.fetch(`*[_type == "homepage"][0]`);

  if (!existing) {
    console.log('No homepage found!');
    return;
  }

  console.log(`Found homepage: ${existing._id}`);

  // Format features with _key and _type
  const formattedFeatures = features.map(f => ({
    _key: nanoid(),
    _type: 'feature',
    title: f.title,
    description: f.description,
    icon: f.icon,
  }));

  // Update homepage with all features
  await client
    .patch(existing._id)
    .set({
      features: formattedFeatures,
      featuresTitle: 'Features',
    })
    .commit();

  console.log(`Updated homepage with ${formattedFeatures.length} features!`);
}

updateHomepageFeatures().catch(console.error);
