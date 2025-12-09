import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'vg2p7rx4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function uploadImage() {
  console.log('📸 Uploading hero image to Sanity...\n');

  const imagePath = '/Users/leemartin/development/mealvana_endurance_landing_page/assets/images/blog_image_1.png';

  // Upload the image
  console.log('   Uploading image...');
  const imageAsset = await client.assets.upload('image', createReadStream(imagePath), {
    filename: 'charity-runners-playbook-hero.png',
  });

  console.log(`   ✅ Image uploaded: ${imageAsset._id}`);

  // Update the charity runner's playbook post with the hero image
  console.log('\n📝 Updating post with hero image...');

  await client
    .patch('post-charity-runners-playbook')
    .set({
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    })
    .commit();

  console.log('   ✅ Post updated with hero image');

  console.log('\n✨ Done! The hero image has been added to the Charity Runner\'s Playbook post.');
}

uploadImage().catch(console.error);
