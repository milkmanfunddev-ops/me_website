# Mealvana Endurance Website Design Guide
## Brand-Consistent Elementor Implementation

This guide walks you through building the Mealvana Endurance website using the official brand design system.

---

## Brand Design System Overview

### Color Palette

| Name | Hex Code | Use For |
|------|----------|---------|
| **Blackberry** | `#3D1F47` | Dark backgrounds, hero sections |
| **Blackberry Light** | `#4A2854` | Card surfaces (dark theme) |
| **Blackberry Dark** | `#2D1535` | Deeper accents |
| **Cream** | `#F5F3ED` | Light backgrounds, body sections |
| **Cream Dark** | `#E8E6E0` | Secondary light backgrounds |
| **Orange (Primary)** | `#FF8B3D` | CTAs, buttons, accents |
| **Orange Light** | `#FFA05A` | Hover states |
| **Orange Dark** | `#E67A2E` | Pressed states |
| **Electrolyte** | `#5DE4D3` | Success, health, hydration accents |
| **Electrolyte Light** | `#7FEEE0` | Highlights |
| **Dragonfruit** | `#E84393` | Warnings, tertiary accents |
| **Dark Text** | `#381633` | Body text on light backgrounds |
| **Light Text** | `#F8F6EB` | Text on dark backgrounds |
| **Secondary Text** | `#666666` | Muted text |

### Typography

| Style | Font | Size | Weight |
|-------|------|------|--------|
| **Page Title** | Sansita | 28px | Bold (700) |
| **Section Title** | Sansita | 20px | Bold (700) |
| **Activity Title** | Compadre | 18px | Regular (400) |
| **Body Large** | Apercu | 16px | Regular (400) |
| **Body Medium** | Apercu | 14px | Regular (400) |
| **Button Text** | Sansita | 16px | Bold (700) |
| **Small Label** | Apercu | 12px | Medium (500) |

**Note:** For web, use these Google Fonts alternatives:
- **Sansita** → Available on Google Fonts
- **Compadre** → Use "Barlow" or "Oswald" as alternative
- **Apercu** → Use "Inter" or "Work Sans" as alternative

---

## What's Already Set Up

- Homepage created and set as front page
- Blog page created for your posts
- Elementor Canvas template enabled (full-width, no header/footer)
- Flexbox Container feature enabled
- Plugins installed: Elementor, Unlimited Elements, PowerPack Addons

---

## Step 1: Login to WordPress

1. Go to: **http://54.85.194.30/wp-admin**
2. Username: `admin`
3. Password: `Testpass123`

---

## Step 2: Set Global Colors

1. Go to **Pages → All Pages**
2. Hover over "Home" and click **Edit with Elementor**
3. Click the **hamburger menu (☰)** in the top-left corner
4. Click **Site Settings**
5. Click **Global Colors**
6. Add these Mealvana Endurance brand colors:

| Name | Hex Code | Use For |
|------|----------|---------|
| Blackberry | `#3D1F47` | Dark hero backgrounds |
| Blackberry Light | `#4A2854` | Card surfaces, secondary dark |
| Cream | `#F5F3ED` | Light section backgrounds |
| Cream Dark | `#E8E6E0` | Alternate light backgrounds |
| Orange Primary | `#FF8B3D` | Main CTAs, buttons |
| Orange Light | `#FFA05A` | Hover states |
| Electrolyte | `#5DE4D3` | Health/hydration accents |
| Dragonfruit | `#E84393` | Tertiary accents |
| Dark Text | `#381633` | Body text |
| Light Text | `#F8F6EB` | Text on dark backgrounds |

7. Click **Update** to save

---

## Step 3: Set Global Typography

1. Still in **Site Settings**, click **Global Fonts**
2. Click **Primary Headline**:
   - Family: **Sansita** (add via Google Fonts)
   - Weight: **700** (Bold)
3. Click **Secondary Headline**:
   - Family: **Sansita**
   - Weight: **700** (Bold)
4. Click **Body**:
   - Family: **Inter** (or Work Sans)
   - Size: **16px**
   - Weight: **400** (Regular)
   - Line Height: **1.5**
