import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  // Match both folder-based (*/index.mdoc) and direct file (*.mdoc) posts
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { posts };
