import Link from 'next/link';
import type { PostMeta } from '@/lib/blog-shared';
import { formatDate } from '@/lib/blog-shared';
import { Reveal } from '@/components/ui/Reveal';

export function LatestPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-[640px]">
            <span className="eyebrow">Blog</span>
            <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Ce que j&apos;apprends en construisant</h2>
          </div>
          <Link href="/blog" className="btn btn-ghost">Tous les articles <span className="arrow">→</span></Link>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/blog/${p.slug}`} className="card card-hover !p-7 flex flex-col h-full group">
                <div className="font-mono text-[.76rem]" style={{ color: 'var(--text-3)' }}>
                  {formatDate(p.date)} · ~{p.readingMinutes} min
                </div>
                <h3 className="font-display font-semibold text-[1.25rem] tracking-tight mt-3 group-hover:text-[var(--accent)] transition-colors" lang="en">{p.title}</h3>
                <p className="mt-2 text-[.95rem] flex-1" style={{ color: 'var(--text-2)' }} lang="en">{p.description}</p>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {p.tags.slice(0, 3).map((t) => <span key={t} className="tag">#{t}</span>)}
                  </div>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
