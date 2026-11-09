import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { AboutTabs } from '@/components/about/AboutTabs';
import { Timeline } from '@/components/about/Timeline';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { story, experience, education, certifications, community, cvPdf } from '@/content/profile';

export const metadata: Metadata = {
  title: 'À propos',
  description: `Mon histoire, mon parcours et mes certifications — ${siteConfig.tagline}.`,
};

export default function AboutPage() {
  const tabs = [
    {
      id: 'story',
      label: 'Story',
      content: (
        <div className="max-w-[720px] space-y-5 text-[clamp(1.02rem,1.5vw,1.15rem)] leading-relaxed" style={{ color: 'var(--text-2)' }}>
          {story.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
          <div className="flex flex-wrap gap-2 pt-4">
            {siteConfig.languages.map((l) => (
              <span key={l.name} className="tag">{l.name} · {l.level}</span>
            ))}
          </div>
        </div>
      ),
    },
    { id: 'experience', label: 'Expérience', content: <Timeline items={experience} /> },
    { id: 'formation', label: 'Formation', content: <Timeline items={education} /> },
    {
      id: 'certifications',
      label: 'Certifications',
      content: (
        <div className="grid gap-10">
          {certifications.filter((g) => g.items.length).map((g) => (
            <div key={g.group}>
              <h3 className="font-mono text-[.74rem] tracking-[.12em] uppercase mb-4" style={{ color: 'var(--text-3)' }}>{g.group}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {g.items.map((c) => {
                  const inner = (
                    <>
                      <div className="flex justify-between gap-4 items-start">
                        <div className="font-display font-semibold text-[1.08rem]">{c.name}</div>
                        {c.date && <div className="font-mono text-[.78rem] shrink-0" style={{ color: 'var(--text-3)' }}>{c.date}</div>}
                      </div>
                      <div className="text-[.93rem] mt-1.5" style={{ color: 'var(--text-2)' }}>{c.issuer}</div>
                      {c.url && <div className="font-mono text-[.78rem] mt-4" style={{ color: 'var(--accent)' }}>Voir le certificat ↗</div>}
                    </>
                  );
                  return c.url ? (
                    <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="card card-hover !p-6 block">{inner}</a>
                  ) : (
                    <div key={c.name} className="card !p-6">{inner}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    { id: 'communaute', label: 'Communauté', content: <Timeline items={community} /> },
  ];

  return (
    <PageShell>
      <section className="py-16 md:py-24">
        <div className="container-px">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="flex items-center gap-6">
              <img src="/portrait.jpg" alt="Portrait de Cheikh Diouf" className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border" style={{ borderColor: 'var(--line-2)' }} />
              <div>
                <span className="eyebrow">À propos</span>
                <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] mt-3">{siteConfig.name}</h1>
                <p className="mt-2 font-mono text-[.88rem]" style={{ color: 'var(--text-2)' }}>{siteConfig.tagline}</p>
              </div>
            </div>
            <a href={cvPdf} download className="btn btn-primary self-start md:self-auto">
              Télécharger le CV <span className="font-mono text-[.8rem] opacity-80">PDF</span> <span className="arrow">↓</span>
            </a>
          </Reveal>

          <AboutTabs tabs={tabs} />

          <Reveal className="card mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-display font-semibold text-[1.6rem] tracking-tight">Envie de travailler ensemble ?</h2>
              <p className="mt-1" style={{ color: 'var(--text-2)' }}>Un projet, une opportunité ou une question technique — écris-moi.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog" className="btn btn-ghost">Lire le blog</Link>
              <Link href="/#contact" className="btn btn-primary">Parlons-en <span className="arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
