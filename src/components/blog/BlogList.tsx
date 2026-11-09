'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { PostMeta } from '@/lib/blog-shared';
import { PostCard } from './PostCard';

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  // Lien direct : /blog?tag=go
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tag');
    if (t) setTag(t);
  }, []);

  const updateTag = (t: string | null) => {
    setTag(t);
    const url = new URL(window.location.href);
    if (t) url.searchParams.set('tag', t);
    else url.searchParams.delete('tag');
    history.replaceState(null, '', url);
  };

  const tags = useMemo(() => {
    const count = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag && !p.tags.includes(tag)) return false;
      if (!q) return true;
      return [p.title, p.description, ...p.tags].join(' ').toLowerCase().includes(q);
    });
  }, [posts, query, tag]);

  const hasFilters = Boolean(tag || query);
  const reset = () => {
    setQuery('');
    updateTag(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mb-6">
        <label className="relative block">
          <span className="sr-only">Rechercher un article</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un titre, un sujet, un mot-clé…"
            className="w-full rounded-xl border px-4 py-3 text-[.97rem] outline-none focus:border-[var(--accent-line)] cursor-text"
            style={{ background: 'var(--bg-2)', borderColor: 'var(--line-2)', color: 'var(--text)' }}
          />
        </label>
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[.74rem] tracking-[.12em] uppercase mr-1" style={{ color: 'var(--text-3)' }}>Sujet :</span>
            {tags.map(([t, n]) => {
              const on = tag === t;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => updateTag(on ? null : t)}
                  className="tag transition-colors"
                  style={on ? { background: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' } : undefined}
                >
                  #{t} <span className="opacity-60">{n}</span>
                </button>
              );
            })}
            {hasFilters && (
              <button type="button" onClick={reset} className="font-mono text-[.8rem] ml-1 underline underline-offset-4" style={{ color: 'var(--text-2)' }}>
                Effacer ×
              </button>
            )}
          </div>
        )}
      </div>

      <div className="font-mono text-[.8rem] mb-2" style={{ color: 'var(--text-3)' }}>
        {filtered.length} article{filtered.length > 1 ? 's' : ''}
        {hasFilters && ` sur ${posts.length}`}
      </div>

      {filtered.map((p) => <PostCard key={p.slug} post={p} onTagClick={(t) => updateTag(t)} />)}

      {filtered.length === 0 && (
        <div className="card text-center mt-4">
          <p className="font-display font-semibold text-[1.2rem]">Aucun article trouvé.</p>
          <p className="mt-1" style={{ color: 'var(--text-2)' }}>Essaie un autre titre, sujet ou mot-clé.</p>
          {hasFilters && <button type="button" onClick={reset} className="btn btn-ghost mt-5">Effacer les filtres</button>}
        </div>
      )}
    </div>
  );
}
