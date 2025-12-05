# Migration Roadmap: WordPress to Astro + Keystatic

## Complete Step-by-Step Guide

---

## Phase 1: Preparation (30 minutes)

### Step 1.1: Verify Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or pnpm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] GitHub account with repository access
- [ ] Vercel account (free) - sign up at vercel.com

### Step 1.2: Backup Existing Content
- [ ] Export WordPress blog posts (already have HTML in `/scripts/post*.html`)
- [ ] Download any uploaded images from WordPress
- [ ] Save current WordPress database backup (optional, for reference)

### Step 1.3: Document Current DNS Settings
- [ ] Log into Squarespace DNS
- [ ] Screenshot current DNS records for `endurance.mealvana.io`
- [ ] Note the current A record pointing to `54.85.194.30`

---

## Phase 2: Create Astro Project (1-2 hours)

### Step 2.1: Initialize Astro Project
```bash
cd /Users/leemartin/development/me_website

# Remove WordPress-related files (keep docs)
# Or create in a new subfolder

# Create new Astro project
npm create astro@latest . -- --template minimal

# When prompted:
# - Where to install? → . (current directory) or ./site
# - Use TypeScript? → Yes (strict)
# - Install dependencies? → Yes
# - Initialize git? → Yes (if not already)
```

### Step 2.2: Install Dependencies
```bash
# Core dependencies
npm install @keystatic/core @keystatic/astro
npm install tailwindcss @astrojs/tailwind
npm install @astrojs/vercel

# Initialize Tailwind
npx astro add tailwind
```

### Step 2.3: Configure Astro for Keystatic
Create/update `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [tailwind(), keystatic()],
  output: 'hybrid',
  adapter: vercel(),
});
```

### Step 2.4: Configure Keystatic CMS
Create `keystatic.config.ts`:
```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'YOUR_USERNAME/me_website',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({ label: 'Publish Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),
      },
    }),
  },
});
```

### Step 2.5: Create Project Structure
```bash
mkdir -p src/content/posts
mkdir -p src/layouts
mkdir -p src/components
mkdir -p src/pages/blog
mkdir -p public/images
```

---

## Phase 3: Build Site Design (2-3 hours)

### Step 3.1: Configure Tailwind with Mealvana Brand
Create `tailwind.config.mjs`:
```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Mealvana Endurance Brand Colors
        blackberry: {
          DEFAULT: '#3D1F47',
          light: '#4A2854',
          dark: '#2D1535',
        },
        cream: {
          DEFAULT: '#F5F3ED',
          dark: '#E8E6E0',
        },
        orange: {
          DEFAULT: '#FF8B3D',
          light: '#FFA05A',
          dark: '#E67A2E',
        },
        electrolyte: {
          DEFAULT: '#5DE4D3',
          light: '#7FEEE0',
        },
        dragonfruit: '#E84393',
        'dark-text': '#381633',
        'light-text': '#F8F6EB',
        'secondary-text': '#666666',
      },
      fontFamily: {
        sansita: ['Sansita', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'button': '100px',
        'card': '15px',
      },
    },
  },
  plugins: [],
};
```

### Step 3.2: Create Base Layout
Create `src/layouts/BaseLayout.astro` with:
- HTML head (meta tags, fonts, favicon)
- Header/navigation
- Footer
- Slot for page content

### Step 3.3: Create Homepage
Create `src/pages/index.astro` with sections:
- [ ] Hero section (Blackberry gradient background)
- [ ] Problem statement (Cream background)
- [ ] Features/How it works (White background)
- [ ] Testimonials (Orange gradient)
- [ ] FAQ (Cream background)
- [ ] Footer CTA (Blackberry background)

### Step 3.4: Create Blog Components
- [ ] `src/pages/blog/index.astro` - Blog listing
- [ ] `src/pages/blog/[...slug].astro` - Individual post
- [ ] `src/components/BlogCard.astro` - Post preview card
- [ ] `src/components/PostContent.astro` - Post layout

### Step 3.5: Create Reusable Components
- [ ] `src/components/Button.astro`
- [ ] `src/components/Card.astro`
- [ ] `src/components/Section.astro`
- [ ] `src/components/Header.astro`
- [ ] `src/components/Footer.astro`

---

## Phase 4: Migrate Content (1 hour)

### Step 4.1: Migrate Blog Posts
Convert existing posts to Keystatic format:

| Post | Source File | Destination |
|------|-------------|-------------|
| Marathon Fueling | `scripts/post1.html` | `src/content/posts/marathon-fueling.mdoc` |
| Charity Playbook | `scripts/post2.html` | `src/content/posts/charity-playbook.mdoc` |
| Marathon Charity Guide | `scripts/post3.html` | `src/content/posts/marathon-charity-guide.mdoc` |
| Taper Week Fueling | `scripts/post4.html` | `src/content/posts/taper-week-fueling.mdoc` |

