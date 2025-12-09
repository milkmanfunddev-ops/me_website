import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Helper to create portable text blocks
function createBlock(text, style = 'normal', marks = []) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).substr(2, 9),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).substr(2, 9), text, marks }],
  };
}

function createBoldBlock(boldText, normalText = '', style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).substr(2, 9),
    style,
    children: [
      { _type: 'span', _key: Math.random().toString(36).substr(2, 9), text: boldText, marks: ['strong'] },
      { _type: 'span', _key: Math.random().toString(36).substr(2, 9), text: normalText, marks: [] },
    ],
  };
}

// Blog posts data
const posts = [
  {
    title: "Master Your Marathon Fueling: A Complete 4-Week Guide",
    slug: "master-your-marathon-fueling",
    description: "Learn how to perfect your marathon fueling in the final four weeks before race day. This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep—so you can avoid the wall and run with confidence.",
    publishedAt: "2025-11-12T00:00:00Z",
    content: [
      createBoldBlock("Learn how to perfect your marathon fueling in the final four weeks before race day.", " This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep—so you can avoid the wall and run with confidence."),
      createBlock("You're four weeks out of your big race. Your training is almost complete, and the race-day details, your shoes, your pace strategy, your travel plans, are dominating your mind. But ask any marathon veteran: the most critical piece of \"gear\" you need to master is your fueling plan."),
      createBlock("You can have the best training block and the lightest shoes, but if you haven't rehearsed your in-run nutrition, you risk hitting the infamous wall."),
      createBlock("The math is simple: Why Fueling during the run is non-negotiable.", "h2"),
      createBlock("Sports physiology research finds that the body's primary high-intensity fuel source, muscle glycogen, stores roughly 1,600 to 2,000 kcal. The average marathon runner burns approximately 100 calories per mile."),
      createBlock("With 2,000 calories divided by 100 calories per mile, we know that our internal fuel tank is typically depleted by mile 20. This is why most runners \"hit the wall\" between mile 18 and mile 20."),
      createBlock("Plan Your Sodium and Electrolyte Intake", "h2"),
      createBlock("If you are three to four weeks till your race day, it's crucial to make fluid and electrolyte management plan ahead. Your body is still under high training stress."),
      createBoldBlock("Determine Your Need:", " If you see white, crusty marks on your face, cap, or clothing after a run, you could be a \"salty sweater.\""),
      createBoldBlock("Test Electrolyte Supplements:", " If you suspect you need more than a sports drink, now is the time to buy and test sodium/salt tablets or high-sodium chews."),
      createBlock("Calculate Your Personalized Fuel Plan", "h2"),
      createBoldBlock("1. Carbohydrates (Energy Needs)"),
      createBlock("For endurance events longer than 90 minutes: Carbs per hour (g/hr) = 0.7 × Body Weight (kg)"),
      createBoldBlock("Example:", " A 65 kg runner → 0.7 × 65 = 45 g/hr of carbs"),
      createBoldBlock("2. Sodium (Electrolyte Needs)"),
      createBlock("Sweat sodium concentration varies, but most runners lose 500–1000 mg sodium per liter of sweat."),
      createBoldBlock("3. Fluid (Hydration Needs)"),
      createBlock("Measure your sweat rate by weighing yourself before and after a one-hour run in similar conditions. Plan to replace 60–80% of that rate per hour."),
      createBlock("Absolutely Nothing New on Race Day", "h2"),
      createBlock("We can't stress this enough: with only a couple of weeks left, you must lock down your strategy now. The biggest race-ending mistake runners make is introducing new foods, new brands of fuel, or new gear in the final few weeks."),
      createBlock("GI distress is the leading non-injury cause of DNF in endurance races. Your gut needs time to adapt to the specific sugar profiles in your gels."),
      createBlock("Next Steps for the Homestretch", "h2"),
      createBlock("By rehearsing your in-run fuel and locking down your gear now, you eliminate the \"fear of the unknown\" that is the biggest psychological challenge for runners."),
    ],
  },
  {
    title: "The Charity Runner's Playbook: Your Guide to Running for a Cause & Raising Real Money",
    slug: "charity-runners-playbook",
    description: "Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about. Featuring insights from Robin White, a Six-Star Marathon Finisher who has raised over $30,000 for charity.",
    publishedAt: "2025-11-28T00:00:00Z",
    content: [
      createBoldBlock("Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about.", " This guide features insights from Robin White, a Six-Star Marathon Finisher who has raised over $30,000 for charity across 13 campaigns."),
      createBlock("Meet Your Guide", "h2"),
      createBoldBlock("Robin White", " isn't just any runner – she's a powerhouse in the charity running community. Having completed all six World Marathon Majors and raised over $30,000 for the Bell Center across 13 campaigns, she brings deep experience to charity fundraising."),
      createBlock("How to Get Charity Bibs", "h2"),
      createBoldBlock("Most major marathons have two main paths:", " general entry (lottery or time-qualifying) and charity entries. Understanding those rules is half the battle."),
      createBlock("1. Start With a Cause That Truly Matters to You", "h3"),
      createBlock("Before you think about forms and deadlines, start with your \"why.\" Charities notice when your application is deeply personal versus generic."),
      createBlock("2. Learn How Each Race Handles Charity Bibs", "h3"),
      createBlock("Not every major works the same way. For races like New York, you can try the lottery first, and if you don't get in, turn to charity partners."),
      createBlock("3. Be Concrete About Your Fundraising Commitment", "h3"),
      createBlock("When you apply, go beyond \"I'll raise the minimum\" and outline what amount you're committing to and where that money is likely to come from."),
      createBlock("Proven Fundraising Strategies That Work", "h2"),
      createBoldBlock("1. Educate People About Your Cause"),
      createBlock("Robin didn't just drop a donation link and hope for the best. She spent time learning about the organizations she ran for and then sharing that with others."),
      createBoldBlock("2. Make the Ask Simple and Low-Friction"),
      createBlock("Her line captures it perfectly: \"If everyone reading this donated $5, that would make a huge difference.\""),
      createBoldBlock("3. Give People Something in Exchange"),
      createBlock("Robin gets creative with merch and small items so supporters feel they're getting something fun in return."),
      createBoldBlock("4. Host Events That Create Value and Community"),
      createBlock("Events like silent auctions work because they give people an excuse to gather and make giving feel like a shared experience."),
      createBoldBlock("5. Don't Underestimate the Power of Your Workplace"),
      createBlock("Your coworkers may not be getting hit with as many donation requests and may be excited to support a colleague."),
      createBoldBlock("6. Thank Every Donor Personally"),
      createBlock("Robin thanks every donor personally. This turns donors into long-term supporters who want to see you succeed."),
      createBlock("Key Takeaway", "h2"),
      createBlock("Remember: Charity running isn't just about the miles or the money – it's about community, purpose, and the joy of running for something bigger than yourself."),
    ],
  },
  {
    title: "Major Marathon Charity Guide: Timelines, Fundraising Minimums & Deadlines",
    slug: "major-marathon-charity-guide",
    description: "A practical, race-by-race guide to charity bibs for the World Marathon Majors. Learn fundraising minimums, application windows, and key deadlines for Boston, NYC, Chicago, Berlin, London, and Tokyo.",
    publishedAt: "2025-11-28T00:00:00Z",
    content: [
      createBlock("Dreaming of running a World Marathon Major but don't have a qualifying time—or struck out in the lottery? Charity entries are often the most reliable way in. This guide covers fundraising minimums, application windows, and key deadlines for all six majors."),
      createBlock("Quick Snapshot by Race", "h2"),
      createBoldBlock("Boston (April):", " ~$7,500–$10,000+ fundraising minimum"),
      createBoldBlock("New York City (November):", " ≥$3,500 minimum"),
      createBoldBlock("Chicago (October):", " ≥$2,200 minimum"),
      createBoldBlock("Berlin (September):", " ~$3,000–$4,000 equivalent"),
      createBoldBlock("London (April):", " ~£2,000–£3,000"),
      createBoldBlock("Tokyo (March):", " Min JPY 100,000 (~$650), but competitive bids go higher"),
      createBlock("Boston Marathon (April)", "h2"),
      createBlock("Boston is both the hardest to qualify for and one of the most expensive to access via charity. The B.A.A. runs an Official Charity Program with ~190+ nonprofit organizations."),
      createBlock("TCS New York City Marathon (November)", "h2"),
      createBlock("NYC might be the most charity-friendly of all the majors. NYRR runs an Official Charity Partner Program requiring at least $3,500 per runner."),
      createBlock("Bank of America Chicago Marathon (October)", "h2"),
      createBlock("Chicago offers one of the lowest fundraising minimums among the majors (~$2,200), making it a popular first charity marathon."),
      createBlock("BMW Berlin Marathon (September)", "h2"),
      createBlock("Berlin is popular for its fast course and being relatively accessible via charity compared to Boston or London."),
      createBlock("TCS London Marathon (April)", "h2"),
      createBlock("London is legendary for charity running. It regularly sets global records for one-day fundraising. Expect £2,000–£3,000+ for a charity place."),
      createBlock("Tokyo Marathon (March)", "h2"),
      createBlock("Tokyo is structurally different: the charity process happens before the general lottery and works more like a silent auction. Minimum donation is JPY 100,000."),
      createBlock("How to Use This Guide", "h2"),
      createBoldBlock("1. Pick your race, then work backwards.", " Start from the race date and note when lottery and charity windows usually open."),
      createBoldBlock("2. Estimate your fundraising capacity.", " First-time fundraisers might aim for Chicago or Berlin."),
      createBoldBlock("3. Research 3–5 charities per race.", " Look up their fundraising minimum and support offered."),
      createBoldBlock("4. Keep your story at the center.", " Your personal connection to the cause matters as much as the number you commit to."),
    ],
  },
  {
    title: "Simple Fueling for Taper Week",
    slug: "simple-fueling-for-taper-week",
    description: "Easy, runner-friendly meals to power you through the final crucial days! Learn how to nail your nutrition during taper week so your muscles are fully charged and ready on race day.",
    publishedAt: "2025-12-01T00:00:00Z",
    content: [
      createBoldBlock("Easy, runner-friendly meals to power you through the final crucial days!", " You're in the final stretch! Here's how to nail your nutrition during taper week so your muscles are fully charged and ready on race day."),
      createBlock("You made it! The hardest physical work is officially behind you. As your mileage drops, you might feel that itch to keep pushing. Fight that urge."),
      createBlock("The taper is where your body finally gets the rest it needs to absorb all those months of training. This is when your muscles repair, your energy systems recharge, and your legs get fresh again."),
      createBlock("The Biggest Nutrition Mistakes Runners Make During Taper", "h2"),
      createBlock("Mistake #1: Eating Too Light Because You're Training Less", "h3"),
      createBlock("This is hands-down the biggest mistake we see. Your body is still working hard during taper, just in a different way. It's repairing muscle damage and replenishing energy stores."),
      createBlock("Mistake #2: Cutting Carbs and Loading Up on Protein", "h3"),
      createBlock("Some runners think taper week is the time to \"lean out\" by cutting carbs. Not now. Carbohydrates are your priority during taper."),
      createBlock("Mistake #3: Losing Consistency", "h3"),
      createBlock("Taper week isn't the time for a new diet, intermittent fasting experiments, or cutting out food groups. Stick with what's been working."),
      createBlock("The Smart Way to Carb-Load: A Shift, Not a Stuffing", "h2"),
      createBlock("Forget that old-school image of gorging on massive bowls of pasta the night before the race. Modern sports nutrition takes a smarter approach."),
      createBlock("Starting about three days before your race, you systematically change the percentage of calories coming from carbs, from your typical 45-65% to around 65-75%."),
      createBlock("Runner-Friendly Meals for Taper Week", "h2"),
      createBoldBlock("1. Simple chicken and white rice bowl:", " A large portion of cooked white rice with a smaller portion of baked chicken breast."),
      createBoldBlock("2. Baked sweet potato toast:", " Slices of baked sweet potato topped with butter, jam, or cinnamon."),
      createBoldBlock("3. Oatmeal with banana:", " Oatmeal cooked with water or skim milk, sliced banana, and honey."),
      createBlock("Lock It In! No Experiments This Week", "h2"),
      createBlock("By taper week, your fueling plan is set. No new gels, drinks, or last-minute \"magic\" products."),
    ],
  },
];

