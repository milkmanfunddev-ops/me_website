import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Helper to create a unique key for Sanity blocks
function key() {
  return Math.random().toString(36).substring(2, 12);
}

// Helper to create a text block
function textBlock(text, style = 'normal', marks = []) {
  return {
    _type: 'block',
    _key: key(),
    style,
    children: [{ _type: 'span', _key: key(), text, marks }],
    markDefs: [],
  };
}

// Helper to create a text block with mixed formatting (bold, links, etc.)
function richTextBlock(segments, style = 'normal') {
  const children = [];
  const markDefs = [];

  segments.forEach(segment => {
    if (typeof segment === 'string') {
      children.push({ _type: 'span', _key: key(), text: segment, marks: [] });
    } else if (segment.bold) {
      children.push({ _type: 'span', _key: key(), text: segment.text, marks: ['strong'] });
    } else if (segment.italic) {
      children.push({ _type: 'span', _key: key(), text: segment.text, marks: ['em'] });
    } else if (segment.link) {
      const linkKey = key();
      markDefs.push({ _type: 'link', _key: linkKey, href: segment.link });
      children.push({ _type: 'span', _key: key(), text: segment.text, marks: [linkKey] });
    }
  });

  return {
    _type: 'block',
    _key: key(),
    style,
    children,
    markDefs,
  };
}

// Helper to create a list item
function listItem(text, listType = 'bullet', level = 1) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: listType,
    level,
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs: [],
  };
}

// Helper to create a callout box
function callout(text, emoji = '💡', readTime = null) {
  return {
    _type: 'callout',
    _key: key(),
    emoji,
    text,
    readTime: readTime ? `${readTime} minutes` : null,
  };
}

// Helper to create a CTA box
function ctaBox(title, text, highlight, buttonText, buttonUrl) {
  return {
    _type: 'ctaBox',
    _key: key(),
    title,
    text,
    highlight,
    buttonText,
    buttonUrl,
  };
}

// Helper to create a data table
function dataTable(caption, headers, rows) {
  return {
    _type: 'dataTable',
    _key: key(),
    caption,
    headers,
    rows: rows.map(row => ({
      _type: 'object',
      _key: key(),
      cells: row,
    })),
  };
}