### Step 4.2: Migrate Images
- [ ] Download images from WordPress media library
- [ ] Place in `public/images/`
- [ ] Update image references in content

### Step 4.3: Create Homepage Content
- [ ] Write hero copy
- [ ] Write feature descriptions
- [ ] Add testimonials (placeholder or real)
- [ ] Write FAQ content

---

## Phase 5: Local Testing (30 minutes)

### Step 5.1: Run Development Server
```bash
npm run dev
# Visit http://localhost:4321
```

### Step 5.2: Test Checklist
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Blog listing works
- [ ] Individual blog posts render
- [ ] Images load
- [ ] Mobile responsive
- [ ] Keystatic admin works at `/keystatic`

### Step 5.3: Build Test
```bash
npm run build
npm run preview
# Verify production build works
```

---

## Phase 6: Deploy to Vercel (30 minutes)

### Step 6.1: Push to GitHub
```bash
git add .
git commit -m "Initial Astro + Keystatic site"
git push origin main
```

### Step 6.2: Connect Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Astro
5. Click "Deploy"

### Step 6.3: Configure Environment Variables
In Vercel dashboard, add:
```
KEYSTATIC_GITHUB_CLIENT_ID=<from GitHub OAuth app>
KEYSTATIC_GITHUB_CLIENT_SECRET=<from GitHub OAuth app>
KEYSTATIC_SECRET=<random string>
```

### Step 6.4: Configure Custom Domain
1. In Vercel dashboard → Settings → Domains
2. Add `endurance.mealvana.io`
3. Vercel provides DNS records to add

### Step 6.5: Update DNS at Squarespace
1. Log into Squarespace DNS
2. Remove old A record pointing to `54.85.194.30`
3. Add new records provided by Vercel:
   - CNAME record: `endurance` → `cname.vercel-dns.com`
   - Or A record to Vercel's IP (if they provide one)

### Step 6.6: Verify Deployment
- [ ] Site loads at `endurance.mealvana.io`
- [ ] HTTPS works (automatic with Vercel)
- [ ] All pages functional
- [ ] Keystatic admin accessible

---

## Phase 7: AWS Teardown (30 minutes)

**IMPORTANT: Only proceed after Vercel deployment is confirmed working!**

See `AWS_TEARDOWN.md` for detailed checklist.

### Step 7.1: Verify Vercel is Working
- [ ] Site loads at `endurance.mealvana.io`
- [ ] DNS has propagated (check with `dig endurance.mealvana.io`)
- [ ] SSL certificate is active
- [ ] All content is accessible

### Step 7.2: Stop AWS Services
```bash
# Stop EC2 instance (keeps data, stops billing)
aws ec2 stop-instances --instance-ids i-096475e5a9daac12c --region us-east-1
```

### Step 7.3: Wait 24-48 Hours
Monitor to ensure Vercel site is stable before deleting AWS resources.

### Step 7.4: Delete AWS Resources
Follow complete checklist in `AWS_TEARDOWN.md`:
- [ ] Terminate EC2 instance
- [ ] Delete RDS database
- [ ] Release Elastic IP
- [ ] Delete security groups
- [ ] Delete VPC resources
- [ ] Delete CloudFormation stack

---

## Phase 8: Post-Migration (Ongoing)

### Step 8.1: Team Training
- [ ] Show content editors how to use Keystatic
- [ ] Create quick reference guide
- [ ] Document common tasks

### Step 8.2: Set Up Monitoring
- [ ] Vercel Analytics (free tier available)
- [ ] Google Search Console
- [ ] Uptime monitoring (optional)

### Step 8.3: SEO Verification
- [ ] Submit new sitemap to Google
- [ ] Verify 301 redirects if URLs changed
- [ ] Check Google Search Console for errors

---

## Rollback Plan

If something goes wrong:

### Quick Rollback (Within 24 hours)
1. Revert DNS at Squarespace back to `54.85.194.30`
2. Start EC2 instance: `aws ec2 start-instances --instance-ids i-096475e5a9daac12c`
3. Site returns to WordPress

### After AWS Deletion
1. Redeploy WordPress using CloudFormation template
2. Restore from database backup
3. Update DNS

---

## Success Criteria

Migration is complete when:
- [ ] Astro site live at `endurance.mealvana.io`
- [ ] All blog posts migrated and accessible
- [ ] Keystatic admin working for content editors
- [ ] AWS resources deleted
- [ ] No monthly AWS charges for WordPress infrastructure
- [ ] Page load times under 1 second

---

## Estimated Costs After Migration

| Service | Monthly Cost |
|---------|--------------|
| Vercel (Hobby) | $0 |
| GitHub (Free) | $0 |
| Keystatic | $0 |
| Domain (existing) | $0 |
| **Total** | **$0** |

vs. Previous WordPress on AWS: ~$15-30/month after free tier