// Homepage content matching current site
const homepage = {
  _type: 'homepage',
  heroTitle: 'Fuel Your Best Race',
  heroSubtitle: "Personalized nutrition plans for endurance athletes. Science-backed meal planning tailored to your training, your body, and your goals.",
  heroPrimaryButton: { label: 'Get Started Free', href: '#' },
  heroSecondaryButton: { label: 'Learn More', href: '#features' },
  problemTitle: "Training is hard enough. Nutrition shouldn't be.",
  problemDescription: "Most endurance athletes spend hours researching what to eat before, during, and after their workouts. We do the science so you can focus on the miles.",
  featuresTitle: 'How It Works',
  features: [
    { icon: 'user', title: 'Personalized Plans', description: 'Based on your body weight, training load, and food preferences' },
    { icon: 'lightning', title: 'Race Day Fuel', description: 'Exact carbs, sodium, and hydration calculated for your next event' },
    { icon: 'heart', title: 'Real Food First', description: 'No complicated supplements, just simple meals that work' },
  ],
  testimonialsTitle: 'What Athletes Are Saying',
  testimonials: [
    { quote: "Finally, a nutrition app that understands endurance athletes. My marathon times have improved since I started using Mealvana.", name: 'Sarah M.', role: 'Marathon Runner' },
    { quote: "The race day fueling calculator is a game-changer. No more bonking at mile 20!", name: 'Mike T.', role: 'Ultra Runner' },
    { quote: "Simple, science-backed, and actually practical. This is what I've been looking for.", name: 'Lisa K.', role: 'Triathlete' },
  ],
  faqTitle: 'Frequently Asked Questions',
  faqs: [
    { question: 'How do I get my personalized nutrition plan?', answer: "Simply download the app, enter your basic information (weight, training schedule, dietary preferences), and we'll generate a personalized nutrition plan tailored to your needs." },
    { question: 'What sports does Mealvana Endurance support?', answer: 'We support all endurance sports including running (5K to ultra), cycling, triathlon, swimming, and hiking. Our algorithms adapt to the specific demands of each sport.' },
    { question: 'Can I use this for race day nutrition?', answer: 'Absolutely! Our race day calculator provides exact carbohydrate, sodium, and hydration needs based on your event distance, expected pace, and conditions.' },
    { question: 'Is there a free trial?', answer: 'Yes! You can try Mealvana Endurance free for 14 days with full access to all features. No credit card required.' },
    { question: 'How is this different from other nutrition apps?', answer: 'Unlike generic calorie trackers, Mealvana Endurance is built specifically for endurance athletes. We focus on performance nutrition, including timing, macronutrient ratios, and race-specific fueling strategies.' },
  ],
  ctaTitle: 'Ready to Fuel Your Best Performance?',
  ctaSubtitle: 'Join thousands of endurance athletes who trust Mealvana for race-day nutrition.',
  ctaButton: { label: 'Download the App', href: '#' },
};

