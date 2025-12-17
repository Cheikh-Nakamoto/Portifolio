import { useSceneStore } from '@/store/scene.store';

/**
 * Hook to access the 3D scene state
 * Provides convenient access to scene store
 */
export const use3DState = () => {
  const state = useSceneStore();
  return state;
};

/**
 * Hook to get only the active section
 */
export const useActiveSection = () => {
  return useSceneStore((state) => state.activeSection);
};

/**
 * Hook to get only the scroll progress
 */
export const useScrollProgress = () => {
  return useSceneStore((state) => state.scrollProgress);
};

/**
 * Hook to get only the mouse position
 */
export const useMousePosition = () => {
  return useSceneStore((state) => state.mousePosition);
};

/**
 * Hook to get device capabilities
 */
export const useDeviceCapabilities = () => {
  return useSceneStore((state) => ({
    isMobile: state.isMobile,
    supportsWebGL: state.supportsWebGL,
    prefersReducedMotion: state.prefersReducedMotion,
  }));
};

/**
 * Hook to get loading state
 */
export const useLoadingState = () => {
  return useSceneStore((state) => ({
    isLoading: state.isLoading,
    loadingProgress: state.loadingProgress,
  }));
};
