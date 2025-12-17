'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface SkillCubeProps {
  skill: string;
  position: [number, number, number];
  color: string;
  category: 'language' | 'framework' | 'tool';
}

function SkillCube({ skill, position, color, category }: SkillCubeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;

    // Rotation
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x += delta * 0.3;

    // Scale on hover
    const targetScale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main cube */}
      <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Skill text on front face */}
      <Text
        position={[0, 0, 0.41]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>

      {/* Category text on top face */}
      <Text
        position={[0, 0.41, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
        opacity={0.7}
      >
        {category}
      </Text>

      {/* Wireframe edges */}
      <RoundedBox args={[0.82, 0.82, 0.82]} radius={0.05} smoothness={4}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Point light for glow */}
      {hovered && (
        <pointLight position={[0, 0, 0]} intensity={1} color={color} distance={3} />
      )}
    </group>
  );
}

export function SkillCubes() {
  const skills = {
    languages: [
      { name: 'Go', color: '#00FFF5' },
      { name: 'TypeScript', color: '#00FFF5' },
      { name: 'Rust', color: '#00FFF5' },
      { name: 'Java', color: '#00FFF5' },
      { name: 'Python', color: '#00FFF5' },
    ],
    frameworks: [
      { name: 'React', color: '#B026FF' },
      { name: 'Angular', color: '#B026FF' },
      { name: 'Next.js', color: '#B026FF' },
      { name: 'Node.js', color: '#B026FF' },
    ],
    tools: [
      { name: 'Docker', color: '#FF3366' },
      { name: 'Git', color: '#FF3366' },
      { name: 'AWS', color: '#FF3366' },
    ],
  };

  // Arrange cubes in a grid
  const allSkills: Array<{ skill: string; category: 'language' | 'framework' | 'tool'; color: string }> = [];

  skills.languages.forEach((s) => allSkills.push({ skill: s.name, category: 'language', color: s.color }));
  skills.frameworks.forEach((s) => allSkills.push({ skill: s.name, category: 'framework', color: s.color }));
  skills.tools.forEach((s) => allSkills.push({ skill: s.name, category: 'tool', color: s.color }));

  // Create 3D grid positions
  const positions: Array<[number, number, number]> = [];
  const cols = 4;
  const spacing = 1.5;

  allSkills.forEach((_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = (col - cols / 2 + 0.5) * spacing;
    const y = -row * spacing;
    const z = Math.random() * 2 - 1; // Random depth
    positions.push([x, y, z]);
  });

  return (
    <group>
      {allSkills.map((item, index) => (
        <SkillCube
          key={item.skill}
          skill={item.skill}
          position={positions[index]}
          color={item.color}
          category={item.category}
        />
      ))}
    </group>
  );
}
