# 📧 Configuration EmailJS - Guide Complet

Le formulaire de contact est maintenant prêt à envoyer de vrais emails ! Il te suffit de configurer EmailJS (gratuit).

## 🚀 Étape 1 : Créer un compte EmailJS

1. Va sur https://www.emailjs.com/
2. Clique sur **Sign Up** (gratuit)
3. Crée un compte avec ton email
4. Vérifie ton email de confirmation

## 📋 Étape 2 : Configurer le service email

Une fois connecté à ton dashboard EmailJS :

### A. Ajouter un service email

1. Dans le menu de gauche, clique sur **Email Services**
2. Clique sur **Add New Service**
3. Choisis **Gmail** (recommandé) ou ton fournisseur
4. Clique sur **Connect Account**
5. Connecte ton compte Gmail (autorisation OAuth)
6. **Copie le Service ID** (ex: `service_abc123xyz`)
   - Il apparaît dans la liste des services

### B. Créer un template d'email

1. Dans le menu de gauche, clique sur **Email Templates**
2. Clique sur **Create New Template**
3. Configure le template :

**Subject (Sujet)** :
```
Nouveau message de {{from_name}} - Portfolio
```

**Content (Corps de l'email)** :
```
Salut Cheikh,

Tu as reçu un nouveau message depuis ton portfolio !

---
De : {{from_name}}
Email : {{from_email}}

Message :
{{message}}
---

Réponds directement à cet email pour contacter {{from_name}}.

Envoyé depuis https://ton-portfolio.com
```

4. **Reply-To** : `{{from_email}}` (pour pouvoir répondre directement)
5. **Copie le Template ID** (ex: `template_xyz789abc`)

### C. Obtenir ta Public Key

1. Clique sur ton nom/avatar en haut à droite
2. Va dans **Account** → **General**
3. Trouve la section **API Keys**
4. **Copie ta Public Key** (ex: `AbCdEfGhIjKlMnOp`)

## 🔧 Étape 3 : Configurer les clés dans ton projet

Ouvre le fichier `.env.local` à la racine du projet et remplace les valeurs :

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123xyz
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789abc
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

**⚠️ Important** :
- Remplace les valeurs par tes vraies clés (pas les exemples)
- Ne commit JAMAIS ce fichier sur Git (déjà dans .gitignore)

## 🎯 Étape 4 : Redémarrer le serveur

```bash
# Arrête le serveur (Ctrl+C)
# Puis relance
npm run dev
```

## ✅ Étape 5 : Tester

1. Va sur http://localhost:3000/#contact
2. Remplis le formulaire
3. Clique sur "Envoyer le message"
4. Tu devrais voir : "Message envoyé avec succès !"
5. Vérifie ta boîte email Gmail !

## 🎨 Personnalisation avancée

### Changer l'email de réception

Dans le dashboard EmailJS → Template → **To Email**, tu peux :
- Utiliser ton email par défaut (Gmail connecté)
- Ajouter plusieurs destinataires
- Utiliser des règles conditionnelles

### Ajouter des champs au formulaire

Si tu veux ajouter un champ "Téléphone" par exemple :

1. Dans `src/types/index.ts`, ajoute :
```typescript
export interface ContactForm {
  name: string;
  email: string;
  phone?: string; // Nouveau champ
  message: string;
}
```

2. Dans `src/components/sections/Contact.tsx`, ajoute un input
3. Dans le template EmailJS, ajoute `{{phone}}`

## 📊 Limites du plan gratuit

- **200 emails/mois** (largement suffisant pour un portfolio)
- Illimité en destinataires
- Support de tous les fournisseurs email
- Pas de limite de champs

## 🔒 Sécurité

- ✅ Les clés sont sécurisées (pas exposées côté serveur)
- ✅ EmailJS gère l'anti-spam
- ✅ Validation des emails intégrée
- ✅ Pas de risque de harvesting

## 🆘 Résolution de problèmes

### "Erreur lors de l'envoi"

1. Vérifie que les 3 clés sont bien copiées dans `.env.local`
2. Redémarre le serveur
3. Ouvre la console du navigateur (F12) pour voir l'erreur exacte
4. Vérifie que le service Gmail est bien connecté

### "EmailJS not configured"

Les clés contiennent encore les placeholders (`ton_service_id_ici`).
Remplace-les par tes vraies clés.

### Email non reçu

1. Vérifie tes spams
2. Vérifie que l'email de service est bien ton Gmail
3. Teste avec l'outil de test d'EmailJS dans leur dashboard

### CORS Error

EmailJS fonctionne en client-side, pas besoin de configuration CORS.
Si tu vois cette erreur, vérifie que tu utilises bien `NEXT_PUBLIC_` devant les variables.

## 🌐 Déploiement sur Vercel/Netlify

N'oublie pas d'ajouter les variables d'environnement :

### Sur Vercel
1. Project Settings → Environment Variables
2. Ajoute les 3 variables :
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### Sur Netlify
1. Site Settings → Environment variables
2. Ajoute les 3 variables avec leurs valeurs

## 🎉 C'est tout !

Ton formulaire de contact est maintenant **100% fonctionnel** !

Les visiteurs peuvent t'envoyer des messages directement depuis ton portfolio.

---

**Besoin d'aide ?** Consulte la documentation EmailJS : https://www.emailjs.com/docs/
