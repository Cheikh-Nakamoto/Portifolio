'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { getProjects } from '@/lib/github';

export function useGithubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        // Charge TOUS les projets (jusqu'à 100 repos publics)
        const data = await getProjects();

        // Trier par étoiles pour afficher les meilleurs en premier
        const sortedData = data.sort((a, b) => b.stars - a.stars);

        setProjects(sortedData);
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
