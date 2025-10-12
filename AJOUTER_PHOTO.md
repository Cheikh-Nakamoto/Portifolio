# 📸 Comment ajouter ta photo de profil

## 🎯 Emplacement de l'image

Ton image de profil apparaît maintenant **avant ton nom** dans la section Hero avec :
- ✨ Une bordure animée avec gradient de couleurs
- 🔄 Animation de rotation et glow
- 📱 Design responsive (mobile et desktop)
- 🎨 Fallback élégant si l'image n'existe pas

## 📁 Ajouter ta photo

### Option 1 : Ajouter manuellement

1. **Renomme ta photo en `avatar.jpg`** (ou `.png`, `.webp`)
2. **Place-la dans le dossier `public/`** :
   ```bash
   cp /chemin/vers/ta/photo.jpg public/avatar.jpg
   ```

3. **Rafraîchis le navigateur** → Ta photo apparaît !

### Option 2 : Via la ligne de commande

```bash
# Si tu as déjà une photo quelque part
cp ~/Downloads/ma-photo.jpg public/avatar.jpg

# Ou télécharge depuis un URL
curl -o public/avatar.jpg "https://ton-lien.com/photo.jpg"
```

## 📐 Recommandations pour la photo

### Format
- **Extensions supportées** : `.jpg`, `.jpeg`, `.png`, `.webp`
- **Taille recommandée** : 400x400px minimum
- **Format** : Carré (1:1 ratio)
- **Poids** : < 500KB pour de bonnes performances

### Qualité
- Photo professionnelle ou semi-professionnelle
- Bien éclairée
- Fond uni ou flou (profondeur de champ)
- Visage centré et visible

### Outils pour optimiser
- **Redimensionner** : https://squoosh.app (gratuit)
- **Compresser** : https://tinypng.com
- **Supprimer le fond** : https://remove.bg (optionnel)

## 🎨 Personnaliser le style

Si tu veux modifier la taille ou le style de l'image, édite `src/components/sections/Hero.tsx` :

```tsx
// Ligne 33 : Changer la taille
<div className="relative w-32 h-32 md:w-40 md:h-40">
// Modifie les valeurs : w-32 h-32 (mobile) et md:w-40 md:h-40 (desktop)
```

Exemples :
- Plus petit : `w-24 h-24 md:w-32 md:h-32`
- Plus grand : `w-40 h-40 md:w-48 md:h-48`

## 🔄 Changement de position

### Image avant le nom (actuel) ✓
C'est déjà configuré ! L'image apparaît en premier.

### Si tu veux l'image APRÈS le nom

Dans `Hero.tsx`, déplace le bloc `{/* Profile Image */}` après le bloc `{/* Name */}`.

## 🎭 Fallback

Si tu n'as pas encore d'image, un **icône utilisateur élégant** s'affiche automatiquement avec :
- Dégradé de couleurs
- Animation identique
- Design professionnel

## ✅ Vérification

1. Place `avatar.jpg` dans `public/`
2. Ouvre http://localhost:3000
3. Ton image apparaît avec l'animation !

## 🆘 Problèmes courants

### L'image ne s'affiche pas
- Vérifie que le fichier s'appelle exactement `avatar.jpg`
- Vérifie qu'il est dans `public/` (pas dans un sous-dossier)
- Rafraîchis le navigateur (Ctrl+F5)
- Vérifie la console pour les erreurs

### L'image est déformée
- Assure-toi que ta photo est carrée (même largeur et hauteur)
- Ou recadre-la sur https://squoosh.app

### L'image est floue
- Utilise une résolution plus élevée (minimum 400x400px)
- Compresse sans trop perdre de qualité

---

**C'est tout ! Ton portfolio est maintenant encore plus personnel ! 🎉**
