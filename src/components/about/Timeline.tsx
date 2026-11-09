import type { TimelineItem } from '@/content/profile';

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((it) => (
        <li key={`${it.org}-${it.title}`} className="timeline__item">
          <div className="font-mono text-[.78rem] tracking-[.04em]" style={{ color: 'var(--text-3)' }}>
            {it.period}
            {it.kind && <span style={{ color: 'var(--accent)' }}> · {it.kind}</span>}
          </div>
          <h3 className="font-display font-semibold text-[1.25rem] tracking-tight mt-1.5">{it.title}</h3>
          <div className="text-[.95rem] mt-0.5" style={{ color: 'var(--text-2)' }}>
            {it.link ? (
              <a href={it.link} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--line-2)] underline-offset-4 hover:text-[var(--text)]">
                {it.org} ↗
              </a>
            ) : (
              it.org
            )}
          </div>
          {it.summary && <p className="mt-3" style={{ color: 'var(--text-2)' }}>{it.summary}</p>}
          {it.points && (
            <ul className="mt-3 space-y-1.5 list-none">
              {it.points.map((p) => (
                <li key={p} className="relative pl-5 text-[.97rem]" style={{ color: 'var(--text-2)' }}>
                  <span className="absolute left-0 top-[.7em] w-2 h-px" style={{ background: 'var(--accent)' }} />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
