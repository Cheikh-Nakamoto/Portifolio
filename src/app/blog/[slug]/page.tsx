import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { PageShell } from '@/components/layout/PageShell';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReaderControls } from '@/components/blog/ReaderControls';
import { mdxComponents } from '@/components/blog/mdx';
import { getAllPosts, getPostBySlug, getAdjacentPosts, formatDate } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      url: `/blog/${post.slug}`,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(post.slug);

  return (
    <PageShell>
      <ReadingProgress slug={post.slug} />
      <div className="container-px py-12 md:py-16">
        <div className="article-layout">
          <article className="min-w-0" lang="en">
            <Link href="/blog" lang="fr" className="font-mono text-[.82rem] hover:text-[var(--accent)]" style={{ color: 'var(--text-2)' }}>
              ← Tous les articles
            </Link>
            <header className="mt-8 mb-10">
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[.8rem]" style={{ color: 'var(--text-3)' }} lang="fr">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>~{post.readingMinutes} min de lecture</span>
                {post.draft && <span style={{ color: 'var(--accent)' }}>BROUILLON</span>}
              </div>
              <h1 className="display text-[clamp(2rem,4.6vw,3.2rem)] mt-3 text-balance">{post.title}</h1>
              {post.description && <p className="mt-4 text-[1.15rem]" style={{ color: 'var(--text-2)' }}>{post.description}</p>}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--line)' }} lang="fr">
                <div className="flex items-center gap-3 text-[.92rem]" style={{ color: 'var(--text-2)' }}>
                  <img src="/avatar-original.jpeg" alt="" className="w-8 h-8 rounded-full object-cover" />
                  Par <Link href="/a-propos" className="font-semibold hover:text-[var(--accent)]" style={{ color: 'var(--text)' }}>{siteConfig.name}</Link>
                </div>
                <ReaderControls />
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {post.tags.map((t) => (
                    <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="tag hover:text-[var(--text)]">#{t}</Link>
                  ))}
                </div>
              )}
            </header>

            <div id="article-body" className="prose">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                      [rehypePrettyCode, { theme: { dark: 'github-dark-dimmed', light: 'github-light' }, keepBackground: false }],
                    ],
                  },
                }}
              />
            </div>

            <nav aria-label="Articles" className="grid sm:grid-cols-2 gap-4 mt-16 pt-10 border-t" style={{ borderColor: 'var(--line)' }} lang="fr">
              {older ? (
                <Link href={`/blog/${older.slug}`} className="card card-hover !p-5 block">
                  <div className="font-mono text-[.76rem]" style={{ color: 'var(--text-3)' }}>← Article précédent</div>
                  <div className="font-display font-semibold mt-1.5" lang="en">{older.title}</div>
                </Link>
              ) : <span />}
              {newer && (
                <Link href={`/blog/${newer.slug}`} className="card card-hover !p-5 block sm:text-right">
                  <div className="font-mono text-[.76rem]" style={{ color: 'var(--text-3)' }}>Article suivant →</div>
                  <div className="font-display font-semibold mt-1.5" lang="en">{newer.title}</div>
                </Link>
              )}
            </nav>
            <div className="mt-8" lang="fr">
              <Link href="/blog" className="font-mono text-[.85rem] hover:text-[var(--accent)]" style={{ color: 'var(--text-2)' }}>← Retour à tous les articles</Link>
            </div>
          </article>

          <aside className="toc-sidebar">
            <TableOfContents headings={post.headings} />
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