// ============================================
// POST 1: Master Your Marathon Fueling
// ============================================
const post1Content = [
  callout(
    "Learn how to perfect your marathon fueling in the final four weeks before race day. This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep—so you can avoid the wall and run with confidence. Spoiler alert: the Mealvana app saves you hours to crunch those numbers by yourself; plus a podcast for you to listen to in the homestretch to your race day!",
    '💡',
    6
  ),

  textBlock("You're four weeks out of your big race. Your training is almost complete, and the race-day details, your shoes, your pace strategy, your travel plans, are dominating your mind. But ask any marathon veteran: the most critical piece of \"gear\" you need to master is your fueling plan."),

  textBlock("You can have the best training block and the lightest shoes, but if you haven't rehearsed your in-run nutrition, you risk hitting the infamous wall. We recently sat down with Coach Alex Mororrow of Resolute Running (Birmingham, AL) on the Mealvana Endurance Podcast to discuss about how to eliminate this risk and turn your final long runs into successful fueling rehearsals."),

  textBlock("The math is simple: Why Fueling during the run is non-negotiable.", 'h3'),

  richTextBlock([
    "Sports physiology research finds that the body's primary high-intensity fuel source, ",
    { text: "muscle glycogen", bold: true },
    ", stores roughly 1,600 to 2,000 kcal [1]. The average marathon runner burns approximately 100 calories per mile."
  ]),

  textBlock("With 2,000 calories divided by 100 calories per mile (2000/100=20), we know that our internal fuel tank is typically depleted by mile 20. This is why most runners described as, \"hit the wall\", between mile 18 and mile 20. All of your gels, chews, liquids, whatever you brought with you on the run, is not to replace all the calories you burn, but to maintain blood sugar and spare your internal glycogen stores, and pushing that \"bonk\" point far past the finish line."),

  textBlock("Plan Your Sodium and Electrolyte Intake", 'h3'),

  textBlock("If you are three to four weeks till your race day, it's crucial to make fluid and electrolyte management plan ahead. Your body is still under high training stress. You need to find a plan that work specifically for your body. And your final peak runs are the last chance to fine-tune this essential element."),

  richTextBlock([
    "Research shows that adequate ",
    { text: "sodium replacement", bold: true },
    " is crucial for maintaining plasma volume and preventing common issues like muscle cramping and hyponatremia (low blood sodium). Current guidelines often recommend fluid containing ",
    { text: "0.5 to 0.7 grams of sodium per liter", bold: true },
    " of water to optimize fluid absorption and counter sweat losses [2]."
  ]),

  listItem("Determine Your Need: If you see white, crusty marks on your face, cap, or clothing after a run, you could be a \"salty sweater.\" While sports drinks often cover basic needs, heavy sweaters need to supplement to prevent cramping and fatigue.", 'bullet'),
  listItem("Test Electrolyte Supplements: If you suspect you need more than a sports drink, now is the time to buy and test sodium/salt tablets or high-sodium chews. Do not wait until race day to find out if they cause GI upset.", 'bullet'),
  listItem("Practice with Course Nutrition (The Warning): If you plan to rely on a course-provided sports drink or gel, you must purchase and practice with that exact brand and flavor now. Coach Alex warned against relying entirely on course support after an incident where a station ran out of fuel, causing a critical race deficit: \"I tell people practice with what you love, find what you love, and then bring it with you.\"", 'bullet'),

  textBlock("Calculate Your Personalized Fuel Plan", 'h3'),

  callout(
    "Instead of crunching numbers or juggling formulas, let Mealvana Endurance app do the work for you. Our app translates all the science—carb ratios, sodium needs, sweat rates—into clear, food-first guidance that fits your body, training volume, and preferences. You'll get a personalized fueling and hydration plan for your long runs and race day, built from real foods and trusted sports products, no spreadsheet required.",
    '💡'
  ),

  textBlock("You can use the following formulas to estimate your exact fueling and hydration needs based on your body weight, sweat rate, and race duration."),

  textBlock("1. Carbohydrates (Energy Needs)", 'h4'),
  textBlock("For endurance events longer than 90 minutes:"),
  textBlock("Carbs per hour (g/hr) = 0.7 × Body Weight (kg)"),
  textBlock("Example: A 65 kg runner → 0.7 × 65 = 45 g/hr of carbs"),
  listItem("That's about 1–1.5 gels or chews every 30–40 minutes.", 'bullet'),
  listItem("If your gut is well-trained, you can increase to 60–90 g/hr for marathon pace or faster efforts.", 'bullet'),

  textBlock("2. Sodium (Electrolyte Needs)", 'h4'),
  textBlock("Sweat sodium concentration varies, but most runners lose 500–1000 mg sodium per liter of sweat. Estimate your needs using sweat rate and sweat sodium test (or a mid-range assumption if unknown):"),
  textBlock("Sodium per hour (mg/hr) = Sweat rate (L/hr) × Sweat sodium concentration (mg/L)"),
  textBlock("Example: If you sweat 1 L/hr and are a moderate sweater (800 mg/L): → 1 × 800 = 800 mg sodium/hr"),
  textBlock("Use a mix of sports drinks and salt tablets to meet that target."),

  textBlock("3. Fluid (Hydration Needs)", 'h4'),
  textBlock("Measure your sweat rate by weighing yourself before and after a one-hour run in similar conditions:"),
  textBlock("Sweat rate (L/hr) = (Weight loss (kg) + Fluid intake (L)) / Time (hr)"),
  textBlock("Plan to replace 60–80% of that rate per hour during the race to avoid both dehydration and overhydration."),
  textBlock("Example: If you lose 1.2 L/hr, aim for 0.7–0.9 L/hr (roughly 700–900 mL/hr)."),

  textBlock("Quick Reference Summary", 'h4'),
  dataTable(
    "Quick Reference Summary",
    ["Metric", "Formula", "Typical Range", "Example (65 kg runner)"],
    [
      ["Carbs", "0.7 × body weight (kg) = g/hr", "40–90 g/hr", "45 g/hr"],
      ["Sodium", "sweat rate (L/hr) × sweat sodium (mg/L)", "500–1000 mg/L", "800 mg/hr"],
      ["Fluids", "(weight loss + intake)/time", "0.6–1.0 L/hr", "0.8 L/hr"],
    ]
  ),

  textBlock("Fine-tune these in your final long runs—your stomach is trainable, and so is your fueling plan."),

  textBlock("Absolutely Nothing New on Race Day", 'h3'),

  textBlock("We can't stress this enough: with only a couple of weeks left, you must lock down your strategy now. The biggest race-ending mistake runners make is introducing new foods, new brands of fuel, or new gear (even new socks!) in the final few weeks. It's simply the single biggest, most avoidable risk you can take."),

  textBlock("The research is clear: Gastrointestinal (GI) distress is the leading non-injury cause of DNF (Did Not Finish) in endurance races [3]. Your gut needs time to adapt to the specific sugar profiles in your gels or the specific composition of your sports drink. Introducing a novel food or supplement in the final week significantly increases the risk of GI upset on race day because your digestive system hasn't adapted to it. Keep it boring!"),

  textBlock("This \"nothing new\" rule extends beyond fuel and into your logistics and clothing:"),

  listItem("Final Kit Rehearsal: This is your last chance! You need to run your final long run (even if it's a shorter, tapered one) in the exact socks, shoes, shorts, and shirt you plan to wear on race day. This is your final chance to find any chafing points or hot spots before it's too late.", 'bullet'),
  listItem("Pack the Essentials: If you're traveling to the race, never put your racing shoes, shorts, or singlet in a checked bag. Coach Alex learned this the hard way after a travel incident with misplaced checked bags: \"Your entire race day kit... put in your carry-on,\" he advises. Don't risk having to run 26.2 miles in a brand new, untested pair of shoes!", 'bullet'),
  listItem("Start Your Logistics Checklist: Since you can't be adding in extra mileage, use this nervous energy to get organized. Begin your race-week logistics checklist now. Double-check that your travel and hotel are confirmed, know the Expo hours, and plan your route to the start line. It's the small logistical wins that build mental confidence.", 'bullet'),

  textBlock("Next Steps for the Homestretch", 'h3'),

  textBlock("By rehearsing your in-run fuel and locking down your gear now, you eliminate the \"fear of the unknown\" that Coach Alex describes as the biggest psychological challenge for runners."),

  ctaBox(
    "Fuel Your Best Race Yet",
    "This is where Mealvana Endurance provides the final layer of confidence to boost your performance. We transform generalized nutrition targets into personalized, food-first plans, taking the guesswork out of your race week.",
    "Limited Time: Get 1-year free access ($100 value) to the Mealvana Endurance nutrition app!",
    "Get Your Free Plan →",
    "/"
  ),

  richTextBlock([
    { text: "Ready to hear the entire game plan for the final weeks?", bold: true },
    " Coach Alex dives deep into carb-loading percentages, caffeine strategy, and the power of the \"fishing\" game for the final 10K. ",
    { text: "Listen to the full episode here.", link: "https://www.youtube.com/watch?v=Y2GnxIFiN7M" },
  ]),

  textBlock("References", 'h3'),
  textBlock("[1] Hawley, J. A., & Burke, L. M. (2010). Carbohydrate availability and exercise performance: current concepts and future challenges. European Journal of Sport Science, 10(4), 287-297."),
  textBlock("[2] Sawka, M. N., Burke, L. M., Eichner, E. R., Maughan, R. J., Montain, S. J., & Stachenfeld, N. S. (2007). American College of Sports Medicine position stand. Exercise and fluid replacement. Medicine and Science in Sports and Exercise, 39(2), 377-390."),
  textBlock("[3] Jeukendrup, A. E. (2010). Gastrointestinal problems in athletes: a review. European Journal of Sport Science, 10(6), 49-62."),
];

