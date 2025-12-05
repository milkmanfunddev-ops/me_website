#!/bin/bash
# WordPress Blog Post Migration Script
cd /var/www/html

# Post 1: Master Your Marathon Fueling
cat > /tmp/post1.html << 'POSTEOF'
<p><strong>Learn how to perfect your marathon fueling in the final four weeks before race day.</strong> This quick guide covers carb, sodium, and hydration formulas, gear checks, and race-week prep so you can avoid the wall and run with confidence.</p>

<p>You are four weeks out of your big race. Your training is almost complete, and the race-day details, your shoes, your pace strategy, your travel plans, are dominating your mind. But ask any marathon veteran: the most critical piece of gear you need to master is your fueling plan.</p>

<p>You can have the best training block and the lightest shoes, but if you have not rehearsed your in-run nutrition, you risk hitting the infamous wall. We recently sat down with Coach Alex Mororrow of Resolute Running (Birmingham, AL) on the Mealvana Endurance Podcast to discuss about how to eliminate this risk and turn your final long runs into successful fueling rehearsals.</p>

<h3>The math is simple: Why Fueling during the run is non-negotiable</h3>

<p>Sports physiology research finds that the body primary high-intensity fuel source, <strong>muscle glycogen</strong>, stores roughly 1,600 to 2,000 kcal. The average marathon runner burns approximately 100 calories per mile.</p>

<p>With 2,000 calories divided by 100 calories per mile, we know that our internal fuel tank is typically depleted by mile 20. This is why most runners hit the wall between mile 18 and mile 20. All of your gels, chews, liquids, whatever you brought with you on the run, is not to replace all the calories you burn, but to maintain blood sugar and spare your internal glycogen stores, pushing that bonk point far past the finish line.</p>

<h3>Plan Your Sodium and Electrolyte Intake</h3>

<p>If you are three to four weeks till your race day, it is crucial to make fluid and electrolyte management plan ahead. Your body is still under high training stress. You need to find a plan that works specifically for your body. And your final peak runs are the last chance to fine-tune this essential element.</p>

<p>Research shows that adequate <strong>sodium replacement</strong> is crucial for maintaining plasma volume and preventing common issues like muscle cramping and hyponatremia (low blood sodium). Current guidelines often recommend fluid containing <strong>0.5 to 0.7 grams of sodium per liter</strong> of water to optimize fluid absorption and counter sweat losses.</p>

<h3>Calculate Your Personalized Fuel Plan</h3>

<p><strong>1. Carbohydrates (Energy Needs)</strong></p>
<p>For endurance events longer than 90 minutes: Carbs per hour (g/hr) = 0.7 x Body Weight (kg)</p>
<p>Example: A 65 kg runner = 0.7 x 65 = 45 g/hr of carbs. That is about 1-1.5 gels or chews every 30-40 minutes.</p>

<p><strong>2. Sodium (Electrolyte Needs)</strong></p>
<p>Sweat sodium concentration varies, but most runners lose 500-1000 mg sodium per liter of sweat.</p>
<p>Example: If you sweat 1 L/hr and are a moderate sweater (800 mg/L): 1 x 800 = 800 mg sodium/hr</p>

<p><strong>3. Fluid (Hydration Needs)</strong></p>
<p>Measure your sweat rate by weighing yourself before and after a one-hour run in similar conditions. Plan to replace 60-80% of that rate per hour during the race.</p>

<h3>Absolutely Nothing New on Race Day</h3>

<p>We cannot stress this enough: with only a couple of weeks left, you must lock down your strategy now. The biggest race-ending mistake runners make is introducing new foods, new brands of fuel, or new gear in the final few weeks.</p>

<p>Gastrointestinal (GI) distress is the leading non-injury cause of DNF (Did Not Finish) in endurance races. Your gut needs time to adapt to the specific sugar profiles in your gels or the specific composition of your sports drink.</p>
POSTEOF

sudo -u apache /usr/local/bin/wp post create \
  --post_title="Master Your Marathon Fueling: A Complete 4-Week Guide" \
  --post_content="$(cat /tmp/post1.html)" \
  --post_status=publish \
  --post_date="2025-11-12 10:00:00" \
  --post_author=1

echo "Post 1 created"

# Post 2: The Charity Runner's Playbook
cat > /tmp/post2.html << 'POSTEOF'
<p><strong>Learn proven strategies for securing charity bibs and raising thousands of dollars for causes you care about.</strong> This guide features insights from Robin White, a Six-Star Marathon Finisher who has raised over $30,000 for charity across 13 campaigns.</p>

<h2>Meet Your Guide</h2>

