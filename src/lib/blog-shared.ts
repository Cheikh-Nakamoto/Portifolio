// Types et utilitaires utilisables côté client (pas d'accès au système de fichiers).

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  draft: boolean;
  readingMinutes: number;
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post extends PostMeta {
  content: string;
  headings: Heading[];
}

export function formatDate(iso: string, locale: 'fr' | 'en' = 'fr') {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
