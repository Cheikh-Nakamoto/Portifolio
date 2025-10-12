# 🚀 Guide de Démarrage Rapide

Ce guide vous permettra de lancer votre portfolio en **5 minutes** !

## ⚡ Étape 1 : Installer les dépendances

```bash
npm install
```

## 🔧 Étape 2 : Personnaliser la configuration

Ouvrir `src/config/site.ts` et modifier :

```typescript
export const siteConfig = {
  name: "Ton Nom Complet",

  github: {
    username: "ton-github-username", // ← Important !
  },

  links: {
    github: "https://github.com/ton-username",
    linkedin: "https://linkedin.com/in/ton-profil",
    twitter: "https://twitter.com/ton-compte",
    email: "ton@email.com",
  },

  bio: "Ta bio personnalisée...",

  // Modifier aussi tes compétences, ton expérience, etc.
}
```

## 🎨 Étape 3 : (Optionnel) Personnaliser les couleurs

Modifier `tailwind.config.ts` pour changer les couleurs :

```typescript
colors: {
  primary: {
    DEFAULT: '#00ff87',  // Ta couleur principale
    light: '#00cc6a',
  },
  // ...
}
```

## 🚀 Étape 4 : Lancer le serveur

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## ✅ Étape 5 : Vérifier

- [ ] Ton nom s'affiche correctement
- [ ] Tes projets GitHub apparaissent
- [ ] Les liens sociaux fonctionnent
- [ ] Le dark mode fonctionne
- [ ] Tout est responsive

## 🌐 Étape 6 : Déployer

### Sur Vercel (le plus simple)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel
```

Ou directement via l'interface Vercel en connectant ton repo GitHub !

---

## 🔥 Tips

### Améliorer le SEO

1. Ajouter une image og:image dans `public/og-image.png`
2. Modifier les métadonnées dans `src/app/layout.tsx`

### Ajouter Google Analytics

Ajouter dans `src/app/layout.tsx` :

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### Activer le formulaire de contact

1. Créer un compte [EmailJS](https://www.emailjs.com/)
2. Configurer dans `src/components/sections/Contact.tsx`

---

## ❓ Problèmes fréquents

### Les projets GitHub ne s'affichent pas

- Vérifie que ton username GitHub est correct dans `src/config/site.ts`
- Vérifie que tes repos ont des descriptions
- L'API GitHub a une limite de 60 requêtes/heure sans authentification

### Le dark mode ne fonctionne pas

- Vide le cache du navigateur
- Vérifie que le ThemeProvider est bien dans le layout

### Erreurs de build

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

---

## 🆘 Besoin d'aide ?

- Ouvre une issue sur GitHub
- Consulte la documentation Next.js : https://nextjs.org/docs
- Consulte la documentation TailwindCSS : https://tailwindcss.com/docs

---

**Prêt à impressionner ? Let's go ! 🚀**