<p><strong>Robin White</strong> is not just any runner - she is a powerhouse in the charity running community. Having completed all six World Marathon Majors and raised over $30,000 for the Bell Center across 13 campaigns, she brings deep experience to charity fundraising.</p>

<h2>How to Get Charity Bibs</h2>

<p>Most major marathons have two main paths: <strong>general entry</strong> (lottery or time-qualifying) and <strong>charity entries</strong>. Understanding those rules is half the battle.</p>

<h3>1. Start With a Cause That Truly Matters to You</h3>
<p>Before you think about forms and deadlines, start with your why. Charities notice when your application is deeply personal versus generic.</p>

<h3>2. Learn How Each Race Handles Charity Bibs</h3>
<p>For races like New York, you can try the lottery first, and if you do not get in, turn to charity partners. Tokyo is different - the charity selection happens before the general lottery, and it is more like a bidding process.</p>

<h3>3. Be Concrete About Your Fundraising Commitment</h3>
<p>When you apply, go beyond I will raise the minimum and outline what amount you are committing to, where that money is likely to come from, and any prior fundraising you have successfully done.</p>

<h2>Proven Fundraising Strategies That Work</h2>

<h3>1. Educate People About Your Cause</h3>
<p>Do not just drop a donation link. Share meaningful facts or stories about your charity in your posts, emails, and conversations.</p>

<h3>2. Make the Ask Simple and Low-Friction</h3>
<p>If everyone reading this donated $5, that would make a huge difference. Use one clear number, pair it with a one-sentence explanation, and let people know there is no guilt if they cannot give.</p>

<h3>3. Give People Something in Exchange</h3>
<p>Create simple merchandise - shirts, hats, stickers - tied to your race. It is still a donation but feels more like buying something cool from a friend.</p>

<h3>4. Host Events That Create Value and Community</h3>
<p>Host a small gathering: a silent auction, movie night, or themed party. Events give people an excuse to gather and make giving feel like a shared experience.</p>

<h3>5. Do Not Underestimate the Power of Your Workplace</h3>
<p>Your coworkers may not be getting hit with as many donation requests and might have access to company giving programs or matching.</p>

<h3>6. Thank Every Donor Personally</h3>
<p>Send a quick DM, text, email, or handwritten note to each donor. This turns donors into long-term supporters.</p>

<h2>Key Takeaway</h2>
<p>Charity running is not just about the miles or the money - it is about community, purpose, and the joy of running for something bigger than yourself.</p>
POSTEOF

sudo -u apache /usr/local/bin/wp post create \
  --post_title="The Charity Runner's Playbook: Your Guide to Running for a Cause" \
  --post_content="$(cat /tmp/post2.html)" \
  --post_status=publish \
  --post_date="2025-11-28 09:00:00" \
  --post_author=1

echo "Post 2 created"

# Post 3: Major Marathon Charity Guide
cat > /tmp/post3.html << 'POSTEOF'
<p><strong>Dreaming of running a World Marathon Major but do not have a qualifying time - or struck out in the lottery?</strong> Charity entries are often the most reliable way in. This guide covers fundraising minimums, application windows, and key deadlines for all six majors.</p>

<h2>Quick Snapshot by Race</h2>

<table>
<tr><th>Marathon</th><th>Typical Race Month</th><th>Charity Fundraising Range</th></tr>
<tr><td><strong>Boston</strong></td><td>April</td><td>~US$7,500-$10,000+</td></tr>
<tr><td><strong>New York City</strong></td><td>November</td><td>US$3,500+</td></tr>
<tr><td><strong>Chicago</strong></td><td>October</td><td>US$2,200+</td></tr>
<tr><td><strong>Berlin</strong></td><td>September</td><td>~US$3,000-$4,000</td></tr>
<tr><td><strong>London</strong></td><td>April</td><td>~GBP 2,000-3,000</td></tr>
<tr><td><strong>Tokyo</strong></td><td>March</td><td>Min JPY 100,000 (~US$650)</td></tr>
</table>

<h2>Boston Marathon (April)</h2>
<p>Boston is both the hardest to qualify for and one of the most expensive to access via charity. The BAA own charity team requires at least US$8,500. Realistically, expect US$7,500-$10,000+.</p>

<h2>TCS New York City Marathon (November)</h2>
<p>NYC might be the most charity-friendly of all the majors. NYRR requires a minimum of at least US$3,500 per runner. Plan for US$3,500-$5,000 as a realistic band.</p>

<h2>Bank of America Chicago Marathon (October)</h2>
<p>Chicago offers one of the lowest fundraising minimums among the majors - at least US$2,200. Expect US$2,200-$2,500 as your baseline.</p>

