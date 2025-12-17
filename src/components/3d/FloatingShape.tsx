'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface FloatingShapeProps {
  position?: [number, number, number];
  geometry?: 'box' | 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color?: string;
  size?: number;
  speed?: number;
  floatIntensity?: number;
  wireframe?: boolean;
}

export function FloatingShape({
  position = [0, 0, 0],
  geometry = 'icosahedron',
  color = '#00FFF5',
  size = 1,
  speed = 1,
  floatIntensity = 0.5,
  wireframe = false,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);
  const mousePosition = useSceneStore((state) => state.mousePosition);

  // Animation
  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Floating motion
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * floatIntensity;

    // Rotation
    meshRef.current.rotation.x += delta * speed * 0.2;
    meshRef.current.rotation.y += delta * speed * 0.3;
    meshRef.current.rotation.z += delta * speed * 0.1;

    // React to mouse
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = mousePosition.y * 0.3;

    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
  });

  // Select geometry
  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[size, size, size]} />;
      case 'sphere':
        return <sphereGeometry args={[size * 0.5, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[size * 0.4, size * 0.15, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size * 0.5]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[size * 0.5, 0]} />;
      default:
        return <icosahedronGeometry args={[size * 0.5, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.6 : 0.8}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}
