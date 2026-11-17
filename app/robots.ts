import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/auth/session', '/api/'],
      disallow: ['/auth/callback', '/dashboard'],
    },
    sitemap: 'https://www.studentrso.in/sitemap.xml',
  };
}
