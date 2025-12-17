'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  spread?: number;
  reactToMouse?: boolean;
}

export function ParticleField({
  count = 1000,
  size = 0.02,
  color = '#00FFF5',
  speed = 0.001,
  spread = 10,
  reactToMouse = true,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const scrollProgress = useSceneStore((state) => state.scrollProgress);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  // Generate random particle positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random position in a sphere
      const radius = spread * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, [count, spread]);

  // Animate particles
  useFrame((state, delta) => {
    if (!pointsRef.current || prefersReducedMotion) return;

    const positions = pointsRef.current.geometry.attributes.position;

    // Rotate particles slowly
    pointsRef.current.rotation.y += speed * delta * 10;
    pointsRef.current.rotation.x += speed * delta * 5;

    // React to mouse movement
    if (reactToMouse) {
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = mousePosition.y * 0.5;

      pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
    }

    // React to scroll
    pointsRef.current.position.z = scrollProgress * 2;

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
