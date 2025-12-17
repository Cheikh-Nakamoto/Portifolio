import { useEffect } from 'react';
import { useSceneStore } from '@/store/scene.store';

/**
 * Hook to track scroll progress and update global state
 * Returns progress as 0-1 value representing how far down the page the user has scrolled
 */
export const useScrollProgressTracker = () => {
  const setScrollProgress = useSceneStore((state) => state.setScrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    // Initial calculation
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setScrollProgress]);

  return useSceneStore((state) => state.scrollProgress);
};

/**
 * Hook to get scroll progress for a specific element
 * @param elementId - ID of the element to track
 * @returns progress from 0-1 representing element's visibility in viewport
 */
export const useElementScrollProgress = (elementId: string) => {
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      let progress = 0;

      if (elementTop < windowHeight && elementBottom > 0) {
        // Element is in viewport
        const visibleHeight = Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0);
        progress = visibleHeight / elementHeight;
      }

      return progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementId]);
};
