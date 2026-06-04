export const siteConfig = {
  name: "Cheikh Mounirou Coly Diouf",
  title: "Cheikh Diouf — Fullstack Engineer | Go, Java, Rust",
  description: "Fullstack Engineer with 3+ years building production SaaS platforms. Kay-Point (Ministry of Education), TradeFlowSN (live logistics SaaS), Generateur-d-architecture (7 stars). Go, Java, Rust, TypeScript.",
  tagline: "Fullstack Engineer & Freelancer — Go, Java, Rust, TypeScript",
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

  bio: "Fullstack Engineer with 3+ years delivering production applications across Go, Java, Rust, and TypeScript. I build complete products — from database schema to Docker-deployed infrastructure to pixel-perfect frontends. Shipped 10+ SaaS applications including Kay-Point (Senegal's Ministry of Education), TradeFlowSN (live at tradeflowsn.com), and Generateur-d-architecture (7 GitHub stars).",

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
    role: "Fullstack Engineer",
    period: "Jan 2023 — April 2026",
    description: "Delivered 10+ fullstack applications for clients across EdTech, logistics, and fintech. Architected Kay-Point, a sovereign multi-tenant SaaS for Senegal's Ministry of Education (23k+ lines of Go). Built TradeFlowSN (live at tradeflowsn.com, 233 tests). Led Docker CI/CD and mentored 12 developers."
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
      description: "Sovereign multi-tenant SaaS for Senegal's Ministry of Education — teacher attendance management across 16 regions. 23k+ lines of Go, React 19, Flutter.",
      stack: ["Go", "Gin", "React 19", "Flutter", "PostgreSQL", "Redis"],
      url: "https://github.com/Cheikh-Nakamoto/Kay-Pointe",
      highlight: true,
    },
    {
      name: "TradeFlowSN",
      description: "Container logistics SaaS live at tradeflowsn.com. Multi-currency (EUR/USD/XOF), 233 tests, Jenkins CI/CD.",
      stack: ["Go", "React", "PostgreSQL", "Redis", "Jenkins"],
      url: "https://github.com/Cheikh-Nakamoto/TradeFlowSN",
      live: "https://tradeflowsn.com",
      highlight: true,
    },
    {
      name: "Generateur-d'architecture",
      description: "Rust desktop app with 7 GitHub stars. AI-powered project scaffolding via Google Gemini. Material Design 3 GUI.",
      stack: ["Rust", "Slint", "Gemini API"],
      url: "https://github.com/Cheikh-Nakamoto/Generateur-d-architecture-",
      highlight: true,
    },
    {
      name: "Agile-Factory-Kernel",
      description: "Production-grade multi-tenant SaaS boilerplate in Go 1.25. Clean Architecture, zero framework dependencies.",
      stack: ["Go", "Clean Architecture", "Docker"],
      url: "https://github.com/Cheikh-Nakamoto/agile-factory-kernel",
      highlight: false,
    },
    {
      name: "Neo4Flix",
      description: "Graph-powered movie recommendation engine. 7 Spring Boot microservices, Neo4j graph DB, Angular frontend.",
      stack: ["Java 17", "Spring Cloud", "Neo4j", "Angular"],
      url: "https://github.com/Cheikh-Nakamoto/neo4flix",
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
    "Mentorat technique",
    "Travail en équipe",
    "Remote work",
    "Architecture logicielle",
  ]
}
