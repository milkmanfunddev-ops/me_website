import { config, fields, collection } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';
const repoOwner = process.env.GITHUB_REPO_OWNER ?? 'milkmanfunddev-ops';
const repoName = process.env.GITHUB_REPO_NAME ?? 'me_website';

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: repoOwner,
          name: repoName,
        },
      }
    : {
        kind: 'local',
      },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Publish Date',
        }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});
