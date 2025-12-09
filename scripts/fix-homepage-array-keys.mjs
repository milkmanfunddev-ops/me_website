import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function fixMissingKeys() {
  console.log('Fetching homepage document...\n');

  // Fetch the homepage document
  const docs = await client.fetch(`*[_type == "homepage"]`);

  if (docs.length === 0) {
    console.log('No homepage document found.');
    return;
  }

  for (const doc of docs) {
    console.log(`Processing document: ${doc._id}`);

    const updates = {};

    // Fix features array
    if (doc.features && Array.isArray(doc.features)) {
      const updatedFeatures = doc.features.map(item => ({
        ...item,
        _key: item._key || nanoid(),
        _type: 'feature',
      }));
      updates.features = updatedFeatures;
      console.log(`   Fixed ${doc.features.length} features`);
    }

    // Fix testimonials array
    if (doc.testimonials && Array.isArray(doc.testimonials)) {
      const updatedTestimonials = doc.testimonials.map(item => ({
        ...item,
        _key: item._key || nanoid(),
        _type: 'testimonial',
      }));
      updates.testimonials = updatedTestimonials;
      console.log(`   Fixed ${doc.testimonials.length} testimonials`);
    }

    // Fix faqs array
    if (doc.faqs && Array.isArray(doc.faqs)) {
      const updatedFaqs = doc.faqs.map(item => ({
        ...item,
        _key: item._key || nanoid(),
        _type: 'faq',
      }));
      updates.faqs = updatedFaqs;
      console.log(`   Fixed ${doc.faqs.length} FAQs`);
    }

    // Apply updates if there are any
    if (Object.keys(updates).length > 0) {
      await client.patch(doc._id).set(updates).commit();
      console.log(`   Document updated successfully!`);
    } else {
      console.log(`   No arrays to fix in this document.`);
    }
  }

  console.log('\nMigration complete!');
}

fixMissingKeys().catch(console.error);
