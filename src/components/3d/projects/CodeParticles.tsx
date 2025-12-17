'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

export function CodeParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const scrollProgress = useSceneStore((state) => state.scrollProgress);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);
  const isMobile = useSceneStore((state) => state.isMobile);

  // Generate particle positions representing code/data flow
  const { positions, colors, linePositions } = useMemo(() => {
    const count = isMobile ? 300 : 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const linePositions: number[] = [];

    const colorPalette = [
      new THREE.Color('#00FFF5'), // Primary
      new THREE.Color('#B026FF'), // Secondary
      new THREE.Color('#FF3366'), // Accent
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Create flowing pattern
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Assign colors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Connect some particles with lines (data flow visualization)
      if (i < count - 1 && Math.random() > 0.95) {
        linePositions.push(
          positions[i3], positions[i3 + 1], positions[i3 + 2],
          positions[i3 + 3], positions[i3 + 4], positions[i3 + 5]
        );
      }
    }

    return {
      positions,
      colors,
      linePositions: new Float32Array(linePositions)
    };
  }, [isMobile]);

  // Animation
  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      const array = positions.array as Float32Array;

      for (let i = 0; i < array.length; i += 3) {
        // Flowing motion downward (like data streaming)
        array[i + 1] -= delta * 0.5;

        // Wrap around when particle goes too low
        if (array[i + 1] < -8) {
          array[i + 1] = 8;
        }

        // Add wave motion
        array[i] += Math.sin(time + array[i + 1]) * 0.01;
      }

      positions.needsUpdate = true;

      // Rotate particle field based on mouse
      particlesRef.current.rotation.y = mousePosition.x * 0.2;
      particlesRef.current.rotation.x = mousePosition.y * 0.2;

      // React to scroll
      particlesRef.current.position.z = scrollProgress * 3;
    }

    // Animate connection lines
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.1;
      linesRef.current.material.opacity = 0.2 + Math.sin(time) * 0.1;
    }
  });

  return (
    <group>
      {/* Flowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          transparent
          opacity={0.6}
          sizeAttenuation
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines showing data flow */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00FFF5"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

      {/* Ambient glow */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#00FFF5" distance={10} />
    </group>
  );
}
