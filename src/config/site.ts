export const siteConfig = {
  name: "Cheikh Mounirou Coly Diouf",
  // Title formula: [Specific role] | [Platform / audience] | [Outcome or edge]
  title: "Java & Go Backend Developer | Multi-Tenant SaaS APIs | Spring Boot",
  description:
    "Building a SaaS? Your backend must keep each customer's data isolated, secure and fast as you grow. I build multi-tenant backends and APIs in Java (Spring Boot) and Go that do exactly that.",
  tagline: "Java & Go Backend Developer — Multi-Tenant SaaS APIs",
  location: "Dakar, Senegal (GMT)",
  timezoneNote: "GMT — full overlap with Europe, US mornings",
  phone: "+221 778 879 040",

  github: {
    username: "Cheikh-Nakamoto",
    apiUrl: "https://api.github.com",
  },

  links: {
    github: "https://github.com/Cheikh-Nakamoto",
    upwork: "https://www.upwork.com/freelancers/~010f1c2dfad650bdae",
    linkedin: "https://www.linkedin.com/in/cheikh-mounirou-coly-diouf-3549b6241",
    email: "feppdougou@gmail.com",
  },

  // Ordered like an Upwork skills list: core skill first, only what I can defend in an interview.
  skills: [
    { name: "Java 17", category: "language" as const },
    { name: "Spring Boot 3", category: "framework" as const },
    { name: "Go", category: "language" as const },
    { name: "Gin", category: "framework" as const },
    { name: "REST API", category: "other" as const },
    { name: "Multi-tenancy", category: "other" as const },
    { name: "PostgreSQL", category: "tool" as const },
    { name: "Redis", category: "tool" as const },
    { name: "JWT & RBAC", category: "other" as const },
    { name: "Microservices", category: "other" as const },
    { name: "Spring Cloud", category: "framework" as const },
    { name: "Clean Architecture", category: "other" as const },
    { name: "Docker", category: "tool" as const },
    { name: "Jenkins", category: "tool" as const },
    { name: "GitHub Actions", category: "tool" as const },
    { name: "Linux", category: "tool" as const },
    { name: "Prometheus", category: "tool" as const },
    { name: "Grafana", category: "tool" as const },
    { name: "TypeScript", category: "language" as const },
    { name: "React", category: "framework" as const },
    { name: "Next.js", category: "framework" as const },
  ],

  experience: {
    company: "01 Talent Senegal (Zone 01 Dakar)",
    role: "Software Engineering Program — Backend track",
    period: "Jan 2023 — Apr 2026",
    description:
      "3+ years of project-based software engineering with peer review. 30+ projects, mostly backend: Go and Java (Spring Boot) APIs, PostgreSQL schema design, Docker and Jenkins CI/CD.",
  },

  certifications: [
    {
      name: "Java Development Certificate",
      issuer: "01 Talent Senegal",
      date: "2025",
      url: "#",
    },
    {
      name: "Hedera Certified Developer",
      issuer: "Hedera Hashgraph",
      date: "2025",
      url: "https://certs.hashgraphdev.com/7136d939-5f09-483f-a93f-19e7d504f314.pdf",
    },
  ],

  // Ordered by relevance to the niche (multi-tenant SaaS backends). Projects section shows the first 6.
  featuredProjects: [
    {
      name: "Kay-Point",
      label: "Personal project",
      description:
        "Multi-tenant SaaS for teacher attendance. Each regional inspectorate is an isolated tenant; tenant scope is built from JWT claims on every request. Go (Gin), PostgreSQL, Redis, 8 RBAC roles, 2FA, audit trail. Not in production yet.",
      stack: ["Go", "Gin", "PostgreSQL", "Redis", "React 19", "Flutter"],
      url: "https://github.com/Cheikh-Nakamoto/Kay-Pointe",
      image: "/Kay-pointé.png",
      highlight: true,
    },
    {
      name: "Agile-Factory-Kernel",
      label: "Open source",
      description:
        "Multi-tenant SaaS starter kernel in Go 1.25. Clean Architecture, no framework dependency — the base I reuse to start a tenant-aware API quickly.",
      stack: ["Go", "Clean Architecture", "PostgreSQL", "Docker"],
      url: "https://github.com/Cheikh-Nakamoto/agile-factory-kernel",
      image: "/agile-factory.png",
      highlight: true,
    },
    {
      name: "Neo4Flix",
      label: "Personal project",
      description:
        "Movie recommendation platform built as 7 Spring Boot microservices: Eureka discovery, API gateway, user, movie, rating and recommendation services on Neo4j.",
      stack: ["Java 17", "Spring Boot", "Spring Cloud", "Neo4j", "Angular"],
      url: "https://github.com/Cheikh-Nakamoto/neo4flix",
      image: "/neo4flix.png",
      highlight: true,
    },
    {
      name: "TradeFlowSN",
      label: "Live product",
      description:
        "Container-tracking platform for importers. Go API with multi-currency pricing (EUR / USD / XOF), 233 automated tests and a Jenkins CI/CD pipeline.",
      stack: ["Go", "PostgreSQL", "Redis", "Jenkins", "React"],
      url: "https://github.com/Cheikh-Nakamoto/TradeFlowSN",
      image: "/tradeflowsn.png",
      live: "https://tradeflowsn.com",
      highlight: true,
    },
    {
      name: "RBS Crew SN",
      label: "Volunteer work",
      description:
        "E-commerce backend for a graphic-artist collective: Go API (chi, pgx, sqlc), role-based admin, Stripe / Wave / Orange Money payments, Cloudflare R2 media storage.",
      stack: ["Go", "chi", "sqlc", "PostgreSQL", "Stripe", "Next.js"],
      url: "https://github.com/Cheikh-Nakamoto/RBS_Crew_SN",
      image: "/rbs-crew.png",
      highlight: true,
    },
    {
      name: "380 Solutions",
      label: "Client project",
      description:
        "Web platform for a Senegalese solar company: automatic system sizing, PDF quotes and an AI assistant. Clean Architecture Go API behind a Next.js front-end.",
      stack: ["Go", "Gin", "PostgreSQL", "Docker", "Jenkins", "Next.js"],
      url: "https://github.com/Cheikh-Nakamoto/380_Solution",
      image: "/380.png",
      highlight: true,
    },
    {
      name: "Generateur-d'architecture",
      label: "Open source",
      description: "Rust desktop tool that scaffolds project architectures with Gemini. 7 GitHub stars.",
      stack: ["Rust", "Slint", "Gemini API"],
      url: "https://github.com/Cheikh-Nakamoto/Generateur-d-architecture-",
      image: "/generateur-architecture.png",
      highlight: false,
    },
  ],

  languages: [
    { name: "English", level: "Professional" },
    { name: "French", level: "Native" },
    { name: "Wolof", level: "Native" },
  ],
};
