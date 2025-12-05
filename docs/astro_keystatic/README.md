# Mealvana Endurance Website Migration

## From WordPress (AWS) to Astro + Keystatic (Vercel)

---

## Executive Summary

We are migrating the Mealvana Endurance marketing website from a WordPress installation on AWS (EC2 + RDS) to a modern static site built with Astro and Keystatic CMS, hosted on Vercel.

### Why We're Making This Change

| Problem with WordPress/AWS | Solution with Astro/Vercel |
|---------------------------|---------------------------|
| Complex visual builder (Elementor) | Code-based, AI can generate directly |
| Manual server management | Zero server management |
| ~$15-30/month after free tier | $0/month |
| Slow page loads | Fastest possible performance |
| Security updates required | No server = no security patches |
| Non-technical users struggle | Visual CMS for content editors |
| Hard to version control | Everything in Git |

---

## What is Astro?

**Astro** is a modern static site generator that:
- Builds fast, lightweight websites
- Ships zero JavaScript by default (only adds JS where needed)
- Supports components from React, Vue, Svelte, etc.
- Has excellent developer experience
- Produces the fastest possible websites

**Think of it as**: A modern, faster, more flexible Jekyll.

---

## What is Keystatic?

**Keystatic** is a Git-based CMS that:
- Provides a visual admin panel for content editing
- Stores content as files in your GitHub repository
- Requires no database
- Is free and open source
- Works locally and in production

**Think of it as**: A user-friendly interface that creates Markdown files for you.

### How Non-Technical Employees Use Keystatic

1. Go to `endurance.mealvana.io/keystatic`
2. Log in with GitHub account
3. Click "New Blog Post"
4. Write in a visual editor (like Google Docs)
5. Click "Save"
6. Site automatically rebuilds (~30 seconds)

No coding, no Git commands, no Markdown knowledge required.

---

## Architecture Comparison

### Before: WordPress on AWS

```
┌─────────────────────────────────────────────────────┐
│                    AWS Cloud                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐     ┌─────────────────┐       │
│  │   EC2 Instance  │────▶│   RDS MySQL     │       │
│  │   (WordPress)   │     │   (Database)    │       │
│  │   t2.micro      │     │   db.t3.micro   │       │
│  │   54.85.194.30  │     │                 │       │
│  └─────────────────┘     └─────────────────┘       │
│           │                                         │
│           ▼                                         │
│  ┌─────────────────┐                               │
│  │  Elastic IP     │                               │
│  │  54.85.194.30   │                               │
│  └─────────────────┘                               │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Monthly Cost: $0 (free tier) → $15-30 (after)     │
│  Maintenance: High (updates, security, backups)     │
│  Complexity: High                                   │
└─────────────────────────────────────────────────────┘
```

### After: Astro on Vercel

```
┌─────────────────────────────────────────────────────┐
│                  New Architecture                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐     ┌─────────────────┐       │
│  │     GitHub      │────▶│     Vercel      │       │
│  │   Repository    │     │    (Hosting)    │       │
│  │                 │     │                 │       │
│  │  - Astro code   │     │  - Global CDN   │       │
│  │  - Blog posts   │     │  - Auto SSL     │       │
│  │  - Images       │     │  - Auto deploy  │       │
│  └─────────────────┘     └─────────────────┘       │
│           ▲                       │                 │
│           │                       ▼                 │
│  ┌─────────────────┐     endurance.mealvana.io     │
│  │  Keystatic CMS  │                               │
│  │  (Admin Panel)  │◀── Content editors use this   │
│  └─────────────────┘                               │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Monthly Cost: $0                                   │
│  Maintenance: Zero                                  │
│  Complexity: Low                                    │
└─────────────────────────────────────────────────────┘
```

---

## What We're Building

### Site Structure

```
endurance.mealvana.io/
├── /                    # Homepage (marketing landing page)
├── /blog                # Blog listing page
├── /blog/[slug]         # Individual blog posts
├── /about               # About page (optional)
├── /contact             # Contact page (optional)
└── /keystatic           # CMS admin panel (editors only)
```

### Content to Migrate

1. **Blog Posts** (4 existing posts from Jekyll/WordPress):
   - Master Your Marathon Fueling: A Complete 4-Week Guide
   - The Charity Runner's Playbook: Your Guide to Running for a Cause
   - Major Marathon Charity Guide: Timelines, Fundraising Minimums & Deadlines
   - Simple Fueling for Taper Week

2. **Homepage Content**:
   - Hero section
   - Problem statement
   - Features (How It Works)
   - Testimonials
   - FAQ
   - Footer CTA

3. **Brand Assets**:
   - Mealvana Endurance color palette
   - Typography (Sansita, Inter)
   - Logo and images

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 4.x | Static site generation |
| CMS | Keystatic | Content management |
| Styling | Tailwind CSS | Utility-first CSS |
| Hosting | Vercel | Deployment & CDN |
| Repository | GitHub | Version control |
| Domain | Squarespace DNS | DNS management |

---

## Benefits Summary

### For Developers (You)
- All code in Git with version control
- AI (Claude) can generate and modify code directly
- Fast local development
- No server management
- Easy to extend and customize

### For Content Editors (Employees)
- Visual editing interface
- No coding required
- No Git knowledge needed
- Preview before publishing
- Works in the browser

### For Users (Visitors)
- Fastest possible page loads
- Works offline (PWA capable)
- SEO optimized
- Accessible
- Mobile responsive

### For Business
- $0 hosting cost
- No security vulnerabilities (no server)
- Scales infinitely (CDN)
- 99.99% uptime (Vercel SLA)

---

## Timeline Overview

| Phase | Duration | Description |
|-------|----------|-------------|
| 1. Setup | 1-2 hours | Create Astro project, configure Keystatic |
| 2. Design | 2-3 hours | Build homepage with Mealvana brand |
| 3. Content | 1 hour | Migrate blog posts |
| 4. Deploy | 30 min | Deploy to Vercel, configure domain |
| 5. Test | 1 hour | Verify everything works |
| 6. Teardown | 30 min | Remove AWS infrastructure |

**Total: ~6-8 hours**

---

## Files in This Documentation

| File | Description |
|------|-------------|
| `README.md` | This file - overview and explanation |
| `ROADMAP.md` | Step-by-step migration plan |
| `AWS_TEARDOWN.md` | Checklist for removing AWS resources |
| `INFRASTRUCTURE.md` | Detailed infrastructure comparison |

---

## Quick Start (After Migration)

### Local Development
```bash
cd /Users/leemartin/development/me_website
npm install
npm run dev
# Site runs at http://localhost:4321
# Keystatic admin at http://localhost:4321/keystatic
```

### Deploy to Production
```bash
git add .
git commit -m "Update content"
git push origin main
# Vercel automatically deploys in ~30 seconds
```

### Add New Blog Post
1. Go to `endurance.mealvana.io/keystatic`
2. Click "Blog Posts" → "Create New"
3. Fill in title, content, images
4. Click "Save"
5. Done! Auto-deploys in ~30 seconds

---

## Questions?

If you have questions about this migration, refer to:
- `ROADMAP.md` for step-by-step instructions
- `AWS_TEARDOWN.md` for cleanup checklist
- `INFRASTRUCTURE.md` for technical details

Or ask Claude to help!
