import * as THREE from 'three';

/**
 * Convert hex color to THREE.Color
 */
export function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

/**
 * Lerp (linear interpolation) between two values
 */
export function lerp(start: number, end: number, amount: number): number {
  return start * (1 - amount) + end * amount;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a value from one range to another
 */
export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Generate random position in a sphere
 */
export function randomSpherePoint(radius: number): THREE.Vector3 {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = radius * Math.random();

  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
}

/**
 * Generate random position in a box
 */
export function randomBoxPoint(width: number, height: number, depth: number): THREE.Vector3 {
  return new THREE.Vector3(
    (Math.random() - 0.5) * width,
    (Math.random() - 0.5) * height,
    (Math.random() - 0.5) * depth
  );
}

/**
 * Smooth damp for camera movement
 */
export function smoothDamp(
  current: number,
  target: number,
  velocity: number,
  smoothTime: number,
  deltaTime: number
): { value: number; velocity: number } {
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

  let change = current - target;
  const originalTo = target;

  const maxChange = Infinity;
  change = clamp(change, -maxChange, maxChange);
  target = current - change;

  const temp = (velocity + omega * change) * deltaTime;
  velocity = (velocity - omega * temp) * exp;
  let output = target + (change + temp) * exp;

  if (originalTo - current > 0.0 === output > originalTo) {
    output = originalTo;
    velocity = (output - originalTo) / deltaTime;
  }

  return { value: output, velocity };
}

/**
 * Check if WebGL is available
 */
export function isWebGLAvailable(): boolean {
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
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get device pixel ratio (clamped for performance)
 */
export function getDevicePixelRatio(): number {
  return Math.min(window.devicePixelRatio || 1, 2);
}

/**
 * Dispose Three.js object and its children
 */
export function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => disposeMaterial(material));
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });
}

/**
 * Dispose material and its textures
 */
function disposeMaterial(material: THREE.Material): void {
  if ('map' in material && material.map) material.map.dispose();
  if ('lightMap' in material && material.lightMap) material.lightMap.dispose();
  if ('bumpMap' in material && material.bumpMap) material.bumpMap.dispose();
  if ('normalMap' in material && material.normalMap) material.normalMap.dispose();
  if ('specularMap' in material && material.specularMap) material.specularMap.dispose();
  if ('envMap' in material && material.envMap) material.envMap.dispose();
  material.dispose();
}