5. Click **Update** to save

### Adding Custom Fonts

To add Sansita font:
1. Go to **Elementor → Custom Fonts** (or use a plugin like "Custom Fonts")
2. Add Google Fonts link in theme or use Elementor's built-in Google Fonts

---

## Step 4: Build the Hero Section

### 4.1 Add a Container
1. Drag a **Container** widget onto the page
2. In the **Layout** tab:
   - Content Width: **Full Width**
   - Min Height: **90vh** (or 700px)
   - Direction: **Row** (horizontal)
   - Align Items: **Center**
   - Justify Content: **Space Between**

### 4.2 Set Blackberry Gradient Background
1. With the Container selected, go to **Style** tab
2. Click **Background**
3. Choose **Gradient** type
4. Configure:
   - Color 1: `#3D1F47` (Blackberry)
   - Color 2: `#2D1535` (Blackberry Dark)
   - Type: **Linear**
   - Angle: **135deg**

**Alternative: Animated Gradient**
1. Search for **"Animated Gradient Background"** widget (Unlimited Elements)
2. Drag it INTO the container as the first element
3. Configure:
   - Color 1: `#3D1F47` (Blackberry)
   - Color 2: `#4A2854` (Blackberry Light)
   - Color 3: `#FF8B3D` (Orange - subtle)
   - Color 4: `#5DE4D3` (Electrolyte - subtle)
   - Animation Duration: **15s**
   - Set to **Position: Absolute** and **Full Width/Height**

### 4.3 Add Text Content (Left Side)
1. Inside the Container, add another **Container** (nested)
2. Set width to **55%** on desktop
3. Add these widgets inside:

**Heading Widget:**
- Text: "Fuel Your Best Race"
- HTML Tag: H1
- Size: 48px (desktop), 32px (mobile)
- Color: `#F8F6EB` (Light Text)
- Font: Sansita
- Weight: Bold (700)

**Text Editor Widget:**
- Text: "Personalized nutrition plans for endurance athletes. Science-backed meal planning tailored to your training, your body, and your goals."
- Size: 18px
- Color: `#F8F6EB` with slight transparency (rgba(248,246,235,0.9))
- Font: Inter
- Line Height: 1.6

**Button Widget:**
- Text: "Get Started Free"
- Background: `#FF8B3D` (Orange Primary)
- Text Color: `#FFFFFF` (White)
- Border Radius: **100px** (fully rounded - Mealvana style)
- Padding: 16px 40px
- Typography: Sansita Bold, 16px
- Hover Background: `#FFA05A` (Orange Light)
- Hover: Add slight scale transform (1.02)

### 4.4 Add App Mockup (Right Side)
1. Add another nested **Container** on the right
2. Set width to **40%**
3. Add **Image** widget
4. Upload a mobile app mockup image
5. Set max-width to 350px
6. Add slight rotation transform: rotate(3deg)
7. Add drop shadow: 0 20px 40px rgba(0,0,0,0.3)

---

## Step 5: Build Problem Statement Section

1. Add a new **Container** below the hero
2. Settings:
   - Content Width: Boxed (1140px)
   - Padding: 80px top/bottom
   - Background: `#F5F3ED` (Cream)

3. Add **Heading**:
   - Text: "Training is hard enough. Nutrition shouldn't be."
   - Tag: H2
   - Size: 32px
   - Font: Sansita Bold
   - Alignment: Center
   - Color: `#381633` (Dark Text)

4. Add **Text Editor**:
   - Text: "Most endurance athletes spend hours researching what to eat before, during, and after their workouts. We do the science so you can focus on the miles."
   - Size: 18px
   - Alignment: Center
   - Color: `#666666` (Secondary Text)
   - Font: Inter
   - Max width: 700px (center it)

---

## Step 6: Build Features Section

1. Add a new **Container**
2. Settings:
   - Full Width
   - Padding: 100px top/bottom
   - Background: `#FFFFFF` (White)

3. Add **Heading**:
   - Text: "How It Works"
   - Tag: H2
   - Size: 32px
   - Font: Sansita Bold
   - Center aligned
   - Color: `#381633`

