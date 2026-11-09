import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/** Encadré utilisable dans les articles : <Callout type="tip">…</Callout> */
function Callout({ type = 'note', children }: { type?: 'note' | 'tip' | 'warning'; children: React.ReactNode }) {
  const label = { note: 'Note', tip: 'Tip', warning: 'Warning' }[type];
  return (
    <aside className={`callout callout--${type}`}>
      <div className="callout__label">{label}</div>
      <div>{children}</div>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  a: ({ href = '', children, ...props }) =>
    href.startsWith('/') || href.startsWith('#') ? (
      <Link href={href} {...props}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    ),
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (props) => <img loading="lazy" {...props} />,
  Callout,
};
