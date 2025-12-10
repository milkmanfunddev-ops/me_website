import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads in production
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to extract YouTube video ID from URL
export function getYouTubeId(url: string): string | null {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
}

// Query helpers
export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      readTime,
      description,
      tags,
      heroImage,
      publishedAt
    }
  `);
}

export async function getPost(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      readTime,
      description,
      tags,
      heroImage,
      publishedAt,
      content
    }
  `,
    { slug }
  );
}

export async function getHomepage() {
  return client.fetch(`
    *[_type == "homepage"][0] {
      heroTitle,
      heroSubtitle,
      heroPrimaryButton,
      heroSecondaryButton,
      problemTitle,
      problemDescription,
      featuresTitle,
      features,
      testimonialsTitle,
      testimonials,
      faqTitle,
      faqs,
      ctaTitle,
      ctaSubtitle,
      ctaButton
    }
  `);
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      siteDescription,
      logo,
      navItems,
      ctaButton,
      footerDescription,
      footerLinks,
      copyrightText,
      socialLinks,
      downloadLinks,
      contactInfo,
      seo
    }
  `);
}

// Legal pages (Privacy Policy, Terms)
export async function getLegalPage(slug: string) {
  return client.fetch(
    `
    *[_type == "legalPage" && slug.current == $slug][0] {
      title,
      slug,
      lastUpdated,
      content
    }
  `,
    { slug }
  );
}

// Release Notes for What's New page
export async function getReleaseNotes() {
  return client.fetch(`
    *[_type == "releaseNote"] | order(releaseDate desc) {
      _id,
      version,
      title,
      releaseDate,
      isLatest,
      summary,
      features,
      improvements,
      supportedSports
    }
  `);
}

// What's New page settings
export async function getWhatsNewPage() {
  return client.fetch(`
    *[_type == "whatsNewPage"][0] {
      title,
      subtitle,
      comingSoonTitle,
      comingSoonIntro,
      comingSoonFeatures,
      ctaText,
      ctaButtonText,
      ctaButtonLink
    }
  `);
}

// Support page
export async function getSupportPage() {
  return client.fetch(`
    *[_type == "supportPage"][0] {
      title,
      subtitle,
      formTitle,
      formspreeId,
      subjectOptions,
      contactTitle,
      contactEmail,
      responseTime,
      faqTitle,
      faqs,
      addressTitle,
      mailingAddress
    }
  `);
}