4. Add a **Container** with 3 columns (33% each)
5. Gap between columns: 24px

**Feature Card Structure:**
- Container with padding: 24px
- Background: `#FFFFFF` (White)
- Border Radius: 15px (Mealvana card radius)
- Box Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Border: 1px solid `#E8E6E0`

Inside each card:
- **Icon** widget with `#5DE4D3` (Electrolyte) color
- **Heading** (H3): Sansita, 20px, `#381633`
- **Text**: Inter, 16px, `#666666`

**Three Features:**

1. **"Personalized Plans"**
   - Icon: User/Person icon
   - Description: "Based on your body weight, training load, and food preferences"

2. **"Race Day Fuel"**
   - Icon: Lightning/Energy icon
   - Description: "Exact carbs, sodium, and hydration calculated for your next event"

3. **"Real Food First"**
   - Icon: Apple/Food icon
   - Description: "No complicated supplements, just simple meals that work"

---

## Step 7: Build Testimonials Section

1. Add a new **Container**
2. Background: Gradient from `#FF8B3D` to `#E67A2E` (Orange gradient, diagonal)
3. Padding: 80px

4. Add **Heading**:
   - "What Athletes Are Saying"
   - Font: Sansita Bold
   - Color: `#FFFFFF` (White)
   - Center aligned

5. Use the **Card Carousel** widget (from Unlimited Elements) or create manual cards:

**Testimonial Card:**
- Background: `#FFFFFF` (White)
- Border Radius: 15px
- Padding: 24px
- Box Shadow: 0 4px 16px rgba(0,0,0,0.12)

Content:
- Quote text: Inter, 16px, `#381633`, italic
- Name: Sansita, 16px, `#381633`, bold
- Details: Inter, 14px, `#666666` - "Marathon Runner" or similar

---

## Step 8: Build FAQ Section

1. Add a new **Container**
2. Boxed width, padding 80px
3. Background: `#F5F3ED` (Cream)

4. Add **Heading**:
   - "Frequently Asked Questions"
   - Font: Sansita Bold, 32px
   - Color: `#381633`

5. Add **Accordion** widget:

**FAQ Items:**
- "How do I get my personalized nutrition plan?"
- "What sports does Mealvana Endurance support?"
- "Can I use this for race day nutrition?"
- "Is there a free trial?"
- "How is this different from other nutrition apps?"

**Accordion Styling:**
- Title font: Sansita, 18px, Bold, `#381633`
- Content font: Inter, 16px, Regular, `#666666`
- Icon: Arrow/Chevron in `#FF8B3D` (Orange)
- Spacing between items: 16px
- Item background: `#FFFFFF`
- Item border radius: 15px
- Item padding: 20px

---

## Step 9: Build Footer CTA Section

1. Add a new **Container**
2. Full width
3. Background: `#3D1F47` (Blackberry)
4. Padding: 100px
5. Center aligned

6. Add **Heading**:
   - "Ready to Fuel Your Best Performance?"
   - Font: Sansita Bold
   - Color: `#F8F6EB` (Light Text)
   - Size: 40px

7. Add **Text**:
   - "Join thousands of endurance athletes who trust Mealvana for race-day nutrition."
   - Font: Inter, 18px
   - Color: rgba(248,246,235,0.8)

8. Add **Button**:
   - "Download the App"
   - Background: `#FF8B3D` (Orange Primary)
   - Text: `#FFFFFF` (White)
   - Font: Sansita Bold, 16px
   - Border Radius: 100px
   - Padding: 16px 48px
   - Hover: `#FFA05A` (Orange Light)

---

## Step 10: Mobile Responsiveness

For EACH section, click the **Responsive Mode** icon (bottom-left) and adjust:

### Mobile Adjustments:
- Hero: Stack columns vertically, reduce heading to 32px
- Features: Single column layout
- Testimonials: Single card visible
- Reduce all padding by ~50%
- Buttons: Full width on mobile, maintain 100px border radius
- Font sizes: Reduce by ~20% on mobile

