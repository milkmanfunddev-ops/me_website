// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  // Keystatic GitHub auth needs serverless functions; use hybrid output for Vercel
  output: 'hybrid',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
