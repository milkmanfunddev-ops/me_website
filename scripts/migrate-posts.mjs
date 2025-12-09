import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // Need a write token
  useCdn: false,
});

// Blog posts to migrate
const posts = [
  {
    title: "Master Your Marathon Fueling: A Complete 4-Week Guide",
    slug: "master-your-marathon-fueling",
    description: "Learn how to perfect your marathon fueling in the final four weeks before race day. This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep.",
    publishedAt: "2024-11-15T00:00:00Z",
    content: [
      { _type: 'block', style: 'normal', _key: 'intro1', children: [{ _type: 'span', _key: 's1', text: 'Learn how to perfect your marathon fueling in the final four weeks before race day.', marks: ['strong'] }, { _type: 'span', _key: 's2', text: ' This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep—so you can avoid the wall and run with confidence.' }] },
      { _type: 'block', style: 'normal', _key: 'p1', children: [{ _type: 'span', _key: 's1', text: "You're four weeks out of your big race. Your training is almost complete, and the race-day details, your shoes, your pace strategy, your travel plans, are dominating your mind. But ask any marathon veteran: the most critical piece of \"gear\" you need to master is your fueling plan." }] },
      { _type: 'block', style: 'h2', _key: 'h1', children: [{ _type: 'span', _key: 's1', text: 'The Math is Simple: Why Fueling During the Run is Non-Negotiable' }] },
      { _type: 'block', style: 'normal', _key: 'p2', children: [{ _type: 'span', _key: 's1', text: "Sports physiology research finds that the body's primary high-intensity fuel source, " }, { _type: 'span', _key: 's2', text: 'muscle glycogen', marks: ['strong'] }, { _type: 'span', _key: 's3', text: ', stores roughly 1,600 to 2,000 kcal. The average marathon runner burns approximately 100 calories per mile.' }] },
      { _type: 'block', style: 'normal', _key: 'p3', children: [{ _type: 'span', _key: 's1', text: 'With 2,000 calories divided by 100 calories per mile, we know that our internal fuel tank is typically depleted by mile 20. This is why most runners "hit the wall" between mile 18 and mile 20.' }] },
      { _type: 'block', style: 'h2', _key: 'h2', children: [{ _type: 'span', _key: 's1', text: 'Plan Your Sodium and Electrolyte Intake' }] },
      { _type: 'block', style: 'normal', _key: 'p4', children: [{ _type: 'span', _key: 's1', text: "If you are three to four weeks till your race day, it's crucial to make fluid and electrolyte management plan ahead." }] },
    ],
  },
  {
    title: "The Charity Runner's Playbook: Your Guide to Running for a Cause",
    slug: "charity-runners-playbook",
    description: "Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about. Features insights from Robin White, a Six-Star Marathon Finisher.",
    publishedAt: "2024-11-01T00:00:00Z",
    content: [
      { _type: 'block', style: 'normal', _key: 'intro1', children: [{ _type: 'span', _key: 's1', text: 'Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about.', marks: ['strong'] }] },
      { _type: 'block', style: 'h2', _key: 'h1', children: [{ _type: 'span', _key: 's1', text: 'Meet Your Guide' }] },
      { _type: 'block', style: 'normal', _key: 'p1', children: [{ _type: 'span', _key: 's1', text: 'Robin White', marks: ['strong'] }, { _type: 'span', _key: 's2', text: " isn't just any runner – she's a powerhouse in the charity running community. Having completed all six World Marathon Majors and raised over $30,000 for the Bell Center across 13 campaigns." }] },
      { _type: 'block', style: 'h2', _key: 'h2', children: [{ _type: 'span', _key: 's1', text: 'How to Get Charity Bibs' }] },
      { _type: 'block', style: 'normal', _key: 'p2', children: [{ _type: 'span', _key: 's1', text: 'Most major marathons have two main paths: general entry (lottery or time-qualifying) and charity entries.' }] },
    ],
  },
  {
    title: "Major Marathon Charity Guide: Timelines, Fundraising Minimums & Deadlines",
    slug: "major-marathon-charity-guide",
    description: "Dreaming of running a World Marathon Major but don't have a qualifying time? This guide covers fundraising minimums, application windows, and key deadlines for all six majors.",
    publishedAt: "2024-10-15T00:00:00Z",
    content: [
      { _type: 'block', style: 'normal', _key: 'intro1', children: [{ _type: 'span', _key: 's1', text: "Dreaming of running a World Marathon Major but don't have a qualifying time? Charity entries offer an alternative path to the starting line." }] },
      { _type: 'block', style: 'h2', _key: 'h1', children: [{ _type: 'span', _key: 's1', text: 'The Six World Marathon Majors' }] },
      { _type: 'block', style: 'normal', _key: 'p1', children: [{ _type: 'span', _key: 's1', text: 'Boston, London, Berlin, Chicago, New York City, and Tokyo make up the prestigious World Marathon Majors.' }] },
    ],
  },
  {
    title: "Simple Fueling for Taper Week",
    slug: "simple-fueling-for-taper-week",
    description: "Easy, runner-friendly meals to power you through the final crucial days! Here's how to nail your nutrition during taper week so your muscles are fully charged and ready on race day.",
    publishedAt: "2024-10-01T00:00:00Z",
    content: [
      { _type: 'block', style: 'normal', _key: 'intro1', children: [{ _type: 'span', _key: 's1', text: "Easy, runner-friendly meals to power you through the final crucial days! Here's how to nail your nutrition during taper week." }] },
      { _type: 'block', style: 'h2', _key: 'h1', children: [{ _type: 'span', _key: 's1', text: 'What is Taper Week?' }] },
      { _type: 'block', style: 'normal', _key: 'p1', children: [{ _type: 'span', _key: 's1', text: "Taper week is the final 7-10 days before your race when you reduce training volume to let your body recover and build glycogen stores." }] },
    ],
  },
];

async function migrate() {
  console.log('Starting migration...');

  for (const post of posts) {
    const doc = {
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      description: post.description,
      publishedAt: post.publishedAt,
      content: post.content,
    };

    try {
      const result = await client.create(doc);
      console.log(`Created: ${post.title} (${result._id})`);
    } catch (error) {
      console.error(`Error creating ${post.title}:`, error.message);
    }
  }

  console.log('Migration complete!');
}

migrate();
