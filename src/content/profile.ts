import { siteConfig } from '@/config/site';

/**
 * Contenu de la page /a-propos.
 * Modifie ce fichier pour mettre à jour ta story, ton parcours et tes certifications.
 */

export interface TimelineItem {
  period: string;
  kind?: string;
  title: string;
  org: string;
  summary?: string;
  points?: string[];
  link?: string;
}

export interface CertificationGroup {
  group: string;
  items: { name: string; issuer: string; date?: string; url?: string }[];
}

export const cvPdf = '/cv-cheikh-diouf.pdf';

// TODO (Cheikh) : relis et personnalise ta story — c'est un brouillon.
export const story: string[] = [
  "J'ai toujours voulu comprendre ce qui se passe derrière l'écran. Au départ, c'était de la curiosité : comment une application sait-elle qui je suis, comment une page s'affiche en une fraction de seconde, comment des millions de personnes peuvent utiliser le même service en même temps ?",
  "En janvier 2023, j'ai rejoint 01 Talent Senegal (Zone 01 Dakar). Pas de cours magistraux : des projets, des pairs, des code reviews et beaucoup d'heures à déboguer. En trois ans, j'ai construit plus de 30 projets en Go, Java, Rust et TypeScript, du schéma de base de données jusqu'au déploiement Docker et aux pipelines CI/CD.",
  "Certains projets sont devenus plus ambitieux que prévu : Kay-Point, un concept de SaaS multi-tenant de 23k+ lignes de Go ; TradeFlowSN, une plateforme logistique en production avec 233 tests automatisés ; Generateur-d'architecture, un outil Rust piloté par l'IA. J'ai aussi mis mes compétences au service de RBS, un collectif d'artistes graphistes, en bénévole.",
  "Aujourd'hui, j'aime autant livrer un produit que des gens utilisent que comprendre les systèmes qui le font tourner. Je m'intéresse à la crypto, je veux contribuer à l'open source, et j'accompagne les porteurs d'idées pour qu'elles deviennent des produits réels. Ce site — et surtout son blog — est l'endroit où je partage ce que j'apprends en chemin.",
];

export const experience: TimelineItem[] = [
  {
    period: 'Jan 2023 — Avr 2026',
    kind: 'Formation intensive',
    title: siteConfig.experience.role,
    org: siteConfig.experience.company,
    summary: siteConfig.experience.description,
    points: [
      '30+ projets fullstack en Go, Java, Rust et TypeScript, en pédagogie par les pairs (architecture, tests, déploiement).',
      'Kay-Point : concept de SaaS multi-tenant — 23 300+ lignes de Go, dashboard React 19 et app mobile Flutter.',
      'TradeFlowSN : SaaS logistique en ligne (tradeflowsn.com), 233 tests automatisés, conversion EUR/USD/XOF, JWT/RBAC et CI/CD Jenkins.',
      "Generateur-d'architecture : app desktop Rust avec intégration Gemini (7 ⭐ GitHub).",
      'Code reviews et pair programming sur les bonnes pratiques Go, Rust et Java.',
    ],
  },
  {
    // TODO (Cheikh) : ajoute la période exacte de ta mission RBS.
    period: 'Mission bénévole',
    title: siteConfig.volunteer.role,
    org: siteConfig.volunteer.organization,
    summary: siteConfig.volunteer.description,
    points: [
      'Monorepo API Go (chi, pgx, sqlc) + Next.js 16 (App Router, React 19).',
      'Paiements multi-provider : Stripe, Wave, Orange Money. Stockage média Cloudflare R2.',
      'Migration depuis WordPress et back-office multi-rôles (RBAC).',
    ],
  },
];

export const education: TimelineItem[] = [
  {
    period: '2023 — 2026',
    kind: 'Formation technique',
    title: 'Ingénierie logicielle fullstack',
    org: '01 Talent Senegal — Zone 01 Dakar',
    summary:
      'Go, Rust, Java 17 & Spring Boot, JavaScript/TypeScript, React, Angular, Flutter, Docker, CI/CD, algorithmes et soft skills.',
  },
  {
    period: '2018 — 2021',
    kind: 'Baccalauréat',
    title: 'Baccalauréat scientifique (S2)',
    org: 'Lycée Demba Diop — Mbour',
    summary: 'Mathématiques et sciences physiques.',
  },
];

export const certifications: CertificationGroup[] = [
  {
    group: 'Blockchain',
    items: siteConfig.certifications
      .filter((c) => c.issuer.includes('Hedera'))
      .map((c) => ({ name: c.name, issuer: `${c.issuer} — HCS, HTS`, date: c.date, url: c.url })),
  },
  {
    group: 'Langages & frameworks',
    items: siteConfig.certifications
      .filter((c) => !c.issuer.includes('Hedera'))
      .map((c) => ({
        name: c.name,
        issuer: `${c.issuer} — Java 17, Spring Boot, microservices`,
        date: 'Avr 2025',
        url: c.url !== '#' ? c.url : undefined,
      })),
  },
];

export const community: TimelineItem[] = [
  {
    period: 'Depuis 2023',
    title: 'Hackathons & projets collectifs',
    org: 'Zone 01 Dakar',
    summary: 'Participation à des hackathons et à des projets en équipe, en peer-learning.',
  },
  {
    period: 'Objectif',
    title: 'Contribution open source',
    org: 'GitHub',
    summary: "60+ dépôts publics ; prochaine étape : contribuer régulièrement à des projets open source de l'écosystème Go et Rust.",
    link: siteConfig.links.github,
  },
];
