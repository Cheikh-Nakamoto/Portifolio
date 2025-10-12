export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: any;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'other';
  icon?: string;
}