<h2>BMW Berlin Marathon (September)</h2>
<p>Berlin is popular for its fast course. Fundraising minimums are generally in the US$3,000-$4,000 range.</p>

<h2>TCS London Marathon (April)</h2>
<p>London is legendary for charity running, regularly setting global records for one-day fundraising. A safe planning band is GBP 2,000-3,000+ for a charity-place runner.</p>

<h2>Tokyo Marathon (March)</h2>
<p>Tokyo is structurally different: the charity process happens before the general lottery and works more like a silent auction. The minimum donation is JPY 100,000 (about US$650-$700), but typical successful bids exceed the minimum significantly.</p>

<h2>How to Use This Guide</h2>
<ol>
<li>Pick your race, then work backwards from the race date.</li>
<li>Estimate your fundraising capacity - first-timers might aim for Chicago or Berlin.</li>
<li>Research 3-5 charities per race.</li>
<li>Watch for milestones and deadlines.</li>
<li>Keep your story at the center.</li>
</ol>
POSTEOF

sudo -u apache /usr/local/bin/wp post create \
  --post_title="Major Marathon Charity Guide: Timelines, Fundraising Minimums & Deadlines" \
  --post_content="$(cat /tmp/post3.html)" \
  --post_status=publish \
  --post_date="2025-11-28 10:00:00" \
  --post_author=1

echo "Post 3 created"

# Post 4: Simple Fueling for Taper Week
cat > /tmp/post4.html << 'POSTEOF'
<p><strong>Easy, runner-friendly meals to power you through the final crucial days!</strong> You are in the final stretch! Here is how to nail your nutrition during taper week so your muscles are fully charged and ready on race day.</p>

<p>You made it! The hardest physical work is officially behind you. As your mileage drops, you might feel that itch to keep pushing. Fight that urge. Here is the truth: your instinct is to exercise to get fitter, but at this point, more training will not make you stronger. It will just wear you out.</p>

<p>The taper is where your body finally gets the rest it needs to absorb all those months of training. This is when your muscles repair, your energy systems recharge, and your legs get fresh again.</p>

<h2>The Biggest Nutrition Mistakes Runners Make During Taper</h2>

<h3>Mistake #1: Eating Too Light Because You Are Training Less</h3>
<p>This is hands-down the biggest mistake we see. Your first instinct is to cut calories since you are running fewer miles. Wrong. Your body is still working hard during taper - repairing muscle damage, replenishing energy stores, and preparing for race day.</p>

<h3>Mistake #2: Cutting Carbs and Loading Up on Protein</h3>
<p>Some runners think taper week is the time to lean out by cutting carbs. Not now. While protein is important and should stay steady, <strong>carbohydrates are your priority during taper</strong>. Your body stores carbs as glycogen (your fuel tank), and the taper is when you need to fill that tank to the brim.</p>

<h3>Mistake #3: Losing Consistency</h3>
<p>You have been fueling consistently for months. Do not change everything now. Taper week is not the time for a new diet, intermittent fasting experiments, or cutting out food groups.</p>

<h2>The Smart Way to Carb-Load: A Shift, Not a Stuffing</h2>

<p>Forget that old-school image of gorging on massive bowls of pasta the night before the race. Modern sports nutrition takes a smarter approach: a controlled, proportional shift that starts about three days out.</p>

<p>Starting about three days before your race, systematically change the percentage of calories coming from carbs - from your typical 45-65% during training to around 65-75% during the final 2-3 days. Aim for 8-12 grams of carbohydrate per kilogram of body weight in the final 24-36 hours.</p>

<h2>Runner-Friendly Meals for Taper Week</h2>

<ol>
<li><strong>Simple chicken and white rice bowl:</strong> A large portion of cooked white rice with a smaller portion of basic baked or boiled chicken breast.</li>
<li><strong>Baked sweet potato toast:</strong> Slices of baked sweet potato topped with a bit of butter, jam, or cinnamon.</li>
<li><strong>Oatmeal with banana:</strong> Oatmeal cooked with water or skim milk, sliced banana, and a small drizzle of honey.</li>
</ol>

<h2>Lock It In! No Experiments This Week</h2>
<p>By taper week, your fueling plan is set. No new gels, drinks, or last-minute magic products.</p>
POSTEOF

sudo -u apache /usr/local/bin/wp post create \
  --post_title="Simple Fueling for Taper Week" \
  --post_content="$(cat /tmp/post4.html)" \
  --post_status=publish \
  --post_date="2025-12-01 10:00:00" \
  --post_author=1

echo "Post 4 created"

# List all posts
echo "=== All Posts ==="
sudo -u apache /usr/local/bin/wp post list --post_type=post --format=table
