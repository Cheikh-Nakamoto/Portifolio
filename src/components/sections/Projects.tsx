'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

export function Projects() {
  const projects = siteConfig.featuredProjects.slice(0, 6);

  return (
    <section id="projets" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[760px] mb-16">
          <span className="eyebrow">Projets phares</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Une sélection de réalisations</h2>
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.live ?? p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover group flex flex-col gap-4 h-full"
            >
              {p.image ? (
                <div className="relative aspect-[16/10] mb-0.5 rounded-lg overflow-hidden">
                  <Image src={p.image} alt={`Aperçu ${p.name}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
              ) : (
                <div className="ph aspect-[16/10] mb-0.5"><span className="ph__label">aperçu projet</span></div>
              )}
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display font-semibold text-[1.18rem]">{p.name}</h3>
                <span
                  className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--text-3)' }}
                >
                  <HiOutlineArrowUpRight className="w-5 h-5 group-hover:text-[var(--accent)]" />
                </span>
              </div>
              <p className="text-[.93rem]" style={{ color: 'var(--text-2)' }}>{p.description}</p>
              <div className="font-mono text-[.76rem] mt-auto pt-3" style={{ color: 'var(--text-3)' }}>
                {p.stack.join(' · ')}
              </div>
            </a>
          ))}
        </Reveal>
        <Reveal className="text-center mt-12">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Tout voir sur GitHub <span className="arrow">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
