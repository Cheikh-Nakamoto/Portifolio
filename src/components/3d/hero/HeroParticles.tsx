'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

export function HeroParticles() {
  const starsRef = useRef<THREE.Points>(null);
  const wavesRef = useRef<THREE.Mesh>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);
  const isMobile = useSceneStore((state) => state.isMobile);

  // Star particles
  const starParticles = useMemo(() => {
    const count = isMobile ? 500 : 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#00FFF5'),
      new THREE.Color('#B026FF'),
      new THREE.Color('#FF3366'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random position in a large sphere
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 5;

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, [isMobile]);

  // Animation
  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Animate stars
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.05;
      starsRef.current.rotation.x = mousePosition.y * 0.2;
      starsRef.current.rotation.z = mousePosition.x * 0.2;
    }

    // Animate waves
    if (wavesRef.current) {
      const positions = wavesRef.current.geometry.attributes.position;
      const array = positions.array as Float32Array;

      for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];

        // Wave effect
        array[i + 2] = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time * 0.7) * 0.5;
      }

      positions.needsUpdate = true;

      // Rotate waves slowly
      wavesRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group>
      {/* Background star field */}
      <points ref={starsRef} position={[0, 0, -10]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starParticles.positions.length / 3}
            array={starParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starParticles.colors.length / 3}
            array={starParticles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          transparent
          opacity={0.6}
          sizeAttenuation
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Animated wave mesh */}
      <mesh ref={wavesRef} position={[0, -3, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial
          color="#00FFF5"
          emissive="#00FFF5"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