// ============================================
// POST 2: The Charity Runner's Playbook
// ============================================
const post2Content = [
  callout(
    "Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about. This guide features insights from Robin White, a Six-Star Marathon Finisher who has raised over $30,000 for charity across 13 campaigns.",
    '💡',
    8
  ),

  textBlock("Meet Your Guide", 'h2'),

  richTextBlock([
    { text: "Robin White", bold: true },
    " isn't just any runner – she's a powerhouse in the charity running community. Having completed all six World Marathon Majors and raised over $30,000 for the Bell Center across 13 campaigns, she brings deep experience to charity fundraising. As an active volunteer with the Bell Center Service Guild, she understands both sides of the charitable giving equation."
  ]),

  textBlock("In this guide, we're distilling her wisdom and community insights into actionable strategies for your charity running journey."),

  textBlock("How to Get Charity Bibs", 'h2'),

  richTextBlock([
    "Most major marathons have two main paths: ",
    { text: "general entry", bold: true },
    " (lottery or time-qualifying) and ",
    { text: "charity entries", bold: true },
    ". On paper that sounds simple, but as Robin explains, each race plays by slightly different rules—and understanding those rules is half the battle."
  ]),

  textBlock("1. Start With a Cause That Truly Matters to You", 'h3'),

  richTextBlock([
    "Before you think about forms and deadlines, start with your ",
    { text: "\"why.\"", bold: true },
  ]),

  textBlock("Robin has primarily run for Birmingham's Bell Center, often with a specific child in mind—her friend Kirsten's son Quinn, or her best friend's son Theo. For Tokyo, she stepped outside her comfort zone and chose Plan International because their \"Run for Girls\" mission aligned with her hopes for her own daughter."),

  textBlock("Charities notice when your application reads like:"),
  textBlock("\"I picked you because you're on the list,\"", 'blockquote'),
  textBlock("versus:"),
  textBlock("\"Here's why this cause is deeply personal to me.\"", 'blockquote'),

  textBlock("2. Learn How Each Race Handles Charity Bibs", 'h3'),

  textBlock("Not every major works the same way:"),

  listItem("For races like New York, you can try the lottery first, and if you don't get in, many runners then turn to charity partners. Local organizations (like Bell Center, KultureCity, Smile-A-Mile in Birmingham) often have a set number of bibs each year.", 'bullet'),
  listItem("Tokyo is different. There, the charity selection happens before the general lottery, and it's more like a bidding process. You commit to a fundraising amount, and the charity considers both your bid and your written \"why\" when deciding who gets a spot.", 'bullet'),

  textBlock("The takeaway: check the charity process for each race instead of assuming they all follow the same \"lottery first, charity after\" pattern."),

  textBlock("3. Be Concrete About Your Fundraising Commitment", 'h3'),

  textBlock("Charities need to know you'll actually hit your target."),

  textBlock("Robin:"),
  listItem("Researched past bid amounts for Tokyo by finding a spreadsheet of previous years' charity bids and number of spots.", 'bullet'),
  listItem("Set a realistic ceiling for what she was truly willing and able to raise.", 'bullet'),
  listItem("Felt confident because she had a track record raising money for the Bell Center.", 'bullet'),

  textBlock("When you apply, go beyond \"I'll raise the minimum\" and briefly outline:"),
  listItem("What amount you're committing to.", 'bullet'),
  listItem("Where that money is likely to come from (workplace, community, events, merch).", 'bullet'),
  listItem("Any prior fundraising you've successfully done.", 'bullet'),

  textBlock("4. Write a Strong \"Why I Want to Run for You\" Paragraph", 'h3'),

  textBlock("For Tokyo, Robin's charity considered not only her bid but also a short written statement. She wrote about being a single mom, wanting her daughter to have every opportunity, and why \"Run for Girls\" genuinely mattered to her."),

  richTextBlock([
    "Later, in a Tokyo Facebook group, she saw someone who had ",
    { text: "bid more than she did", bold: true },
    " but wasn't selected. That reinforced her belief that the ",
    { text: "story", italic: true },
    " matters—not just the number."
  ]),

  textBlock("Your application paragraph doesn't need to be long, but it should be:"),
  listItem("Specific (what in your life connects you to this cause?)", 'bullet'),
  listItem("Honest (no generic \"I've always admired your work\" fluff)", 'bullet'),
  listItem("Clear about why you want to represent this charity at this race", 'bullet'),

  textBlock("5. Reach Out Early to Charity Partners", 'h3'),

  textBlock("For races like New York, some charities already know they'll have bibs before the general lottery even opens. Robin recommends reaching out early to organizations that regularly have entries—especially local ones."),

  textBlock("Why early contact helps:"),
  listItem("You get a longer runway to fundraise.", 'bullet'),
  listItem("You're on their radar as someone genuinely interested, not just scrambling after a lottery rejection.", 'bullet'),

  textBlock("Think of yourself less as a random applicant and more as someone starting a relationship with the charity."),

  richTextBlock([
    { text: "For detailed timelines, fundraising minimums by race, and application deadlines, see our comprehensive ", italic: true },
    { text: "Major Marathon Charity Guide", link: "/blog/major-marathon-charity-guide-timelines-deadlines" },
    { text: ".", italic: true },
  ]),

  textBlock("Proven Fundraising Strategies That Work", 'h2'),

  textBlock("In our conversation with Robin, six themes came up again and again. Together, they form a simple playbook you can adapt for your own charity race."),

  textBlock("1. Educate People About Your Cause", 'h3'),

  textBlock("Robin didn't just drop a donation link and hope for the best. She spent time learning about the organizations she ran for and then sharing that with others."),

  richTextBlock([
    "As she put it, she really felt that ",
    { text: "\"getting the education out there about the organization was making a difference.\"", italic: true },
    " When people understand what the charity actually does—and who it helps—they're far more likely to give and to feel good about it."
  ]),

  richTextBlock([
    { text: "How to use this:", bold: true },
  ]),
  listItem("Learn a few meaningful facts or stories about your charity.", 'bullet'),
  listItem("Share those in your posts, emails, and conversations—don't just say \"please donate.\"", 'bullet'),

  textBlock("2. Make the Ask Simple and Low-Friction", 'h3'),

  richTextBlock([
    "A lot of runners are nervous about asking for money. Robin totally gets that: ",
    { text: "\"No one likes to ask for money.\"", italic: true },
  ]),

  richTextBlock([
    "Her approach is to ",
    { text: "make the ask very simple", bold: true },
    ":"
  ]),
  listItem("Clearly explain what the money is for.", 'bullet'),
  listItem("Invite people to give a small, concrete amount—like $5—instead of a vague \"donate whatever.\"", 'bullet'),
  listItem("Release the pressure: if people can't or don't want to donate, that's okay.", 'bullet'),

  textBlock("Her line captures it perfectly:"),
  textBlock("\"If everyone reading this donated $5, that would make a huge difference.\"", 'blockquote'),

  richTextBlock([
    { text: "How to use this:", bold: true },
  ]),
  listItem("Use one clear number (\"$5\" or \"$10\").", 'bullet'),
  listItem("Pair it with a one-sentence explanation of your cause.", 'bullet'),
  listItem("Let people know there's no guilt if they can't give.", 'bullet'),

  textBlock("3. Give People Something in Exchange", 'h3'),

  richTextBlock([
    "Robin also gets creative with ",
    { text: "merch and small items", bold: true },
    " so supporters feel they're getting something fun in return:"
  ]),
  listItem("She designed \"Run the Ham\" shirts (Run Birmingham → Run the Ham) and sold them to raise money.", 'bullet'),
  listItem("Around Valentine's Day she followed up with \"Love the Ham\" shirts.", 'bullet'),
  listItem("She's also done pompom beanies (\"little hats\") tied to her fundraising.", 'bullet'),

  textBlock("It's still a donation—but it feels more like buying something cool from a friend."),

  richTextBlock([
    { text: "How to use this:", bold: true },
  ]),
  listItem("Create a simple shirt, hat, bracelet, or sticker tied to your race or city.", 'bullet'),
  listItem("Make it clear that a portion (or all) of the price goes to your fundraiser.", 'bullet'),

  textBlock("4. Host Events That Create Value and Community", 'h3'),

  richTextBlock([
    "One of the earliest efforts Robin saw was a ",
    { text: "silent auction party", bold: true },
    " hosted at a friend's house: people donated items, gathered, and bid—and the evening turned into a fun social event ",
    { text: "and", italic: true },
    " a successful fundraiser."
  ]),

  textBlock("Events like this work because they:"),
  listItem("Give people an excuse to gather.", 'bullet'),
  listItem("Make giving feel like a shared experience, not a solitary transaction.", 'bullet'),

  richTextBlock([
    { text: "How to use this:", bold: true },
  ]),
  listItem("Host a small gathering: a silent auction, movie night, or themed party.", 'bullet'),
  listItem("Ask friends and local businesses to donate items or services.", 'bullet'),
  listItem("Charge a simple entry fee or encourage bids, with proceeds going to your charity.", 'bullet'),

  textBlock("5. Don't Underestimate the Power of Your Workplace", 'h3'),

  richTextBlock([
    "One thing that surprised both of us: ",
    { text: "your workplace can be a fundraising goldmine.", bold: true },
  ]),

  textBlock("In the running community, people are generous—but there's also fundraising fatigue when everyone is asking at once. Your coworkers, on the other hand, may:"),
  listItem("Not be getting hit with as many donation requests.", 'bullet'),
  listItem("Be excited to support a colleague doing something hard and meaningful.", 'bullet'),
  listItem("Have access to company giving programs or nonprofit funds.", 'bullet'),

  richTextBlock([
    { text: "How to use this:", bold: true },
  ]),
  listItem("Ask if your company has a nonprofit fund or matching program.", 'bullet'),
  listItem("Run a simple bake sale, lunch, or casual Friday fundraiser at work.", 'bullet'),
  listItem("Don't forget your spouse/partner's workplace too.", 'bullet'),

  textBlock("6. Take a Moment to Acknowledge Each Person Individually", 'h3'),

  richTextBlock([
    "Finally, Robin's most beautiful habit: she ",
    { text: "thanks every donor personally.", bold: true },
  ]),

  textBlock("She says she always takes a moment to thank each person individually—and even when someone donates anonymously, if she can figure out who it is, she still reaches out privately."),

  textBlock("For her, it's not just about the dollar amount—she thinks about how that person's donation impacts the organization, her fundraising, and her personally."),

  richTextBlock([
    { text: "How to use this:", bold: true },
  ]),
  listItem("Send a quick DM, text, email, or handwritten note to each donor.", 'bullet'),
  listItem("Tell them specifically: \"Here's what your donation helps do,\" and \"Here's why your support means so much to me personally.\"", 'bullet'),

  textBlock("This turns donors into long-term supporters who want to see you succeed—both in your fundraising and at the finish line."),

  textBlock("Community Recognition", 'h2'),

  richTextBlock([
    "This wisdom comes from the generous sharing of ",
    { text: "Birmingham Track Club", link: "https://www.birminghamtrackclub.com" },
    " members who contributed their experiences and insights. Special recognition goes to ",
    { text: "Jamie Lane Trimble", bold: true },
    ", the BTC President who encouraged this research, and ",
    { text: "Rachel Bouley", bold: true },
    ", whose workplace fundraising strategies have become a model for others."
  ]),

  richTextBlock([
    "Currently fundraising members include ",
    { text: "Jason Zajac", bold: true },
    ", who's pursuing the Tokyo Marathon opportunity, along with ",
    { text: "Kat Nichols", bold: true },
    " and ",
    { text: "Chris Campo", bold: true },
    " working toward their goals for the NYC Marathon. ",
    { text: "Ruth Kles, Joey Saffold, Haley Flannery, Allison Hoover, Rebecca Williamson", bold: true },
    ", and ",
    { text: "Katie Pirkle", bold: true },
    " all contributed valuable lessons from their fundraising journeys."
  ]),

  textBlock("Key Takeaway", 'h2'),

  textBlock("Remember: Charity running isn't just about the miles or the money – it's about community, purpose, and the joy of running for something bigger than yourself."),

  ctaBox(
    "Fuel Your Charity Run",
    "Training for a charity marathon? Mealvana Endurance helps you nail your nutrition so you can focus on what matters most—crossing that finish line and making an impact for your cause.",
    "Limited Time: Get 1-year free access ($100 value) to the Mealvana Endurance nutrition app!",
    "Get Your Free Plan →",
    "/"
  ),

  textBlock("Resources", 'h2'),

  richTextBlock([
    "Ready to dive deeper? Check out our ",
    { text: "Major Marathon Charity Guide", link: "/blog/major-marathon-charity-guide-timelines-deadlines" },
    " featuring application deadlines, lottery versus charity entry strategies, fundraising minimums by race, and a complete timeline cheat sheet for all six World Marathon Majors."
  ]),

  richTextBlock([
    { text: "Happy Running & Happy Fundraising!", bold: true },
  ]),
];

