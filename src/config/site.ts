export const siteConfig = {
  name: "Cheikh Mounirou Coly Diouf",
  title: "Cheikh Diouf — Fullstack Engineer | Go, Java, Rust",
  description: "Fullstack Engineer avec 3+ ans d'expérience en ingénierie logicielle. 30+ projets (apprentissage, hackathons, projets perso). Go, Java, Rust, TypeScript. Crypto-enthousiaste & future open source contributor.",
  tagline: "Fullstack Engineer — Go, Java, Rust, TypeScript",
  phone: "+221 778 879 040",

  github: {
    username: "Cheikh-Nakamoto",
    apiUrl: "https://api.github.com",
  },

  links: {
    github: "https://github.com/Cheikh-Nakamoto",
    linkedin: "https://www.linkedin.com/in/cheikh-mounirou-coly-diouf-3549b6241",
    email: "feppdougou@gmail.com",
  },

  bio: "Fullstack Engineer avec 3+ ans d'expérience en ingénierie logicielle. J'ai développé plus de 30 projets — certains en apprentissage, d'autres lors de hackathons ou comme projets personnels. Je construis des produits complets, du schéma de base de données au déploiement Docker. Crypto-enthousiaste, futur contributeur open source, et j'accompagne les 'idea guys' à matérialiser leurs idées.",

  aspirations: [
    "Crypto-enthousiaste",
    "Future open source contributor",
  ],

  mission: "J'accompagne les 'idea guys' à matérialiser leurs idées.",

  skills: [
    { name: "Go", category: "language" as const },
    { name: "Java 17", category: "language" as const },
    { name: "Rust", category: "language" as const },
    { name: "TypeScript", category: "language" as const },
    { name: "JavaScript", category: "language" as const },
    { name: "Python", category: "language" as const },
    { name: "C", category: "language" as const },
    { name: "React 19", category: "framework" as const },
    { name: "Next.js", category: "framework" as const },
    { name: "Angular 17", category: "framework" as const },
    { name: "Spring Boot 3", category: "framework" as const },
    { name: "Flutter", category: "framework" as const },
    { name: "Docker", category: "tool" as const },
    { name: "PostgreSQL", category: "tool" as const },
    { name: "Redis", category: "tool" as const },
    { name: "Git", category: "tool" as const },
    { name: "GitHub Actions", category: "tool" as const },
    { name: "Jenkins", category: "tool" as const },
    { name: "Linux", category: "tool" as const },
    { name: "Prometheus", category: "tool" as const },
    { name: "Grafana", category: "tool" as const },
  ],

  experience: {
    company: "01 Talent Senegal (Zone 01 Dakar)",
    role: "Apprenant Ingénieur Fullstack",
    period: "Jan 2023 — April 2026",
    description: "Formation intensive en ingénierie logicielle par la pédagogie par les pairs. Développement de 30+ projets couvrant le backend (Go, Java, Rust), le frontend (React, Angular), le mobile (Flutter) et le DevOps (Docker, Jenkins, CI/CD). Participation à des hackathons et réalisation de projets personnels ambitieux."
  },

  volunteer: {
    organization: "RBS",
    role: "Développeur bénévole",
    description: "Développement bénévole sur le site d'artiste graphiste RBS.",
  },

  certifications: [
    {
      name: "Hedera Certified Developer",
      issuer: "Hedera Hashgraph",
      date: "2025",
      url: "https://certs.hashgraphdev.com/7136d939-5f09-483f-a93f-19e7d504f314.pdf"
    },
    {
      name: "Java Development Certificate",
      issuer: "01 Talent Senegal",
      date: "2025",
      url: "#"
    }
  ],

  featuredProjects: [
    {
      name: "Kay-Point",
      description: "Projet de SaaS multi-tenant de gestion de présence des enseignants — concept ambitieux conçu comme exercice d'architecture à grande échelle. 23k+ lignes de Go, React 19, Flutter. Pas encore en production.",
      stack: ["Go", "Gin", "React 19", "Flutter", "PostgreSQL", "Redis"],
      url: "https://github.com/Cheikh-Nakamoto/Kay-Pointe",
      image: "/Kay-pointé.png", // TODO: Ajouter le lien de l'image/screenshot
      highlight: true,
    },
    {
      name: "TradeFlowSN",
      description: "Plateforme logistique de suivi de conteneurs. Multi-devises (EUR/USD/XOF), 233 tests automatisés, pipeline Jenkins CI/CD.",
      stack: ["Go", "React", "PostgreSQL", "Redis", "Jenkins"],
      url: "https://github.com/Cheikh-Nakamoto/TradeFlowSN",
      image: "/tradeflowsn.png", // TODO: Ajouter le lien de l'image/screenshot
      live: "https://tradeflowsn.com",
      highlight: true,
    },
    {
      name: "Generateur-d'architecture",
      description: "Application desktop en Rust avec 7 GitHub stars. Scaffolding de projets piloté par l'IA via Google Gemini. Interface Material Design 3.",
      stack: ["Rust", "Slint", "Gemini API"],
      url: "https://github.com/Cheikh-Nakamoto/Generateur-d-architecture-",
      image: "/generateur-architecture.png", // TODO: Ajouter le lien de l'image/screenshot
      highlight: true,
    },
    {
      name: "380_Solution",
      description: "Plateforme web pour une société solaire sénégalaise : FAQ, pré-dimensionnement automatique (panneaux, batteries, onduleur), devis PDF, chatbot IA BYOK. Clean Architecture Go + Next.js 14, bilingue FR/Wolof.",
      stack: ["Go", "Gin", "Next.js 14", "PostgreSQL", "Docker", "Jenkins"],
      url: "https://github.com/Cheikh-Nakamoto/380_Solution",
      image: "/380.png", // TODO: Ajouter le lien de l'image/screenshot
      highlight: true,
    },
    {
      name: "RBS_Crew_SN",
      description: "Plateforme e-commerce et vitrine pour artistes graphistes RBS — monorepo avec Go API (chi, pgx, sqlc), Next.js 16, paiements multi-provider (Stripe, Wave, Orange Money), stockage Cloudflare R2.",
      stack: ["Go", "Next.js 16", "PostgreSQL", "Redis", "Docker", "Stripe"],
      url: "https://github.com/Cheikh-Nakamoto/RBS_Crew_SN",
      image: "/rbs-crew.png", // TODO: Ajouter le lien de l'image/screenshot
      highlight: true,
    },
    {
      name: "Agile-Factory-Kernel",
      description: "Boilerplate multi-tenant SaaS en Go 1.25. Clean Architecture, zéro dépendance framework.",
      stack: ["Go", "Clean Architecture", "Docker"],
      url: "https://github.com/Cheikh-Nakamoto/agile-factory-kernel",
      image: "/agile-factory.png", // TODO: Ajouter le lien de l'image/screenshot
      highlight: false,
    },
    {
      name: "Neo4Flix",
      description: "Moteur de recommandation de films basé sur les graphes. 7 microservices Spring Boot, Neo4j, frontend Angular.",
      stack: ["Java 17", "Spring Cloud", "Neo4j", "Angular"],
      url: "https://github.com/Cheikh-Nakamoto/neo4flix",
      image: "/neo4flix.png", // TODO: Ajouter le lien de l'image/screenshot
      highlight: false,
    },
  ],

  languages: [
    { name: "French", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "Wolof", level: "Native" },
  ],

  softSkills: [
    "Autodidacte",
    "Crypto-enthousiaste",
    "Travail en équipe",
    "Remote work",
    "Architecture logicielle",
    "Future open source contributor",
  ]
}
