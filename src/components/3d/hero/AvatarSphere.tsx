'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';
import { MeshDistortMaterial, Text } from '@react-three/drei';

export function AvatarSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  // Orbit particles
  const orbitParticles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const radius = 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  // Animation
  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Sphere rotation
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    // React to mouse
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = mousePosition.y * 0.3;

    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;

    // Particles orbit
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.5;
      particlesRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Main sphere with distortion - More visible */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#0099FF"
          emissive="#0099FF"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={1.5}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Zone01 Text inside sphere */}
      <Text
        position={[0, 0, 1.6]}
        fontSize={0.4}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#0099FF"
        fontWeight="bold"
      >
        Zone01
      </Text>

      {/* Wireframe overlay */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#FF6B35"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={orbitParticles.length / 3}
            array={orbitParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#0099FF"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glow effect */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#0099FF" distance={5} />
    </group>
  );
}
