'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface Milestone {
  position: THREE.Vector3;
  label: string;
  color: string;
}

export function Timeline3D() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useSceneStore((state) => state.scrollProgress);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  // Define career milestones along a curved path
  const milestones = useMemo<Milestone[]>(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-4, -2, 0),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(4, -2, 0)
    );

    const points = curve.getPoints(5);

    return points.map((point, index) => ({
      position: point,
      label: `Milestone ${index + 1}`,
      color: ['#00FFF5', '#B026FF', '#FF3366', '#00FFF5', '#B026FF', '#FF3366'][index],
    }));
  }, []);

  // Curve path for the timeline
  const curvePoints = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-4, -2, 0),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(4, -2, 0)
    );
    return curve.getPoints(50);
  }, []);

  // Animation
  useFrame((state, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;

    // React to scroll
    groupRef.current.position.y = scrollProgress * 2;
  });

  return (
    <group ref={groupRef}>
      {/* Timeline curve path */}
      <Line
        points={curvePoints}
        color="#00FFF5"
        lineWidth={2}
        transparent
        opacity={0.6}
      />

      {/* Milestone nodes */}
      {milestones.map((milestone, index) => (
        <group key={index} position={milestone.position}>
          {/* Outer glow sphere */}
          <Sphere args={[0.3, 16, 16]}>
            <meshBasicMaterial
              color={milestone.color}
              transparent
              opacity={0.3}
            />
          </Sphere>

          {/* Inner solid sphere */}
          <Sphere args={[0.15, 16, 16]}>
            <meshStandardMaterial
              color={milestone.color}
              emissive={milestone.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>

          {/* Point light for glow effect */}
          <pointLight
            position={[0, 0, 0]}
            intensity={0.5}
            color={milestone.color}
            distance={2}
          />

          {/* Rotating ring around node */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.25, 0.02, 8, 32]} />
            <meshBasicMaterial
              color={milestone.color}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Animated particle traveling along path */}
      <AnimatedParticle curvePoints={curvePoints} />
    </group>
  );
}

// Particle that travels along the timeline
function AnimatedParticle({ curvePoints }: { curvePoints: THREE.Vector3[] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const progress = (time * 0.1) % 1;
    const index = Math.floor(progress * (curvePoints.length - 1));
    const nextIndex = (index + 1) % curvePoints.length;
    const segmentProgress = (progress * (curvePoints.length - 1)) % 1;

    // Interpolate position
    const point = new THREE.Vector3().lerpVectors(
      curvePoints[index],
      curvePoints[nextIndex],
      segmentProgress
    );

    meshRef.current.position.copy(point);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="#FF3366" />
    </mesh>
  );
}
