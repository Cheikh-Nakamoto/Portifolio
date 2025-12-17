'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface CertBadgeProps {
  title: string;
  position: [number, number, number];
  color: string;
}

function CertBadge({ title, position, color }: CertBadgeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  useFrame((state, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Gentle floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.3;
    groupRef.current.position.x = position[0] + Math.cos(time * 0.3 + position[1]) * 0.2;

    // Rotation
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;

    // Scale on hover/click
    const targetScale = clicked ? 1.5 : hovered ? 1.2 : 1;
    const currentScale = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.1));
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Badge shape - extruded star/shield */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner circle */}
      <mesh position={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Certificate text */}
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.1}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.7}
        textAlign="center"
      >
        {title}
      </Text>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.03, 8, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.6 : 0.3}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 0, 0.2]}
        intensity={hovered ? 1 : 0.5}
        color={color}
        distance={3}
      />

      {/* Sparkle particles around badge */}
      {hovered && <SparkleParticles color={color} />}
    </group>
  );
}

// Sparkle particles that appear on hover
function SparkleParticles({ color }: { color: string }) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const count = 20;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.8 + Math.random() * 0.3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.z = state.clock.getElapsedTime();
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CertBadges() {
  const certifications = [
    { title: 'Hedera Certified', color: '#00FFF5' },
    { title: 'Blockchain Developer', color: '#B026FF' },
    { title: 'Full Stack Expert', color: '#FF3366' },
  ];

  return (
    <group>
      {certifications.map((cert, index) => {
        const angle = (index / certifications.length) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <CertBadge
            key={cert.title}
            title={cert.title}
            position={[x, 0, z]}
            color={cert.color}
          />
        );
      })}
    </group>
  );
}
