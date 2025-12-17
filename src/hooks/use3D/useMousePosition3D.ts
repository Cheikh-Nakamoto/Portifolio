import { useEffect } from 'react';
import { useSceneStore } from '@/store/scene.store';

/**
 * Hook to track mouse position and update the global state
 * Converts screen coordinates to normalized device coordinates (-1 to 1)
 */
export const useMousePosition3D = () => {
  const setMousePosition = useSceneStore((state) => state.setMousePosition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinates to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setMousePosition]);

  return useSceneStore((state) => state.mousePosition);
};

/**
 * Hook to get mouse position as percentage (0-100)
 */
export const useMousePercentage = () => {
  useEffect(() => {
    const setMousePosition = useSceneStore.getState().setMousePosition;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const mousePosition = useSceneStore((state) => state.mousePosition);
  return mousePosition;
};
