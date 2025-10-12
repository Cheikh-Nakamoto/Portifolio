# 🚀 Portfolio - Cheikh Mounirou Coly Diouf

Portfolio personnel moderne et élégant, développé avec Next.js, TypeScript, TailwindCSS et Framer Motion.

## ✨ Fonctionnalités

- 🌓 **Dark/Light Mode** : Thème sombre activé par défaut avec possibilité de basculer
- 📱 **Responsive Design** : Optimisé pour tous les écrans (mobile, tablette, desktop)
- 🎨 **Animations fluides** : Animations avec Framer Motion pour une expérience immersive
- 🔗 **GitHub API Integration** : Fetch automatique des projets depuis GitHub
- 📧 **Formulaire de contact** : Section contact avec validation
- ⚡ **Performance optimisée** : Next.js 14 avec App Router
- 🎯 **SEO friendly** : Métadonnées optimisées pour le référencement

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : TailwindCSS
- **Animations** : Framer Motion
- **Icons** : React Icons
- **HTTP Client** : Axios
- **Deployment** : Vercel / Netlify

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
├── public/               # Assets statiques
├── src/
│   ├── app/             # Pages Next.js (App Router)
│   │   ├── layout.tsx   # Layout principal
│   │   ├── page.tsx     # Page d'accueil
│   │   └── globals.css  # Styles globaux
│   ├── components/      # Composants React
│   │   ├── layout/      # Header, Footer, Layout
│   │   ├── sections/    # Hero, About, Projects, Contact
│   │   └── ui/          # Composants UI réutilisables
│   ├── contexts/        # Contextes React (Theme)
│   ├── hooks/           # Hooks personnalisés
│   ├── lib/             # Utilitaires et API
│   ├── types/           # Types TypeScript
│   └── config/          # Configuration du site
├── tailwind.config.ts   # Configuration Tailwind
├── tsconfig.json        # Configuration TypeScript
└── package.json         # Dépendances
```

## 🎨 Personnalisation

### Couleurs

Modifier les couleurs dans `tailwind.config.ts` :

```typescript
colors: {
  primary: '#00ff87',      // Vert néon
  secondary: '#00d9ff',    // Bleu cyan
  accent: '#ff0080',       // Rose vif
  // ...
}
```

### Sections

Les sections sont modulaires et peuvent être facilement modifiées dans `src/components/sections/`.

### GitHub API

Les projets sont automatiquement récupérés depuis GitHub via l'API. Assurez-vous que :
- Votre username GitHub est correct dans `src/config/site.ts`
- Vos repositories ont des descriptions
- Vos repositories utilisent des topics (tags) pour mieux les catégoriser

## 📧 Formulaire de contact

Le formulaire de contact est actuellement en mode démo. Pour l'activer avec un vrai service :

### Option 1 : EmailJS

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Installer EmailJS : `npm install @emailjs/browser`
3. Modifier `src/components/sections/Contact.tsx` pour utiliser EmailJS

### Option 2 : Formspree

1. Créer un compte sur [Formspree](https://formspree.io/)
2. Ajouter l'endpoint Formspree dans le formulaire

### Option 3 : API Route Next.js

Créer une API route dans `src/app/api/contact/route.ts` avec votre service d'email préféré (Nodemailer, SendGrid, etc.)

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
