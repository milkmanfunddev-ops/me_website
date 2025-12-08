export const GET = async () => {
  return new Response(JSON.stringify({
    KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'NOT SET',
    PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID: process.env.PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || 'NOT SET',
    PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG || 'NOT SET',
    KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET ? 'SET (hidden)' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
};
