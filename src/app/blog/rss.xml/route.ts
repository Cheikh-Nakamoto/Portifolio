import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const posts = getAllPosts().filter((p) => !p.draft);
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${siteConfig.url}/blog/${p.slug}</link>
      <guid>${siteConfig.url}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(siteConfig.name)} — Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Notes on what I learn while building software.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
