import axios from 'axios';
import { GithubRepo, Project } from '@/types';
import { siteConfig } from '@/config/site';

// Récupérer le token depuis les variables d'environnement
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const api = axios.create({
  baseURL: siteConfig.github.apiUrl,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    // Ajouter l'authentification si le token est disponible
    ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
  },
});

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  try {
    // Si on a un token, on utilise /user/repos pour accéder aux repos privés
    // Sinon on utilise /users/{username}/repos pour les repos publics
    const endpoint = GITHUB_TOKEN
      ? '/user/repos'
      : `/users/${siteConfig.github.username}/repos`;

    const response = await api.get<GithubRepo[]>(endpoint, {
      params: {
        sort: 'updated',
        per_page: 100,
        type: 'owner',
        // Inclure les repos privés si on a un token
        ...(GITHUB_TOKEN && { visibility: 'all' }),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export function transformRepoToProject(repo: GithubRepo): Project {
  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || 'Pas de description disponible',
    technologies: repo.topics || [],
    githubUrl: repo.html_url,
    demoUrl: repo.homepage || undefined,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || 'Unknown',
    topics: repo.topics,
  };
}

export async function getProjects(): Promise<Project[]> {
  const repos = await fetchGithubRepos();

  // Filter out forks and private repos, keep only repos with content
  const filteredRepos = repos.filter(
    (repo) => !repo.name.includes('fork') && repo.description
  );

  return filteredRepos.map(transformRepoToProject);
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const projects = await getProjects();

  // Sort by stars and take top projects
  return projects
    .sort((a, b) => b.stars - a.stars)
    .slice(0, limit);
}
