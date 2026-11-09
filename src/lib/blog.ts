import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import GithubSlugger from 'github-slugger';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

import type { Heading, Post, PostMeta } from './blog-shared';

export type { Heading, Post, PostMeta } from './blog-shared';
export { formatDate } from './blog-shared';

function readPostFile(file: string): Post {
  const slug = file.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    throw new Error(`content/blog/${file} : "title" et "date" sont obligatoires dans le frontmatter.`);
  }

  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);

  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ''),
    date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
    headings: extractHeadings(content),
  };
}

/** Extrait les titres ## et ### (hors blocs de code) avec les mêmes ids que rehype-slug. */
function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
    headings.push({ id: slugger.slug(text), text, level: m[1].length as 2 | 3 });
  }
  return headings;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
}

const showDrafts = process.env.NODE_ENV !== 'production';

export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map(readPostFile)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _c, headings: _h, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const file = listFiles().find((f) => f.replace(/\.mdx?$/, '') === slug);
  if (!file) return null;
  const post = readPostFile(file);
  if (post.draft && !showDrafts) return null;
  return post;
}

/** Article précédent (plus ancien) et suivant (plus récent). */
export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? posts[i - 1] : null,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  };
}
