import { create } from 'zustand';
import { Vector3 } from 'three';

interface SceneState {
  // Active section tracking
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Camera state
  cameraPosition: Vector3;
  cameraTarget: Vector3;
  setCameraPosition: (position: Vector3) => void;
  setCameraTarget: (target: Vector3) => void;

  // Performance metrics
  fps: number;
  setFps: (fps: number) => void;

  // Mouse position for 3D interactions
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;

  // Scroll progress (0-1)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  setIsLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // Device capabilities
  isMobile: boolean;
  supportsWebGL: boolean;
  setDeviceCapabilities: (mobile: boolean, webgl: boolean) => void;

  // Reduced motion preference
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (prefers: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  // Initial state
  activeSection: 'home',
  cameraPosition: new Vector3(0, 0, 5),
  cameraTarget: new Vector3(0, 0, 0),
  fps: 60,
  mousePosition: { x: 0, y: 0 },
  scrollProgress: 0,
  isLoading: true,
  loadingProgress: 0,
  isMobile: false,
  supportsWebGL: true,
  prefersReducedMotion: false,

  // Actions
  setActiveSection: (section) => set({ activeSection: section }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setFps: (fps) => set({ fps }),
  setMousePosition: (position) => set({ mousePosition: position }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setDeviceCapabilities: (mobile, webgl) =>
    set({ isMobile: mobile, supportsWebGL: webgl }),
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
}));
