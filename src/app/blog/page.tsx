import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { BlogList } from '@/components/blog/BlogList';
import { Reveal } from '@/components/ui/Reveal';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Ce que j'apprends, ce que je construis — notes techniques sur Go, Rust, Java, l'architecture et le DevOps.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <PageShell>
      <section className="py-16 md:py-24">
        <div className="container-px max-w-[920px]">
          <Reveal className="mb-12">
            <span className="eyebrow">Blog · learning in public</span>
            <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] mt-4">Ce que j&apos;apprends, je l&apos;écris.</h1>
            <p className="mt-4 max-w-[640px] text-[1.08rem]" style={{ color: 'var(--text-2)' }}>
              Des notes techniques sur ce que je découvre en construisant : backend, systèmes, architecture, DevOps.
              Les articles sont en anglais.{' '}
              <a href="/blog/rss.xml" className="underline underline-offset-4 hover:text-[var(--accent)]">Flux RSS</a>
            </p>
          </Reveal>
          <BlogList posts={posts} />
        </div>
      </section>
    </PageShell>
  );
}
