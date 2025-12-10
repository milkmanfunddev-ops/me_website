import { defineType } from 'sanity';

export default defineType({
  name: 'youtubeEmbed',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }).custom((url) => {
          if (!url) return true;
          const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
          return isYouTube || 'Must be a valid YouTube URL';
        }),
    },
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Title for accessibility (will be used as iframe title)',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the video',
    },
    {
      name: 'startTime',
      title: 'Start Time (seconds)',
      type: 'number',
      description: 'Optional: Start the video at a specific time',
    },
  ],
  preview: {
    select: {
      url: 'url',
      title: 'title',
    },
    prepare({ url, title }) {
      // Extract video ID for thumbnail
      let videoId = '';
      if (url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        videoId = match ? match[1] : '';
      }
      return {
        title: title || 'YouTube Video',
        subtitle: url || 'No URL set',
        media: videoId
          ? () => null // Could add thumbnail preview here
          : undefined,
      };
    },
  },
});
