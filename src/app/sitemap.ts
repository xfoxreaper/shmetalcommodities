import type { MetadataRoute } from 'next';

const BASE_URL = 'https://shmetalcommodities.com';
const locales = ['en', 'de', 'zh', 'ar'] as const;
const pages = ['', '/about', '/services', '/insights', '/team', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