// ============================================
// POST 3: Major Marathon Charity Guide
// ============================================
const post3Content = [
  callout(
    "Dreaming of running a World Marathon Major but don't have a qualifying time—or struck out in the lottery? Charity entries are often the most reliable way in. This guide covers fundraising minimums, application windows, and key deadlines for all six majors.",
    '💡',
    10
  ),

  richTextBlock([
    "Below is a ",
    { text: "practical, race-by-race guide", bold: true },
    " to how charity bibs work for the big six: Boston, New York City, Chicago, Berlin, London, and Tokyo. Fundraising minimums and timelines change every year, so treat this as a ",
    { text: "pattern guide", bold: true },
    ", not a legal document—always confirm details with the race and your chosen charity."
  ]),

  textBlock("Quick Snapshot by Race", 'h2'),

  dataTable(
    "Quick Snapshot by Race",
    ["Marathon", "Typical Race Month", "Charity Fundraising Range*", "Key Application Window"],
    [
      ["Boston", "April", "~US$7,500–$10,000+ (some >$20,000)", "Charity teams recruit late summer/fall for April"],
      ["New York City", "November", "≥US$3,500 (many $3,500–$5,000)", "Lottery in February; charity teams recruit around/after"],
      ["Chicago", "October", "≥US$2,200 (many $2,200–$2,500+)", "Charity entries open early, remain until spots fill"],
      ["Berlin", "September", "~US$3,000–$4,000 equivalent", "Opens once general registration/lottery is underway"],
      ["London", "April", "~£2,000–£3,000 (some higher/lower)", "Ballot opens right after race; charity rolling through year"],
      ["Tokyo", "March", "Min JPY 100,000 (~US$650); many higher", "Late June–mid July, before the regular lottery"],
    ]
  ),

  richTextBlock([
    { text: "*Ranges based on current examples from official charity teams and large nonprofits as of late 2025. Always check your specific charity.", italic: true },
  ]),

  textBlock("Boston Marathon (April)", 'h2'),

  textBlock("Boston is both the hardest to qualify for and one of the most expensive to access via charity."),

  textBlock("How Charity Entry Works", 'h3'),

  richTextBlock([
    "The Boston Athletic Association (B.A.A.) runs an ",
    { text: "Official Charity Program", bold: true },
    " that gives invitational entries to ~190+ nonprofit organizations for the 2026 race. Those organizations then recruit runners who commit to a fundraising minimum."
  ]),

  textBlock("Typical Fundraising Minimums", 'h3'),

  textBlock("Minimums vary by charity, but current examples include:"),
  listItem("The B.A.A.'s own charity team requires at least US$8,500 for the 2024–2025 cycle.", 'bullet'),
  listItem("Another Boston Marathon charity, Trinity Boston Connects, also sets an US$8,500 minimum.", 'bullet'),
  listItem("Some high-profile charities set US$20,000 minimums for their Boston teams.", 'bullet'),

  richTextBlock([
    "Realistically, you should expect ",
    { text: "US$7,500–$10,000+", bold: true },
    ", and be prepared for considerably more with certain organizations."
  ]),

  textBlock("Key Timelines & Deadlines", 'h3'),

  listItem("Boston typically announces its Official Charity Program list for a given year in early fall (e.g., October for the following April).", 'bullet'),
  listItem("Individual charities open applications on their own schedules but often recruit from fall through early winter for the race the following April.", 'bullet'),
  listItem("Many ask you to hit certain interim milestones (e.g., 50–80% of your goal before race day), with final deadlines a few weeks after the race.", 'bullet'),

  textBlock("TCS New York City Marathon (November)", 'h2'),

  textBlock("NYC might be the most charity-friendly of all the majors in terms of structure and communication."),

  textBlock("How Charity Entry Works", 'h3'),

  richTextBlock([
    "NYRR (New York Road Runners) runs an ",
    { text: "Official Charity Partner Program", bold: true },
    " with different partner levels. Each charity sets its own fundraising minimum, but NYRR requires that minimum to be ",
    { text: "at least US$3,500 per runner", bold: true },
    "."
  ]),

  textBlock("Typical Fundraising Minimums", 'h3'),

  textBlock("Examples from current 2025–2026 charity teams:"),
  listItem("Many official charities list US$3,000–$3,500 minimums.", 'bullet'),
  listItem("Some large hospital foundations and marquee nonprofits require US$5,000+.", 'bullet'),

  richTextBlock([
    "So in practice, plan for ",
    { text: "US$3,500–$5,000", bold: true },
    " as a realistic band."
  ]),

  textBlock("Key Timelines & Deadlines", 'h3'),

  listItem("The non-guaranteed entry drawing (lottery) for NYC usually runs in February (e.g., Feb 11–25 for the 2025 race), with results announced in early March.", 'bullet'),
  listItem("Charity partners often start recruiting: early in the year (some before the lottery), and more aggressively after lottery results, targeting runners who didn't get in.", 'bullet'),
  listItem("Many charities require: 50% or so of your minimum by late summer/early fall, full amount due in the weeks leading up to race day.", 'bullet'),

  textBlock("Bank of America Chicago Marathon (October)", 'h2'),

  richTextBlock([
    "Chicago offers one of the ",
    { text: "lowest fundraising minimums", bold: true },
    " among the majors, making it a popular first charity marathon."
  ]),

  textBlock("How Charity Entry Works", 'h3'),

  richTextBlock([
    "The Chicago Marathon has an ",
    { text: "Official Charity Program", bold: true },
    ". Only charities in this program get guaranteed entries for their runners."
  ]),

  textBlock("Typical Fundraising Minimums", 'h3'),

  listItem("The official program requires each participant to raise at least US$2,200, though individual charities may set higher goals.", 'bullet'),
  listItem("Some charities list US$2,500 or more as their required minimum.", 'bullet'),

  richTextBlock([
    "Expect ",
    { text: "US$2,200–$2,500", bold: true },
    " as your baseline."
  ]),

  textBlock("Key Timelines & Deadlines", 'h3'),

  listItem("The 2025 Chicago Marathon is on October 12, 2025, with the 2026 edition on October 11, 2026.", 'bullet'),
  listItem("The general application window for non-charity entries can close months before the race; when that's done, charity entries remain one of the last ways in.", 'bullet'),
  listItem("Many charities close applications in late winter or early spring for the following October race, or sooner once their bib allotment is spoken for.", 'bullet'),

  textBlock("BMW Berlin Marathon (September)", 'h2'),

  textBlock("Berlin is popular for its fast course and for being relatively accessible via charity compared to Boston or London."),

  textBlock("How Charity Entry Works", 'h3'),

  richTextBlock([
    "The Berlin Marathon works with ",
    { text: "official charity partners", bold: true },
    ". Runners who choose an official partner get a ",
    { text: "guaranteed starting place", bold: true },
    " in exchange for meeting that charity's fundraising target."
  ]),

  textBlock("Typical Fundraising Minimums", 'h3'),

  textBlock("Minimums vary widely depending on the organization and country, but examples include:"),
  listItem("ASAN's (Autistic Self Advocacy Network) team for the 2026 Berlin Marathon sets a US$3,500 fundraising minimum.", 'bullet'),
  listItem("Other charities such as the Michael J. Fox Foundation and Free to Run set their own targets, generally in the US$3,000–$4,000 range or equivalent.", 'bullet'),

  textBlock("Key Timelines & Deadlines", 'h3'),

  listItem("Charity places typically open once the general registration/lottery process is defined for a given year.", 'bullet'),
  listItem("Many international charity partners recruit 9–12 months before race day, with fundraising milestones spread through the spring and summer.", 'bullet'),

  textBlock("TCS London Marathon (April)", 'h2'),

  textBlock("London is legendary for charity running. It regularly sets global records for one-day fundraising."),

  textBlock("How Charity Entry Works", 'h3'),

  textBlock("Runners can get into London by:"),
  listItem("Public ballot", 'bullet'),
  listItem("Good for Age (UK only)", 'bullet'),
  listItem("Travel partners", 'bullet'),
  listItem("Charity places", 'bullet'),

  textBlock("Charities receive an allocation of bibs and recruit runners who commit to fundraising targets."),

  textBlock("Typical Fundraising Minimums", 'h3'),

  textBlock("London charity minimums are usually quoted in pounds:"),
  listItem("Some major UK charities list £2,000–£2,500 as their minimum fundraising target for a charity place.", 'bullet'),
  listItem("Others go higher; for example, some teams set £3,000 (or US$5,000 for US-based charity teams).", 'bullet'),
  listItem("A few have lower or \"raise what you can\" expectations for runners who already have a ballot place.", 'bullet'),

  richTextBlock([
    "A safe planning band is ",
    { text: "£2,000–£3,000+", bold: true },
    " for a charity-place runner."
  ]),

  textBlock("Key Timelines & Deadlines", 'h3'),

  listItem("The public ballot for the next London Marathon typically opens right after the current year's race and stays open for about a week. For 2026, for example, media reports point to an April 26–May 2, 2025 window, with results notified in July.", 'bullet'),
  listItem("Many charities: open their application forms soon after the ballot closes, allocate places gradually from mid-year through the winter, require multiple fundraising milestones (e.g., 25% by January, 80% by race day).", 'bullet'),

  textBlock("Tokyo Marathon (March)", 'h2'),

  richTextBlock([
    "Tokyo is the most structurally different: the charity process happens ",
    { text: "before", bold: true },
    " the general lottery and works more like a ",
    { text: "silent auction", bold: true },
    "."
  ]),

  textBlock("How Charity Entry Works", 'h3'),

  listItem("The Tokyo Marathon Charity Program lets runners choose from dozens of participating organizations and pledge a donation.", 'bullet'),
  listItem("For the 2026 race, the program lists 39 organizations, with a minimum donation of JPY 100,000 to become a charity runner.", 'bullet'),
  listItem("In practice, runners \"bid\" a donation amount; higher commitments and strong personal statements often improve your chances of being selected. Runners and bloggers describe it as a \"silent auction\" style system, with typical successful bids exceeding the minimum.", 'bullet'),

  textBlock("Typical Fundraising Minimums", 'h3'),

  listItem("Minimum required donation: JPY 100,000 (about US$650–$700, depending on exchange rates).", 'bullet'),
  listItem("Many charities set \"recommended\" or typical donation levels much higher, often JPY 150,000–250,000+, and some popular charities see accepted bids around JPY 200,000 or more in recent years.", 'bullet'),

  richTextBlock([
    "You can fundraise that money back from others, but from Tokyo's perspective, ",
    { text: "you are personally committing to donate", bold: true },
    " that amount."
  ]),

  textBlock("Key Timelines & Deadlines", 'h3'),

  listItem("The Tokyo Marathon charity entry window typically runs for a few weeks in late June to mid-July (e.g., June 26–July 13 for the 2024 cycle).", 'bullet'),
  listItem("After charity runners are selected and donations confirmed, the general lottery for non-charity entries takes place later.", 'bullet'),
  listItem("Payment deadlines are strict; if you don't complete your donation within the specified period (often within ~45 days), you can lose your spot.", 'bullet'),

  textBlock("How to Use This Guide", 'h2'),

  textBlock("A few practical tips to make this guide actually useful:"),

  textBlock("1. Pick your race, then work backwards.", 'h3'),
  textBlock("Start from the race date (e.g., April for Boston/London, November for NYC) and note when lottery and charity windows usually open."),

  textBlock("2. Estimate your fundraising capacity.", 'h3'),
  listItem("First-time fundraisers might aim for Chicago or Berlin.", 'bullet'),
  listItem("Experienced fundraisers with strong networks might tackle Boston, Tokyo, or London.", 'bullet'),

  textBlock("3. Research 3–5 charities per race.", 'h3'),
  textBlock("Look up:"),
  listItem("Their fundraising minimum", 'bullet'),
  listItem("Whether they offer coaching, events, or fundraising support", 'bullet'),
  listItem("How competitive their application process is (many ask detailed questions about your \"why\" and your fundraising plan).", 'bullet'),

  textBlock("4. Watch for milestones and deadlines.", 'h3'),
  textBlock("A lot of charities now require:"),
  listItem("A percentage of your goal by a mid-campaign date", 'bullet'),
  listItem("Full amount by race week or within a set time after race day", 'bullet'),

  textBlock("5. Keep your story at the center.", 'h3'),
  richTextBlock([
    "As Robin's Tokyo experience shows, your ",
    { text: "personal connection to the cause", bold: true },
    " and the quality of your written application can matter just as much as the number you commit to."
  ]),

  ctaBox(
    "Ready to Run for a Cause?",
    "Once you've secured your charity bib, Mealvana Endurance helps you nail your nutrition plan so you can focus on training and fundraising—not spreadsheets.",
    "Limited Time: Get 1-year free access ($100 value) to the Mealvana Endurance nutrition app!",
    "Get Your Free Plan →",
    "/"
  ),

  richTextBlock([
    { text: "Want fundraising strategies that actually work?", bold: true },
    " Check out our companion guide: ",
    { text: "The Charity Runner's Playbook", link: "/blog/charity-runners-playbook-guide-fundraising" },
    " featuring insights from Robin White, a Six-Star Marathon Finisher who has raised over $30,000 for charity."
  ]),

  richTextBlock([
    { text: "Happy Running & Happy Fundraising!", bold: true },
  ]),
];

