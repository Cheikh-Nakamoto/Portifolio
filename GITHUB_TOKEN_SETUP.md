# 🔐 Configuration du Token GitHub pour les Repos Privés

## Pourquoi un token ?

Par défaut, l'API GitHub ne donne accès qu'aux **repos publics**. Pour accéder à tes **repos privés**, tu dois utiliser un **Personal Access Token (PAT)**.

## 📝 Étape 1 : Créer le Personal Access Token

1. **Va sur GitHub** → Clique sur ton avatar en haut à droite
2. **Settings** (Paramètres)
3. Scroll en bas à gauche → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**

### Configuration du token

- **Note** : `Portfolio API Token` (ou un nom de ton choix)
- **Expiration** :
  - `90 days` (recommandé pour la sécurité)
  - `No expiration` (plus pratique mais moins sécurisé)

- **Scopes** (permissions) : Coche **uniquement** :
  - ✅ `repo` (Full control of private repositories)
    - Cela donne accès à tous tes repos (publics et privés)

6. **Generate token** → **⚠️ COPIE LE TOKEN IMMÉDIATEMENT** (tu ne pourras plus le voir !)

Le token ressemble à : `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🔧 Étape 2 : Configurer le token dans le projet

Ouvre le fichier `.env.local` à la racine du projet et remplace `ton_token_ici` par ton vrai token :

```env
# GitHub Personal Access Token
GITHUB_TOKEN=ghp_ton_vrai_token_copié_depuis_github
```

**⚠️ IMPORTANT** :
- Ne partage JAMAIS ce token
- Ne le commit JAMAIS sur Git (déjà dans .gitignore)
- Si tu penses qu'il a été compromis, révoque-le immédiatement sur GitHub

## 🚀 Étape 3 : Redémarrer le serveur

Arrête le serveur (Ctrl+C) et relance-le :

```bash
npm run dev
```

## ✅ Vérification

Maintenant, l'API GitHub va :
- Utiliser `/user/repos` avec authentification (accès aux repos privés)
- Récupérer **tous** tes repos (publics ET privés)
- Avoir une limite augmentée : **5000 requêtes/heure** au lieu de 60

Ouvre http://localhost:3000 et vérifie que tes projets privés apparaissent !

## 🔍 Débogage

### Le token ne fonctionne pas ?

Vérifie que :
1. Le token est bien copié dans `.env.local`
2. Le fichier s'appelle exactement `.env.local` (pas `.env` ou autre)
3. Tu as bien redémarré le serveur après avoir ajouté le token
4. Le scope `repo` est coché sur GitHub

### Voir les logs

Ouvre la console du navigateur (F12) et regarde les erreurs éventuelles.

### Tester le token manuellement

Teste ton token avec curl :

```bash
curl -H "Authorization: Bearer ghp_ton_token" https://api.github.com/user/repos
```

Tu devrais voir tous tes repos (publics et privés) en JSON.

## 🌐 Déploiement sur Vercel/Netlify

Quand tu déploies sur Vercel ou Netlify, n'oublie pas d'ajouter la variable d'environnement :

### Sur Vercel :
1. Va dans ton projet → **Settings** → **Environment Variables**
2. Ajoute :
   - **Name** : `GITHUB_TOKEN`
   - **Value** : ton token
3. Redéploie le projet

### Sur Netlify :
1. Va dans ton site → **Site settings** → **Environment variables**
2. **Add a variable** :
   - **Key** : `GITHUB_TOKEN`
   - **Value** : ton token
3. Redéploie le projet

## 🔄 Gérer l'expiration du token

Si tu as choisi une expiration (ex: 90 jours), GitHub t'enverra un email avant expiration. Tu devras :

1. Créer un nouveau token
2. Remplacer l'ancien dans `.env.local`
3. Mettre à jour sur Vercel/Netlify si déployé
4. Révoquer l'ancien token sur GitHub (facultatif mais recommandé)

## 📊 Limites de l'API GitHub

| Type d'accès | Limite par heure | Repos accessibles |
|--------------|------------------|-------------------|
| Sans token | 60 | Publics seulement |
| Avec token | 5000 | Publics + Privés |

---

**Sécurité** : Ne partage jamais ton token, ne le commit jamais sur Git !
