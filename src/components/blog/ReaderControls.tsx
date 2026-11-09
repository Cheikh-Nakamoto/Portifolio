'use client';

import { useEffect, useState } from 'react';

const SIZES = [
  { id: 'base', label: 'A', title: 'Taille normale' },
  { id: 'lg', label: 'A+', title: 'Texte plus grand' },
  { id: 'xl', label: 'A++', title: 'Texte très grand' },
] as const;
type Size = (typeof SIZES)[number]['id'];

/** Taille du texte + mode Focus (masque la navigation, Esc pour sortir). */
export function ReaderControls() {
  const [size, setSize] = useState<Size>('base');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem('reader-size') as Size | null;
      if (s && SIZES.some((x) => x.id === s)) setSize(s);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.readerSize = size;
    try { localStorage.setItem('reader-size', size); } catch {}
  }, [size]);

  useEffect(() => {
    document.documentElement.classList.toggle('reader-focus', focus);
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocus(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus]);

  useEffect(() => () => {
    document.documentElement.classList.remove('reader-focus');
    delete document.documentElement.dataset.readerSize;
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Taille du texte" className="inline-flex rounded-full border p-0.5" style={{ borderColor: 'var(--line-2)' }}>
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              title={s.title}
              aria-pressed={size === s.id}
              onClick={() => setSize(s.id)}
              className="font-mono text-[.8rem] px-3 py-1 rounded-full transition-colors"
              style={size === s.id ? { background: 'var(--bg-3)', color: 'var(--text)' } : { color: 'var(--text-2)' }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFocus(true)}
          className="font-mono text-[.8rem] px-3.5 py-1.5 rounded-full border transition-colors hover:text-[var(--text)]"
          style={{ borderColor: 'var(--line-2)', color: 'var(--text-2)' }}
        >
          ◎ Focus
        </button>
      </div>
      {focus && (
        <button
          type="button"
          onClick={() => setFocus(false)}
          className="fixed top-4 right-4 z-[130] font-mono text-[.8rem] px-4 py-2 rounded-full border"
          style={{ background: 'var(--bg-2)', borderColor: 'var(--line-2)', color: 'var(--text-2)' }}
        >
          Quitter le mode focus <kbd className="ml-1 px-1.5 rounded border" style={{ borderColor: 'var(--line-2)' }}>Esc</kbd>
        </button>
      )}
    </>
  );
}
