# 🚀 Portfolio 3D Immersif - Cheikh Mounirou Coly Diouf

Portfolio personnel **immersif et interactif en 3D**, développé avec Next.js, TypeScript, Three.js et TailwindCSS. Une expérience web unique combinant design moderne, animations fluides et éléments 3D pour un impact visuel maximal.

## ✨ Fonctionnalités

### 🎨 Expérience 3D Immersive
- **Scènes 3D interactives** : Chaque section contient des éléments 3D réactifs
- **Custom Cursor** : Curseur personnalisé avec animations élastiques
- **Loading Screen animé** : Écran de chargement 3D avec particules
- **Particules dynamiques** : Systèmes de particules optimisés avec instanced meshes
- **Glassmorphism** : Effet de verre dépoli moderne sur tous les composants

### 🌟 Sections avec 3D
- **Hero** : Sphère 3D animée, icônes tech orbitales, champ de particules
- **À propos** : Timeline 3D, cubes de compétences interactifs, badges certifications
- **Projets** : Carrousel 3D infini, particules de code, tilt effect sur cards
- **Contact** : Réseau 3D de connexions sociales, avion en papier animé

### ⚡ Performance & Optimisation
- **Adaptive Quality** : Ajustement automatique de la qualité selon device
- **LOD System** : Level of Detail pour optimiser les rendus
- **Lazy Loading** : Chargement progressif des composants 3D
- **Mobile Optimized** : Réduction automatique des particules sur mobile
- **FPS Monitoring** : Suivi des performances en temps réel

### 🎯 Fonctionnalités Générales
- 🌓 **Dark Mode Cyber** : Thème "Cyber Noir" avec néons
- 📱 **Responsive Design** : Optimisé pour tous les écrans
- 🔗 **GitHub API Integration** : Fetch automatique des projets
- 📧 **EmailJS Integration** : Formulaire de contact fonctionnel
- ♿ **Accessibilité** : Support prefers-reduced-motion, navigation clavier
- 🎯 **SEO friendly** : Métadonnées optimisées

## 🛠️ Technologies utilisées

### Core Stack
- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : TailwindCSS + Custom Utilities
- **State Management** : Zustand

### 3D & Animations
- **3D Engine** : Three.js
- **3D React** : @react-three/fiber, @react-three/drei
- **Post-Processing** : @react-three/postprocessing
- **Physics** : @react-three/rapier
- **Animations** : Framer Motion + GSAP
- **Smooth Scroll** : Lenis

### Utilities
- **Icons** : React Icons
- **Email** : EmailJS
- **HTTP Client** : Axios
- **Deployment** : Vercel

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/cheikh-nakamoto/portfolio.git
cd portfolio
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Configurer le projet**

Éditer le fichier `src/config/site.ts` et personnaliser avec vos informations :

```typescript
export const siteConfig = {
  name: "Votre Nom",
  // ... modifier le username GitHub
  github: {
    username: "votre-username", // ← Changez ici
  },
  // ... modifier les liens sociaux
  links: {
    github: "https://github.com/votre-username",
    linkedin: "https://linkedin.com/in/votre-profil",
    twitter: "https://twitter.com/votre-compte",
    email: "votre@email.com",
  },
  // ... personnaliser la bio, compétences, etc.
}
```

4. **Lancer le serveur de développement**

