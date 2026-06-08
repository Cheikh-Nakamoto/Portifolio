'use client';

import React, { useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const QUESTIONS = [
  {
    q: "Comment se déroule le démarrage d'une mission ?",
    a: "Tout commence par un appel de cadrage gratuit de 30 minutes. J'évalue le besoin, puis je vous envoie sous 48h une proposition claire avec périmètre, approche technique et estimation. Une fois validée, je peux généralement démarrer sous une semaine.",
  },
  {
    q: 'Travaillez-vous en remote ou sur site ?',
    a: "Je travaille à 100% en remote depuis Dakar, avec une disponibilité sur les fuseaux européens et africains. Des déplacements ponctuels sont possibles pour les ateliers de cadrage ou les moments clés du projet, selon vos besoins.",
  },
  {
    q: 'Pouvez-vous intervenir sur un projet existant ?',
    a: 'Absolument. Une grande partie de mes missions consistent à reprendre, auditer ou faire évoluer des bases de code existantes. Je commence systématiquement par un diagnostic pour cartographier l’existant avant toute intervention.',
  },
  {
    q: 'Comment garantissez-vous la qualité du code ?',
    a: 'Tests automatisés, revues de code, intégration continue et documentation font partie de chaque livrable — comme pour TradeFlowSN (233 tests) ou Kay-Point. Vous gardez un accès complet au dépôt à tout moment.',
  },
  {
    q: 'Que se passe-t-il après la livraison ?',
    a: 'Chaque projet au forfait inclut 30 jours de support pour corriger les éventuels ajustements. Au-delà, je propose des formules de maintenance ou de régie pour faire évoluer le produit sur le long terme.',
  },
  {
    q: 'Signez-vous des accords de confidentialité ?',
    a: 'Oui, sans aucun problème. Je signe volontiers vos NDA et contrats. La confidentialité et la propriété intellectuelle de votre code et de vos données vous reviennent intégralement.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b" style={{ borderColor: 'var(--line)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-transparent border-0 text-left flex items-center justify-between gap-5 py-5 font-display font-semibold text-[1.12rem]"
        style={{ color: 'var(--text)' }}
      >
        {q}
        <span
          className="flex-none w-6 h-6 rounded-full border grid place-items-center text-[1rem] leading-none transition-transform duration-300"
          style={{
            borderColor: open ? 'var(--accent-line)' : 'var(--line-2)',
            color: open ? 'var(--accent)' : 'var(--text-2)',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>
      <div
        ref={ref}
        className="overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
        style={{ maxHeight: open ? (ref.current?.scrollHeight ?? 400) : 0 }}
      >
        <p className="pb-5 max-w-[680px]" style={{ color: 'var(--text-2)' }}>{a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="container-px">
        <Reveal className="max-w-[680px] mx-auto text-center mb-16">
          <span className="eyebrow center">FAQ</span>
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] mt-4">Questions fréquentes</h2>
        </Reveal>
        <Reveal className="max-w-[820px] mx-auto">
          {QUESTIONS.map((item) => <FaqItem key={item.q} {...item} />)}
        </Reveal>
      </div>
    </section>
  );
}