// ============================================
// POST 4: Simple Fueling for Taper Week
// ============================================
const post4Content = [
  callout(
    "Easy, runner-friendly meals to power you through the final crucial days! You're in the final stretch! Here's how to nail your nutrition during taper week so your muscles are fully charged and ready on race day. We'll cover the taper fueling paradox, the smart way to carb-load, and share simple recipes that actually work.",
    '💡',
    7
  ),

  textBlock("You made it! The hardest physical work is officially behind you. As your mileage drops, you might feel that itch to keep pushing. Fight that urge. Here's the truth: your instinct is to exercise to get fitter, but at this point, more training won't make you stronger. It'll just wear you out."),

  textBlock("The taper is where your body finally gets the rest it needs to absorb all those months of training. This is when your muscles repair, your energy systems recharge, and your legs get fresh again. You need well-rested legs full of energy on race day, not tired legs carrying the weight of one more \"just to be sure\" workout. And the last thing you want is to risk an injury in the final week that sidelines all your hard work."),

  textBlock("As Coach Alex Mororrow from Resolute Running in Birmingham, AL, put it on our Mealvana Endurance Podcast: the work now isn't done on your feet, it's done at the dinner table."),

  textBlock("The Biggest Nutrition Mistakes Runners Make During Taper", 'h3'),

  textBlock("Here's where things get tricky. As your training volume drops, you'll notice something: you're less hungry, you're not burning as many calories, and you might worry about gaining weight. This is where most runners stumble."),

  textBlock("Mistake #1: Eating Too Light Because You're Training Less", 'h3'),

  textBlock("This is hands-down the biggest mistake we see. Your first instinct is to cut calories since you're running fewer miles. It makes logical sense, right? Wrong. Your body is still working hard during taper, just in a different way. It's repairing muscle damage, replenishing energy stores, and preparing for race day. All of that requires fuel."),

  textBlock("If you drastically cut calories, especially carbs, you're basically hitting the brakes on recovery. You'll show up on race day with partially filled energy tanks, and that's when you hit the wall around mile 20."),

  textBlock("Mistake #2: Cutting Carbs and Loading Up on Protein", 'h3'),

  textBlock("Some runners think taper week is the time to \"lean out\" by cutting carbs and eating more protein. Not now. While protein is important for muscle repair and should stay steady, carbohydrates are your priority during taper. Your body stores carbs as glycogen (your fuel tank), and the taper is when you need to fill that tank to the brim."),

  textBlock("Mistake #3: Losing Consistency", 'h3'),

  textBlock("You've been fueling consistently for months. Don't change everything now. Taper week isn't the time for a new diet, intermittent fasting experiments, or cutting out food groups. Stick with what's been working."),

  textBlock("The Real Cost of Cutting Calories", 'h3'),

  textBlock("Here's what many runners don't realize: if you lose 5 pounds during taper week, you're not getting faster. You're likely losing muscle mass and depleting glycogen stores. That weight loss might feel good on the scale, but it'll cost you minutes on race day."),

  textBlock("Coach Alex reminds his athletes that it's completely normal (and actually desirable) to gain a couple of pounds during race week. That's mostly water binding to stored glycogen, not you \"getting out of shape.\""),

  textBlock("Why Recovery Fueling Matters", 'h3'),

  textBlock("Your body stores carbohydrates as glycogen. Think of it as your fuel tank. As we covered in our 4-week fueling guide, many runners experience \"hitting a wall\" around mile 20. That's your glycogen running out."),

  textBlock("The Science Behind It", 'h4'),

  textBlock("During taper, your goal is to top off that fuel tank completely and even slightly overfill it through something called supercompensation. But here's the catch: this process needs energy [1]. If you drastically cut calories, especially carbs, you're basically slowing down recovery and preventing your glycogen stores from fully recharging."),

  richTextBlock([
    { text: "The bottom line:", bold: true },
    " Your body needs fuel to repair itself, not less food. Keep your overall calorie intake relatively stable, but intentionally shift what you're eating to prioritize simple, high-quality carbohydrates."
  ]),

  textBlock("The Smart Way to Carb-Load: A Shift, Not a Stuffing", 'h3'),

  textBlock("Forget that old-school image of gorging on massive bowls of pasta the night before the race. That's a recipe for stomach disaster. Modern sports nutrition takes a much smarter approach: a controlled, proportional shift that starts about three days out."),

  textBlock("Here's How It Works:", 'h4'),

  textBlock("Based on research and Coach Alex's guidance, you're not dramatically increasing how much you eat (which risks GI issues). Instead, starting about three days before your race, you systematically change the percentage of calories coming from carbs, from your typical 45-65% during training to around 65-75% during the final 2-3 days before race day [2]. In practical terms, this means aiming for 8-12 grams of carbohydrate per kilogram of body weight in the final 24-36 hours before your race [3]."),

  textBlock("You do this by gently reducing your portions of fats and proteins while keeping your overall meal size about the same."),

  richTextBlock([
    { text: "Want to do the math?", bold: true },
    " If you'd like to calculate your exact carbohydrate needs based on your body weight and race distance, check out the ",
    { text: "carb-loading calculator at Featherstone Nutrition", link: "https://www.featherstonenutrition.com/carb-loading/" },
    ". It'll give you personalized targets for your 2-3 day carb load."
  ]),

  textBlock("Keep it Simple and Low-fiber:", 'h4'),

  textBlock("As race day gets closer (especially the final 24-48 hours), prioritize simple, low-fiber carbs. Here's why: fiber and complex fats slow down digestion [4]. The last thing you want is undigested food sitting in your gut on race morning. That's a major cause of race-day bathroom disasters."),

  textBlock("He also said, \"Switch to simple, easily digestible carbohydrates like white rice, white potatoes, and white bread. These move through your system quickly, preventing GI distress on race day morning.\""),

  textBlock("Runner-Friendly Meals for Taper Week", 'h3'),

  textBlock("Your taper meals should be quick to make, easy to digest, and simple to repeat. Think clean comfort food that hits that 70% carb target without unnecessary fiber or fat."),

  listItem("Simple chicken and white rice bowl: The classic for a reason. A large portion of cooked white rice with a smaller portion of basic baked or boiled chicken breast. You can add a small amount of steamed, skinned zucchini or peeled carrots, but keep the oil, spices, and sauces minimal.", 'number'),
  listItem("Baked sweet potato toast: Slices of baked sweet potato (or white potato) topped with a bit of butter, jam, or cinnamon. Great earlier in taper week. In those final 24–48 hours, switch to peeled white potatoes or white rice if you know you're sensitive to fiber.", 'number'),
  listItem("Oatmeal with banana: Oatmeal cooked with water or skim milk, sliced banana, and a small drizzle of honey. During the final 48 hours, skip the nuts and seeds (they're high in fiber and fat).", 'number'),

  textBlock("Lock It In! No Experiments This Week", 'h3'),

  textBlock("By taper week, your fueling plan is set. No new gels, drinks, or last-minute \"magic\" products."),

  richTextBlock([
    "👉 For a full breakdown of the \"nothing new\" rule (including GI distress, kit rehearsal, and travel tips), ",
    { text: "see our 4-week fueling guide.", link: "/blog/master-marathon-fueling-complete-guide" },
  ]),

  ctaBox(
    "Fuel Your Best Race Yet",
    "This is where Mealvana Endurance provides the final layer of confidence. We transform generalized nutrition targets into personalized, food-first plans, taking the guesswork out of your race week. Our app provides food-first menus, ensuring you hit the precise macro targets for your distance without having to weigh or track food.",
    "Limited Time: Get 1-year free access ($100 value) to the Mealvana Endurance nutrition app!",
    "Get Your Free Plan →",
    "/"
  ),

  richTextBlock([
    { text: "Want More?", bold: true },
    " Coach Alex dives deep into carb-loading percentages, the do's and don'ts of tapering, and more in our episode. ",
    { text: "Listen to the full episode here.", link: "https://www.youtube.com/watch?v=Y2GnxIFiN7M" },
  ]),

  textBlock("References", 'h3'),

  textBlock("[1] Hawley, J. A., Schabort, E. J., Noakes, T. D., & Dennis, S. C. (1997). Carbohydrate-loading and exercise performance: an update. Sports Medicine, 24(2), 73-81."),
  textBlock("[2] Kortebein, K. (2022). Taper nutrition and carbo-loading for your next goal race. Athlos Running. https://www.athlosrunning.com/post/taper-nutrition-and-carbo-loading-for-your-next-goal-race"),
  textBlock("[3] Burke, L. M., Hawley, J. A., Wong, S. H. S., & Jeukendrup, A. E. (2011). Carbohydrates for training and competition. Journal of Sports Sciences, 29(sup1), S17-S27."),
  textBlock("[4] de Oliveira, E. P., Burini, R. C., & Jeukendrup, A. (2014). Gastrointestinal complaints during exercise: prevalence, etiology, and nutritional recommendations. Sports Medicine, 44(Suppl 1), S79-S85."),
];

