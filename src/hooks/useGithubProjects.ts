'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { getFeaturedProjects } from '@/lib/github';

export function useGithubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await getFeaturedProjects(6);
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des projets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, loading, error };
}
