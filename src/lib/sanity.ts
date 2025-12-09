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

// Query helpers
export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
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
      description,
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
      footerLinks
    }
  `);
}
