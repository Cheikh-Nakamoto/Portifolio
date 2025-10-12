# 📋 Prochaines Étapes

Félicitations ! Ton portfolio est prêt. Voici les prochaines étapes pour le personnaliser et le déployer.

## ✅ Checklist de Personnalisation

### 🔧 Configuration de base

- [ ] **Modifier `src/config/site.ts`**
  - [ ] Changer le nom
  - [ ] Mettre à jour le username GitHub
  - [ ] Ajouter les vrais liens sociaux
  - [ ] Personnaliser la bio
  - [ ] Ajuster les compétences
  - [ ] Modifier l'expérience professionnelle

### 🎨 Personnalisation visuelle

- [ ] **Ajouter une photo de profil**
  - Placer dans `public/avatar.jpg`
  - Utiliser dans la section Hero (à implémenter si souhaité)

- [ ] **Changer les couleurs (optionnel)**
  - Modifier `tailwind.config.ts`
  - Ajuster les dégradés si nécessaire

- [ ] **Ajouter un favicon**
  - Placer dans `public/favicon.ico`
  - Ou utiliser un générateur : https://favicon.io/

### 📝 Contenu

- [ ] **Enrichir la section About**
  - Ajouter plus de détails sur ton parcours
  - Ajuster les valeurs affichées

- [ ] **GitHub Projects**
  - Vérifier que tes repos ont des descriptions
  - Ajouter des topics (tags) à tes repos
  - Épingler les meilleurs projets sur GitHub

- [ ] **Formulaire de contact**
  - Configurer EmailJS / Formspree (voir instructions ci-dessous)

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé)

1. Push ton code sur GitHub
2. Va sur [vercel.com](https://vercel.com)
3. Importe ton repository
4. Vercel détecte automatiquement Next.js
5. Clique sur "Deploy"
6. Ton site est en ligne ! 🎉

### Option 2 : Netlify

1. Build le projet : `npm run build`
2. Va sur [netlify.com](https://netlify.com)
3. Drag & drop le dossier `.next` ou connecte ton GitHub
4. Configure le build command : `npm run build`
5. Configure le publish directory : `.next`

## 📧 Configuration du formulaire de contact

### Avec EmailJS (Gratuit jusqu'à 200 emails/mois)

1. **Créer un compte** : [emailjs.com](https://www.emailjs.com/)

2. **Installer EmailJS**
```bash
npm install @emailjs/browser
```

3. **Obtenir les credentials**
   - Service ID
   - Template ID
   - Public Key

4. **Créer un fichier `.env.local`**
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=ton_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=ton_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=ta_public_key
```

5. **Modifier `src/components/sections/Contact.tsx`**

```typescript
import emailjs from '@emailjs/browser';

// Dans handleSubmit :
await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

### Avec Formspree (Gratuit jusqu'à 50 submissions/mois)

1. **Créer un compte** : [formspree.io](https://formspree.io/)

2. **Créer un nouveau formulaire** et obtenir l'endpoint

3. **Modifier le formulaire dans Contact.tsx**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('loading');

  try {
    const response = await fetch('https://formspree.io/f/TON_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  } catch (error) {
    setStatus('error');
  }
};
```

## 🎯 SEO et Performance

### Ajouter une image Open Graph

1. Créer une image 1200x630px
2. La placer dans `public/og-image.png`
3. Ajouter dans `src/app/layout.tsx` :

```typescript
openGraph: {
  images: ['/og-image.png'],
  // ...
}
```

### Ajouter un sitemap

Créer `src/app/sitemap.ts` :

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://ton-site.com',
      lastModified: new Date(),
      priority: 1,
    },
  ]
}
```

### Ajouter robots.txt

Créer `src/app/robots.ts` :

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ton-site.com/sitemap.xml',
  }
}
```

## 📊 Analytics (optionnel)

### Google Analytics

1. Installer le package
```bash
npm install @next/third-parties
```

2. Ajouter dans `src/app/layout.tsx`
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## 🔒 Sécurité

- [ ] Ne jamais commiter les fichiers `.env*` (déjà dans .gitignore)
- [ ] Utiliser des variables d'environnement pour les secrets
- [ ] Vérifier les dépendances régulièrement : `npm audit`

## 🎨 Améliorations possibles

### Fonctionnalités avancées

- [ ] Ajouter un blog avec MDX
- [ ] Intégrer un système de commentaires (Giscus)
- [ ] Ajouter des graphiques de statistiques GitHub
- [ ] Créer une page "Utilisations de mes projets"
- [ ] Ajouter une page CV téléchargeable en PDF
- [ ] Intégrer Spotify "Now Playing"
- [ ] Ajouter des tests avec Jest/Vitest

### Design

- [ ] Animations plus complexes avec GSAP
- [ ] Effet de particules interactives
- [ ] Mode "Hacker" avec effet Matrix
- [ ] Cursor personnalisé
- [ ] Transitions de page avec Framer Motion

## 📚 Ressources utiles

- **Next.js** : https://nextjs.org/docs
- **TailwindCSS** : https://tailwindcss.com/docs
- **Framer Motion** : https://www.framer.com/motion/
- **React Icons** : https://react-icons.github.io/react-icons/
- **GitHub API** : https://docs.github.com/en/rest

## 💡 Inspiration

Quelques portfolios pour inspiration :

- https://brittanychiang.com
- https://leerob.io
- https://jahir.dev
- https://www.joshwcomeau.com

---

## 🆘 Besoin d'aide ?

Si tu rencontres un problème :

1. Vérifie les erreurs dans la console
2. Lis les messages d'erreur (souvent très explicites)
3. Consulte la documentation officielle
4. Ouvre une issue sur GitHub

---

**Bonne chance avec ton portfolio ! 🚀**

N'oublie pas de partager le lien une fois déployé !
