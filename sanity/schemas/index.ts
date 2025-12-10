import post from './post';
import siteSettings from './siteSettings';
import homepage from './homepage';
import legalPage from './legalPage';
import releaseNote from './releaseNote';
import supportPage from './supportPage';
import whatsNewPage from './whatsNewPage';

// Object types
import feature from './objects/feature';
import testimonial from './objects/testimonial';
import faq from './objects/faq';
import youtubeEmbed from './objects/youtubeEmbed';
import codeBlock from './objects/codeBlock';
import pullQuote from './objects/pullQuote';

export const schemaTypes = [
  // Document types
  post,
  siteSettings,
  homepage,
  legalPage,
  releaseNote,
  supportPage,
  whatsNewPage,
  // Object types
  feature,
  testimonial,
  faq,
  youtubeEmbed,
  codeBlock,
  pullQuote,
];
