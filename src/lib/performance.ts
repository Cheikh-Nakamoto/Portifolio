/**
 * Performance monitoring utilities for 3D scenes
 */

export interface PerformanceMetrics {
  fps: number;
  memory: number;
  drawCalls: number;
  triangles: number;
}

/**
 * FPS Counter
 */
export class FPSCounter {
  private frames: number = 0;
  private lastTime: number = performance.now();
  private fps: number = 60;

  update(): number {
    this.frames++;
    const currentTime = performance.now();

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;
    }

    return this.fps;
  }

  getFPS(): number {
    return this.fps;
  }
}

/**
 * Memory Monitor
 */
export function getMemoryUsage(): number {
  if ('memory' in performance && performance.memory) {
    const memory = (performance as any).memory;
    return Math.round(memory.usedJSHeapSize / 1048576); // Convert to MB
  }
  return 0;
}

/**
 * Quality Presets based on device capabilities
 */
export type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';

export interface QualitySettings {
  level: QualityLevel;
  particleCount: number;
  shadowMapSize: number;
  antialias: boolean;
  postProcessing: boolean;
  pixelRatio: number;
}

export function getQualitySettings(
  fps: number,
  isMobile: boolean,
  memory: number
): QualitySettings {
  // Ultra quality
  if (!isMobile && fps >= 55 && memory > 2000) {
    return {
      level: 'ultra',
      particleCount: 2000,
      shadowMapSize: 2048,
      antialias: true,
      postProcessing: true,
      pixelRatio: 2,
    };
  }

  // High quality
  if (!isMobile && fps >= 45 && memory > 1000) {
    return {
      level: 'high',
      particleCount: 1500,
      shadowMapSize: 1024,
      antialias: true,
      postProcessing: true,
      pixelRatio: 1.5,
    };
  }

  // Medium quality
  if (fps >= 30 && memory > 500) {
    return {
      level: 'medium',
      particleCount: 800,
      shadowMapSize: 512,
      antialias: true,
      postProcessing: false,
      pixelRatio: 1,
    };
  }

  // Low quality (fallback)
  return {
    level: 'low',
    particleCount: 400,
    shadowMapSize: 256,
    antialias: false,
    postProcessing: false,
    pixelRatio: 1,
  };
}

/**
 * Adaptive Quality Manager
 * Automatically adjusts quality based on performance
 */
export class AdaptiveQualityManager {
  private fpsCounter: FPSCounter;
  private currentQuality: QualitySettings;
  private targetFPS: number = 30;
  private checkInterval: number = 2000; // Check every 2 seconds
  private lastCheckTime: number = 0;
  private isMobile: boolean;

  constructor(isMobile: boolean, initialQuality?: QualitySettings) {
    this.fpsCounter = new FPSCounter();
    this.isMobile = isMobile;
    this.currentQuality = initialQuality || getQualitySettings(60, isMobile, 2000);
  }

  update(): QualitySettings {
    const fps = this.fpsCounter.update();
    const currentTime = performance.now();

    // Check if it's time to evaluate quality
    if (currentTime - this.lastCheckTime < this.checkInterval) {
      return this.currentQuality;
    }

    this.lastCheckTime = currentTime;
    const memory = getMemoryUsage();

    // If FPS is too low, reduce quality
    if (fps < this.targetFPS - 5) {
      this.currentQuality = this.reduceQuality(this.currentQuality);
      console.log(`[Performance] Reducing quality to ${this.currentQuality.level} (FPS: ${fps})`);
    }
    // If FPS is good, try to increase quality
    else if (fps > this.targetFPS + 10 && this.currentQuality.level !== 'ultra') {
      const newQuality = this.increaseQuality(this.currentQuality);
      if (newQuality.level !== this.currentQuality.level) {
        console.log(`[Performance] Increasing quality to ${newQuality.level} (FPS: ${fps})`);
        this.currentQuality = newQuality;
      }
    }

    return this.currentQuality;
  }

  private reduceQuality(current: QualitySettings): QualitySettings {
    const levels: QualityLevel[] = ['ultra', 'high', 'medium', 'low'];
    const currentIndex = levels.indexOf(current.level);

    if (currentIndex < levels.length - 1) {
      const newLevel = levels[currentIndex + 1];
      return getQualitySettings(
        newLevel === 'low' ? 20 : newLevel === 'medium' ? 35 : 50,
        this.isMobile,
        getMemoryUsage()
      );
    }

    return current;
  }

  private increaseQuality(current: QualitySettings): QualitySettings {
    const levels: QualityLevel[] = ['low', 'medium', 'high', 'ultra'];
    const currentIndex = levels.indexOf(current.level);

    if (currentIndex < levels.length - 1) {
      const newLevel = levels[currentIndex + 1];
      return getQualitySettings(
        newLevel === 'ultra' ? 60 : newLevel === 'high' ? 50 : 40,
        this.isMobile,
        getMemoryUsage()
      );
    }

    return current;
  }

  getCurrentQuality(): QualitySettings {
    return this.currentQuality;
  }

  getFPS(): number {
    return this.fpsCounter.getFPS();
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Detect if the device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detect GPU tier
 */
export function getGPUTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) return 'low';

  try {
    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'medium';

    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();

    // High-end GPUs
    if (
      renderer.includes('nvidia') ||
      renderer.includes('geforce') ||
      renderer.includes('radeon') ||
      renderer.includes('amd')
    ) {
      return 'high';
    }

    // Low-end GPUs (integrated, mobile)
    if (
      renderer.includes('intel') ||
      renderer.includes('mali') ||
      renderer.includes('adreno') ||
      renderer.includes('powervr')
    ) {
      return 'low';
    }

    return 'medium';
  } catch (e) {
    return 'medium';
  }
}

/**
 * Get optimal particle count based on device
 */
export function getOptimalParticleCount(baseCount: number): number {
  const mobile = isMobileDevice();
  const gpuTier = getGPUTier();

  if (mobile) {
    return Math.floor(baseCount * 0.3); // 30% for mobile
  }

  switch (gpuTier) {
    case 'high':
      return baseCount;
    case 'medium':
      return Math.floor(baseCount * 0.6);
    case 'low':
      return Math.floor(baseCount * 0.3);
    default:
      return Math.floor(baseCount * 0.5);
  }
}

/**
 * Check if WebGL is supported
 */
export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Get device pixel ratio (capped for performance)
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, 2); // Cap at 2
}
