'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface TechIconProps {
  text: string;
  position: [number, number, number];
  color: string;
  index: number;
}

function TechIcon({ text, position, color, index }: TechIconProps) {
  const meshRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Orbital motion around center
    const radius = 4;
    const speed = 0.3;
    const offset = (index / 6) * Math.PI * 2;

    meshRef.current.position.x = Math.cos(time * speed + offset) * radius;
    meshRef.current.position.z = Math.sin(time * speed + offset) * radius;
    meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.5;

    // Always face the camera (look at camera position)
    const camera = state.camera;
    meshRef.current.lookAt(camera.position);
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Badge background */}
      <mesh>
        <boxGeometry args={[1.2, 0.6, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Text using Text component instead of Text3D */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
      >
        {text}
      </Text>

      {/* Glow point light */}
      <pointLight position={[0, 0, 0.2]} intensity={0.5} color={color} distance={2} />
    </group>
  );
}

export function TechIcons() {
  const techs = [
    { name: 'Go', color: '#0099FF' },
    { name: 'TypeScript', color: '#FF6B35' },
    { name: 'Rust', color: '#0099FF' },
    { name: 'Java', color: '#FF6B35' },
    { name: 'React', color: '#0099FF' },
    { name: 'Angular', color: '#FF6B35' },
  ];

  return (
    <group>
      {techs.map((tech, index) => (
        <TechIcon
          key={tech.name}
          text={tech.name}
          position={[0, 0, 0]}
          color={tech.color}
          index={index}
        />
      ))}
    </group>
  );
}
