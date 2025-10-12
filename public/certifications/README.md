# 📜 Comment ajouter ta certification blockchain

## 📁 Ajouter le fichier de certification

1. **Place ton fichier de certification dans ce dossier** :
   - Si c'est un PDF : renomme-le en `blockchain-cert.pdf`
   - Si c'est une image (PNG, JPG) : renomme-le en `blockchain-cert.png` ou `blockchain-cert.jpg`

2. **Le fichier sera accessible à l'URL** :
   - `/certifications/blockchain-cert.pdf`
   - ou `/certifications/blockchain-cert.png`

## 🔗 Mettre à jour le lien dans la configuration

Ouvre `src/config/site.ts` et trouve la section certifications :

```typescript
certifications: [
  {
    name: "Certification Blockchain",
    issuer: "Btrust Builder",
    date: "2024",
    url: "#", // ← Change ce lien
    image: "/certifications/blockchain-cert.pdf" // ← Ajuste le nom du fichier
  }
]
```

### Si tu as un lien Credly ou autre

Si ta certification est hébergée sur Credly, LinkedIn Learning, ou autre plateforme :

```typescript
{
  name: "Certification Blockchain",
  issuer: "Btrust Builder",
  date: "2024",
  url: "https://www.credly.com/ton-lien", // ← Ton lien ici
  image: "/certifications/blockchain-cert.pdf" // Optionnel
}
```

## 📝 Ajouter plusieurs certifications

Tu peux ajouter autant de certifications que tu veux :

```typescript
certifications: [
  {
    name: "Certification Hedera",
    issuer: "Hedera",
    date: "2024",
    url: "https://www.linkedin.com/in/cheikh-mounirou-coly-diouf"
  },
  {
    name: "Certification Blockchain",
    issuer: "Btrust Builder",
    date: "2024",
    url: "/certifications/blockchain-cert.pdf"
  },
  {
    name: "Solidity Developer",
    issuer: "Ethereum Foundation",
    date: "2024",
    url: "/certifications/solidity-cert.pdf"
  }
]
```

## ✅ Vérifier

1. Place ton fichier dans ce dossier
2. Redémarre le serveur : `npm run dev`
3. Va sur http://localhost:3000/#about
4. Scroll jusqu'à la section "Certifications"
5. Ta certification devrait apparaître avec un badge vert

## 📸 Format recommandé

- **PDF** : Idéal pour les certificats officiels
- **PNG/JPG** : Si tu as scanné ou fait une capture d'écran
- **Taille** : Max 5MB pour de bonnes performances

Voilà, c'est tout ! 🎉
