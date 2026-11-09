import Link from 'next/link';
import type { PostMeta } from '@/lib/blog-shared';
import { formatDate } from '@/lib/blog-shared';

export function PostCard({ post, onTagClick }: { post: PostMeta; onTagClick?: (tag: string) => void }) {
  return (
    <article className="group relative py-8 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[.78rem]" style={{ color: 'var(--text-3)' }}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>~{post.readingMinutes} min de lecture</span>
        {post.draft && <span style={{ color: 'var(--accent)' }}>BROUILLON</span>}
      </div>
      <h2 className="font-display font-semibold text-[clamp(1.3rem,2.4vw,1.7rem)] tracking-tight mt-2" lang="en">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-[var(--accent)] transition-colors">
          {post.title} <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </Link>
      </h2>
      {post.description && (
        <p className="mt-2 max-w-[720px]" style={{ color: 'var(--text-2)' }} lang="en">{post.description}</p>
      )}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 relative z-[1]">
          {post.tags.map((t) =>
            onTagClick ? (
              <button key={t} type="button" onClick={() => onTagClick(t)} className="tag hover:border-[var(--accent-line)] hover:text-[var(--text)]">
                #{t}
              </button>
            ) : (
              <span key={t} className="tag">#{t}</span>
            ),
          )}
        </div>
      )}
    </article>
  );
}