### Mealvana Spacing Guidelines:
- **Desktop padding**: 80-100px vertical, 40px horizontal
- **Tablet padding**: 60px vertical, 24px horizontal
- **Mobile padding**: 40px vertical, 20px horizontal
- **Element gaps**: 24px between major elements, 16px between related items

---

## Step 11: Publish and Test

1. Click **Update** (or Publish) in Elementor
2. Click the **Preview** icon to see live site
3. Test on mobile device or use browser dev tools
4. Check load speed at: https://pagespeed.web.dev/

---

## Quick Reference: Elementor Widget Locations

| Widget | Location |
|--------|----------|
| Container | Basic |
| Heading | Basic |
| Text Editor | Basic |
| Button | Basic |
| Image | Basic |
| Accordion | General |
| Animated Gradient Background | Unlimited Elements |
| Card Carousel | Unlimited Elements |

---

## Mealvana Endurance Color Palette Quick Copy

### Primary Colors
```
Blackberry:          #3D1F47
Blackberry Light:    #4A2854
Blackberry Dark:     #2D1535
Cream:               #F5F3ED
Cream Dark:          #E8E6E0
```

### Accent Colors
```
Orange Primary:      #FF8B3D
Orange Light:        #FFA05A
Orange Dark:         #E67A2E
Electrolyte:         #5DE4D3
Electrolyte Light:   #7FEEE0
Dragonfruit:         #E84393
```

### Text Colors
```
Dark Text:           #381633
Light Text:          #F8F6EB
Secondary Text:      #666666
```

### Borders & Surfaces
```
Light Border:        #E0E0E0
Dark Border:         #333333
White Surface:       #FFFFFF
Light Surface:       #F9F9F9
```

---

## Component Specifications

### Buttons
- **Primary**: Orange `#FF8B3D`, white text, 100px border radius
- **Secondary**: White background, Orange text, 1px Orange border
- **Height**: 48-56px
- **Padding**: 16px horizontal, 12px vertical

### Cards
- **Border Radius**: 15px
- **Shadow (light)**: 0 2px 8px rgba(0,0,0,0.08)
- **Padding**: 24px
- **Border**: 1px solid `#E0E0E0` (optional)

### Input Fields
- **Height**: 46px
- **Border Radius**: 15px
- **Border**: 1px solid `#E0E0E0`
- **Focus Border**: `#FF8B3D` (Orange)

---

## App Assets

### Logo Files Available
- Main logo: `/assets/images/logo.png`
- Welcome logo: `/assets/images/endurance_welcome_logo.png`
- App icon: `/assets/images/endurance_launcher_icon_1024.png`

### Illustration Assets
- Woman running: `/assets/images/woman_running.png`
- Woman cycling: `/assets/images/woman_cycling.png`
- Woman swimming: `/assets/images/woman_swimming.png`

---

## Tips

1. **Save often** - Elementor can crash, save every few minutes
2. **Use Navigator** - Click the layers icon to see page structure
3. **Copy/paste styles** - Right-click elements to copy/paste styling
4. **Global widgets** - Create reusable buttons and cards
5. **Undo** - Ctrl/Cmd + Z works in Elementor
6. **Brand consistency** - Always use the exact hex codes from the palette
7. **Rounded buttons** - Mealvana uses fully rounded (100px) buttons
8. **Card radius** - Keep cards at 15px border radius for consistency

---

## Design Philosophy

The Mealvana Endurance brand conveys:

1. **Energy & Performance**: Orange primary color communicates action and vitality
2. **Health & Hydration**: Electrolyte (cyan/turquoise) represents hydration and wellness
3. **Sophistication**: Blackberry dark background provides premium, modern feel
4. **Warmth**: Cream light background offers friendly, approachable interface
5. **Excitement**: Dragonfruit pink adds playful, motivational accents

**Key Visual Principles:**
- Dark hero sections with light text for impact
- Light content sections for readability
- Orange CTAs that pop against both dark and light backgrounds
- Rounded, friendly button and card shapes
- Clean typography hierarchy with Sansita headlines and Inter body text

---

Good luck building the site! It will look amazing when you're done.
