'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/scene.store';

interface PaperPlaneProps {
  isFlying: boolean;
  onAnimationComplete?: () => void;
}

export function PaperPlane({ isFlying, onAnimationComplete }: PaperPlaneProps) {
  const planeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Create paper plane geometry
  const planeGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Draw paper plane outline
    shape.moveTo(0, 0);
    shape.lineTo(-0.5, 0.3);
    shape.lineTo(0, 0.1);
    shape.lineTo(0.5, 0.3);
    shape.lineTo(0, 0);

    return new THREE.ShapeGeometry(shape);
  }, []);

  // Create trail particles
  const { particlePositions, particleColors } = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color('#00FFF5');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { particlePositions: positions, particleColors: colors };
  }, []);

  // Reset animation when isFlying changes to true
  useEffect(() => {
    if (isFlying) {
      setAnimationProgress(0);
    }
  }, [isFlying]);

  // Animation loop
  useFrame((state, delta) => {
    if (!planeRef.current || !particlesRef.current) return;
    if (prefersReducedMotion && !isFlying) return;

    const time = state.clock.getElapsedTime();

    if (isFlying && animationProgress < 1) {
      // Flight animation (0 to 1)
      const newProgress = Math.min(animationProgress + delta * 0.3, 1);
      setAnimationProgress(newProgress);

      // Smooth easing curve
      const easeProgress = 1 - Math.pow(1 - newProgress, 3);

      // Animate plane position (fly up and to the right)
      planeRef.current.position.x = easeProgress * 8;
      planeRef.current.position.y = easeProgress * 5 + Math.sin(easeProgress * Math.PI * 2) * 0.5;
      planeRef.current.position.z = easeProgress * 3;

      // Rotate plane during flight
      planeRef.current.rotation.z = Math.sin(easeProgress * Math.PI * 2) * 0.3;
      planeRef.current.rotation.y = easeProgress * Math.PI * 2;

      // Update trail particles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = positions.length - 3; i > 2; i -= 3) {
        positions[i] = positions[i - 3];
        positions[i + 1] = positions[i - 2];
        positions[i + 2] = positions[i - 1];
      }

      // Set first particle to plane position
      positions[0] = planeRef.current.position.x;
      positions[1] = planeRef.current.position.y;
      positions[2] = planeRef.current.position.z;

      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Call completion callback when done
      if (newProgress >= 1 && onAnimationComplete) {
        setTimeout(() => {
          onAnimationComplete();
          setAnimationProgress(0);
        }, 500);
      }
    } else if (!isFlying) {
      // Idle animation (gentle hovering)
      planeRef.current.position.x = 0;
      planeRef.current.position.y = Math.sin(time * 2) * 0.1;
      planeRef.current.position.z = 0;
      planeRef.current.rotation.x = Math.sin(time) * 0.05;
      planeRef.current.rotation.z = Math.cos(time * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Paper Plane */}
      <group ref={planeRef} position={[0, 0, 0]}>
        {/* Main plane body */}
        <mesh geometry={planeGeometry} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00FFF5"
            emissiveIntensity={isFlying ? 0.5 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Glow effect */}
        <mesh geometry={planeGeometry} rotation={[0, 0, Math.PI / 2]} scale={1.2}>
          <meshBasicMaterial
            color="#00FFF5"
            transparent
            opacity={isFlying ? 0.3 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Point light following plane */}
        <pointLight
          color="#00FFF5"
          intensity={isFlying ? 1 : 0.3}
          distance={3}
        />
      </group>

      {/* Trail particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          transparent
          opacity={isFlying ? 0.6 : 0}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Success burst particles (only when flying) */}
      {isFlying && animationProgress > 0.8 && (
        <group position={[animationProgress * 8, animationProgress * 5, animationProgress * 3]}>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const distance = (animationProgress - 0.8) * 3;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * distance,
                  Math.sin(angle) * distance,
                  0
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                  color="#00FFF5"
                  transparent
                  opacity={1 - (animationProgress - 0.8) * 5}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
}
