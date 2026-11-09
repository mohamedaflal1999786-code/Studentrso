import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/callback'],
    },
    sitemap: 'https://studentrso.in/sitemap.xml',
  };
}