// Site settings
const siteSettings = {
  _type: 'siteSettings',
  siteName: 'Mealvana Endurance',
  siteDescription: 'Science-based nutrition plans for endurance athletes. Personalized fueling strategies for runners, cyclists, and triathletes.',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ],
  ctaButton: { label: 'Get Started', href: '#' },
  footerDescription: 'Personalized nutrition plans for endurance athletes. Science-backed meal planning tailored to your training, your body, and your goals.',
  footerLinks: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Features', href: '#features' },
    { label: 'FAQ', href: '#faq' },
  ],
};

async function migrate() {
  console.log('🚀 Starting full migration to Sanity...\n');

  // Create blog posts
  console.log('📝 Creating blog posts...');
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
      console.log(`   ✅ ${post.title}`);
    } catch (error) {
      console.error(`   ❌ ${post.title}: ${error.message}`);
    }
  }

  // Create homepage
  console.log('\n🏠 Creating homepage content...');
  try {
    const result = await client.create(homepage);
    console.log(`   ✅ Homepage created`);
  } catch (error) {
    console.error(`   ❌ Homepage: ${error.message}`);
  }

  // Create site settings
  console.log('\n⚙️ Creating site settings...');
  try {
    const result = await client.create(siteSettings);
    console.log(`   ✅ Site settings created`);
  } catch (error) {
    console.error(`   ❌ Site settings: ${error.message}`);
  }

  console.log('\n✨ Migration complete!');
  console.log('\n📌 Next steps:');
  console.log('   1. Go to https://sanity.io/manage/project/vg2p7rx4');
  console.log('   2. Review your content in the Studio');
  console.log('   3. Deploy to Vercel to see changes on your site');
}

migrate();
