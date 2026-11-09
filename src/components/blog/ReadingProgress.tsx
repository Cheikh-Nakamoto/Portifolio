'use client';

import { useEffect, useState } from 'react';

/** Barre de progression + reprise de lecture (« Continuer la lecture »). */
export function ReadingProgress({ slug }: { slug: string }) {
  const [progress, setProgress] = useState(0);
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const key = `read-pos:${slug}`;

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(key));
      if (saved > 600) setResumeAt(saved);
    } catch {}

    let last = 0;
    const onScroll = () => {
      const el = document.getElementById('article-body');
      if (!el) return;
      const start = el.offsetTop - 120;
      const total = el.offsetHeight - window.innerHeight + 240;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, total)));
      setProgress(p);
      const now = Date.now();
      if (now - last > 800) {
        last = now;
        try {
          if (p > 0.97) localStorage.removeItem(key);
          else localStorage.setItem(key, String(Math.round(window.scrollY)));
        } catch {}
      }
      if (window.scrollY > 600) setResumeAt(null);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key]);

  return (
    <>
      <div aria-hidden className="fixed top-0 left-0 right-0 h-[3px] z-[120] pointer-events-none">
        <div className="h-full origin-left" style={{ background: 'var(--accent)', transform: `scaleX(${progress})` }} />
      </div>
      {resumeAt !== null && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 rounded-full border px-2 py-2 shadow-lg" style={{ background: 'var(--bg-2)', borderColor: 'var(--line-2)' }}>
          <button type="button" className="btn btn-primary !py-2 !px-4 !text-[.88rem]" onClick={() => { window.scrollTo({ top: resumeAt, behavior: 'smooth' }); setResumeAt(null); }}>
            Continuer la lecture ↘
          </button>
          <button type="button" className="btn btn-ghost !py-2 !px-4 !text-[.88rem]" onClick={() => { setResumeAt(null); try { localStorage.removeItem(key); } catch {} }}>
            Recommencer
          </button>
        </div>
      )}
    </>
  );
}
