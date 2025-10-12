import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    React: '#61dafb',
    Angular: '#dd0031',
  };
  return colors[language] || '#8b949e';
}

export function sortByStars<T extends { stars: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.stars - a.stars);
}

export function sortByDate<T extends { updated_at?: string; created_at?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
    const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
    return dateB - dateA;
  });
}