```bash
npm run dev
# ou
yarn dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🚀 Déploiement

### Déploiement sur Vercel (Recommandé)

Le moyen le plus simple de déployer votre portfolio est d'utiliser [Vercel](https://vercel.com) :

1. Pusher votre code sur GitHub
2. Importer le projet sur Vercel
3. Vercel détectera automatiquement Next.js et configurera le build
4. Votre site sera en ligne en quelques minutes !

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cheikh-nakamoto/portfolio)

### Déploiement sur Netlify

```bash
npm run build
# Les fichiers seront dans le dossier .next
```

Puis suivre les instructions de Netlify pour déployer un site Next.js.

## 📂 Structure du projet

```
portfolio/
├── public/                    # Assets statiques
│   ├── avatar-original.jpeg   # Photo de profil
│   └── certifications/        # Badges certifications
├── src/
│   ├── app/                   # Pages Next.js (App Router)
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Page d'accueil avec LoadingScreen
│   │   └── globals.css        # Styles globaux + glassmorphism
│   ├── components/
│   │   ├── 3d/                # 🆕 Composants Three.js
│   │   │   ├── Scene.tsx      # Canvas 3D de base
│   │   │   ├── ParticleField.tsx # Système de particules
│   │   │   ├── hero/          # Composants 3D Hero
│   │   │   │   ├── AvatarSphere.tsx    # Sphère animée
│   │   │   │   ├── TechIcons.tsx       # Icônes orbitales
│   │   │   │   └── HeroParticles.tsx   # Particules étoilées
│   │   │   ├── about/         # Composants 3D About
│   │   │   │   ├── Timeline3D.tsx      # Carrière timeline
│   │   │   │   ├── SkillCubes.tsx      # Cubes de skills
│   │   │   │   └── CertBadges.tsx      # Badges 3D
│   │   │   ├── projects/      # Composants 3D Projects
│   │   │   │   ├── ProjectCarousel3D.tsx  # Carrousel infini
│   │   │   │   └── CodeParticles.tsx      # Particules code
│   │   │   └── contact/       # Composants 3D Contact
│   │   │       ├── NetworkWeb.tsx   # Réseau social 3D
│   │   │       └── PaperPlane.tsx   # Avion papier animé
│   │   ├── layout/            # Header, Footer, Layout
│   │   │   ├── Header.tsx     # Header avec glassmorphism
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx     # Layout + CustomCursor
│   │   ├── sections/          # Sections principales
│   │   │   ├── Hero.tsx       # Section Hero avec 3D
│   │   │   ├── About.tsx      # Section About avec 3D
│   │   │   ├── Projects.tsx   # Section Projects avec 3D
│   │   │   └── Contact.tsx    # Section Contact avec 3D
│   │   └── ui/                # Composants UI
│   │       ├── CustomCursor.tsx    # 🆕 Curseur custom
│   │       ├── LoadingScreen.tsx   # 🆕 Écran de chargement 3D
│   │       ├── ThemeToggle.tsx
│   │       └── ...
│   ├── hooks/                 # Hooks personnalisés
│   │   ├── useInView.ts      # Hook pour animations viewport
│   │   ├── useGithubProjects.ts  # Hook GitHub API
│   │   └── useWindowSize.ts
│   ├── lib/                   # Utilitaires
│   │   ├── github.ts          # API GitHub
│   │   ├── utils.ts           # Utilitaires généraux
│   │   ├── performance.ts     # 🆕 Monitoring performance
│   │   └── three-helpers.ts   # 🆕 Helpers Three.js
│   ├── store/                 # 🆕 State Management (Zustand)
│   │   └── scene.store.ts     # State 3D global
│   ├── types/                 # Types TypeScript
│   │   └── index.ts
│   └── config/                # Configuration
│       └── site.ts            # Config site (à personnaliser)
├── tailwind.config.ts         # Config Tailwind (Cyber Noir)
├── tsconfig.json              # Configuration TypeScript
├── package.json               # Dépendances
└── README.md                  # Documentation
```

## 🎨 Personnalisation

### Thème "Cyber Noir"

Le portfolio utilise une palette "Cyber Noir" définie dans `tailwind.config.ts` :

```typescript
colors: {
  neutral: {
    darkest: '#050505',  // Fond principal
    dark: '#0A0A0F',     // Fond secondaire
    medium: '#1A1A2E',   // Glass base
    light: '#16213E',    // Accents
  },
  primary: {
    DEFAULT: '#00FFF5',  // Cyan électrique (principal)
    glow: '#00FFF5',
    dark: '#00CCB3',
  },
  secondary: {
    DEFAULT: '#B026FF',  // Violet néon
    glow: '#B026FF',
    dark: '#8B1FD9',
  },
  accent: {
    DEFAULT: '#FF3366',  // Rose vif
    glow: '#FF3366',
    dark: '#CC2952',
  },
}
```

### Utilitaires Glassmorphism

Classes CSS personnalisées disponibles :

- `.glass` : Effet verre léger
- `.glass-strong` : Effet verre intense
- `.glass-light` : Effet verre très léger
- `.glow-primary` : Ombre lumineuse cyan
- `.glow-secondary` : Ombre lumineuse violette
- `.glow-accent` : Ombre lumineuse rose
- `.gradient-text` : Texte avec dégradé
- `.smooth-transition` : Transition fluide

### Sections

Les sections sont modulaires et peuvent être facilement modifiées dans `src/components/sections/`.

### GitHub API

Les projets sont automatiquement récupérés depuis GitHub via l'API. Assurez-vous que :
- Votre username GitHub est correct dans `src/config/site.ts`
- Vos repositories ont des descriptions
- Vos repositories utilisent des topics (tags) pour mieux les catégoriser

## ⚡ Performance & Optimisations

### Adaptive Quality System

Le portfolio détecte automatiquement les capacités de l'appareil et ajuste :

- **Comptage de particules** : 30% sur mobile, 100% sur desktop haute performance
- **GPU Tier Detection** : Ajuste la qualité selon le GPU (high/medium/low)
- **FPS Monitoring** : Surveille les performances et réduit la qualité si nécessaire
- **Prefers Reduced Motion** : Désactive les animations si demandé par l'utilisateur

### Optimisations 3D

- **Instanced Meshes** : 1 draw call pour des centaines de particules
- **Dynamic Imports** : Lazy loading des composants 3D avec `ssr: false`
- **Suspense Boundaries** : Affichage progressif des éléments 3D
- **Pixel Ratio Capping** : Limité à 2x pour éviter les surcharges

### Targets de Performance

- **Lighthouse** : >85
- **FPS** : 60fps desktop, 30fps+ mobile
- **First Contentful Paint** : <1.5s
- **Time to Interactive** : <3.5s

## 📧 Configuration EmailJS

Le formulaire de contact utilise **EmailJS** pour envoyer les emails. Configuration :

### 1. Créer un compte EmailJS

1. Aller sur [EmailJS](https://www.emailjs.com/) et créer un compte
2. Créer un service email (Gmail, Outlook, etc.)
3. Créer un template email avec ces variables :
   - `{{name}}` : Nom de l'expéditeur
   - `{{email}}` : Email de l'expéditeur
   - `{{message}}` : Message
   - `{{time}}` : Horodatage

### 2. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine :

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key
```

### 3. Tester

Redémarrer le serveur et tester le formulaire. Un avion en papier 3D s'envolera lors de l'envoi réussi ! ✈️

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📝 License

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 👨‍💻 Auteur

**Cheikh Mounirou Coly Diouf**

- GitHub : [@cheikh-nakamoto](https://github.com/cheikh-nakamoto)
- LinkedIn : [Cheikh Mounirou Coly Diouf](https://linkedin.com/in/cheikh-mounirou-coly-diouf)
- Twitter : [@DerouMax](https://twitter.com/DerouMax)

---

⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile !

Made with 💚 in Dakar, Sénégal
