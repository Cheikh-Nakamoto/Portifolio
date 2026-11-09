import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((p) => !p.draft);
  return [
    { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/a-propos`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({ url: `${siteConfig.url}/blog/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