// ============================================
// Posts to create/update
// ============================================
const posts = [
  {
    _id: 'post-master-marathon-fueling',
    _type: 'post',
    title: 'Master Your Marathon Fueling: A Complete 4-Week Guide',
    slug: { current: 'master-marathon-fueling-complete-guide' },
    author: 'Mealvana Team',
    readTime: 6,
    description: 'Learn how to perfect your marathon fueling in the final four weeks before race day. This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep—so you can avoid the wall and run with confidence.',
    tags: ['nutrition', 'marathon', 'training', 'fueling', 'carbs', 'hydration', 'race-prep'],
    publishedAt: '2025-11-12T00:00:00Z',
    content: post1Content,
  },
  {
    _id: 'post-charity-runners-playbook',
    _type: 'post',
    title: "The Charity Runner's Playbook: Your Guide to Running for a Cause & Raising Real Money",
    slug: { current: 'charity-runners-playbook-guide-fundraising' },
    author: 'Mealvana Team',
    readTime: 8,
    description: 'Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about. Featuring insights from Robin White, a Six-Star Marathon Finisher who has raised over $30,000 for charity.',
    tags: ['running', 'charity', 'marathon', 'fundraising', 'charity-running', 'marathon-majors', 'community'],
    publishedAt: '2025-11-28T00:00:00Z',
    content: post2Content,
  },
  {
    _id: 'post-major-marathon-charity-guide',
    _type: 'post',
    title: 'Major Marathon Charity Guide: Timelines, Fundraising Minimums & Deadlines',
    slug: { current: 'major-marathon-charity-guide-timelines-deadlines' },
    author: 'Mealvana Team',
    readTime: 10,
    description: 'A practical, race-by-race guide to charity bibs for the World Marathon Majors. Learn fundraising minimums, application windows, and key deadlines for Boston, NYC, Chicago, Berlin, London, and Tokyo.',
    tags: ['running', 'charity', 'marathon', 'fundraising', 'charity-running', 'marathon-majors', 'boston', 'nyc', 'chicago', 'berlin', 'london', 'tokyo'],
    publishedAt: '2025-11-28T12:00:00Z',
    content: post3Content,
  },
  {
    _id: 'post-simple-fueling-taper-week',
    _type: 'post',
    title: 'Simple Fueling for Taper Week',
    slug: { current: 'simple-fueling-for-taper-week' },
    author: 'Mealvana Team',
    readTime: 7,
    description: "Easy, runner-friendly meals to power you through the final crucial days! Learn how to nail your nutrition during taper week so your muscles are fully charged and ready on race day.",
    tags: ['nutrition', 'marathon', 'taper', 'fueling', 'carbs', 'carb-loading', 'race-prep'],
    publishedAt: '2025-12-01T00:00:00Z',
    content: post4Content,
  },
];

async function migrate() {
  console.log('🚀 Starting full content migration to Sanity...\n');

  // Delete existing posts first
  console.log('🗑️  Deleting existing posts...');
  const existingPosts = await client.fetch(`*[_type == "post"]._id`);
  for (const id of existingPosts) {
    await client.delete(id);
    console.log(`   Deleted: ${id}`);
  }

  console.log('\n📝 Creating blog posts with full content...');
  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`   ✅ ${post.title}`);
  }

  console.log('\n✨ Migration complete!');
  console.log('\n📌 Next steps:');
  console.log('   1. Go to https://sanity.io/manage/project/vg2p7rx4');
  console.log('   2. Review your content in the Studio');
  console.log('   3. Update PortableText.astro to render callouts, tables, and CTAs');
  console.log('   4. Deploy to Vercel to see changes on your site');
}

migrate().catch(console.error);
