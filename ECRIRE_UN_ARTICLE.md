# ✍️ Écrire un article de blog

Les articles sont des fichiers **MDX** (du Markdown qui accepte aussi des composants React) dans `content/blog/`.
Pas de base de données ni de CMS : tu crées un fichier, tu pousses sur GitHub, Vercel publie.

## 1. Créer le fichier

Crée `content/blog/mon-article.mdx`. Le nom du fichier donne l'URL : `/blog/mon-article`.
Utilise des minuscules et des tirets, sans accents ni espaces.

```mdx
---
title: "Understanding Go channels"
date: "2026-11-15"
description: "A short summary shown in the blog list and on social networks."
tags: ["go", "concurrency"]
draft: false
---

Introduction...

## First section

Text, **bold**, `code`, [links](https://go.dev)...
```

| Champ         | Obligatoire | Rôle                                                              |
| ------------- | ----------- | ----------------------------------------------------------------- |
| `title`       | oui         | Titre de l'article                                                |
| `date`        | oui         | Date au format `AAAA-MM-JJ`, sert au tri                          |
| `description` | conseillé   | Résumé affiché dans la liste, sur l'accueil et en aperçu de lien  |
| `tags`        | conseillé   | Sujets ; ils servent de filtres sur `/blog`                       |
| `draft`       | non         | `true` : visible en local (`npm run dev`) mais **pas publié**     |

Le temps de lecture et le sommaire (« Sur cette page ») sont calculés automatiquement à partir des titres `##` et `###`.

## 2. Ce que tu peux utiliser

**Code avec coloration.** Indique le langage. Options possibles : un titre, des numéros de ligne et des lignes surlignées.

````mdx
```go title="main.go" showLineNumbers {3}
package main

func main() {}
```
````

**Encadrés :**

```mdx
<Callout type="tip">Astuce</Callout>
<Callout type="warning">Attention</Callout>
<Callout>Note simple</Callout>
```

**Images :** mets-les dans `public/blog/mon-article/` puis écris `![Description](/blog/mon-article/schema.png)`.

On peut aussi utiliser des tableaux, des citations (`>`) et des listes de tâches (`- [ ]`).

## 3. Prévisualiser

```bash
npm run dev
# ouvre http://localhost:3000/blog
```

## 4. Publier

```bash
git add content/blog/mon-article.mdx
git commit -m "blog: understanding go channels"
git push
```

Vercel reconstruit le site. L'article apparaît alors sur `/blog`, dans la section « Blog » de l'accueil (3 derniers articles), dans le flux RSS (`/blog/rss.xml`) et dans le sitemap.

## Mettre à jour la page À propos

La story, l'expérience, la formation, les certifications et la communauté sont dans `src/content/profile.ts`.
Le CV téléchargeable est `public/cv-cheikh-diouf.pdf`. Il est généré depuis `cv.latex` :

```bash
pdflatex -output-directory=public cv.latex && mv public/cv.pdf public/cv-cheikh-diouf.pdf
```

Tu peux aussi le compiler sur Overleaf et remplacer le fichier.
