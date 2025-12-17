'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useSceneStore } from '@/store/scene.store';

interface NetworkNode {
  position: THREE.Vector3;
  label: string;
  color: string;
  url: string;
}

interface NetworkWebProps {
  socialLinks: Array<{ label: string; url: string }>;
  onNodeClick?: (url: string) => void;
}

export function NetworkWeb({ socialLinks, onNodeClick }: NetworkWebProps) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const prefersReducedMotion = useSceneStore((state) => state.prefersReducedMotion);

  // Create network nodes in a circular arrangement
  const nodes = useMemo<NetworkNode[]>(() => {
    const nodeColors = ['#00FFF5', '#B026FF', '#FF3366'];
    const radius = 3;

    return socialLinks.map((link, i) => {
      const angle = (i / socialLinks.length) * Math.PI * 2;
      return {
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ),
        label: link.label,
        color: nodeColors[i % nodeColors.length],
        url: link.url,
      };
    });
  }, [socialLinks]);

  // Create connection lines between all nodes
  const linePositions = useMemo(() => {
    const positions: number[] = [];

    // Connect each node to every other node
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        positions.push(
          nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
        );
      }
    }

    // Connect all nodes to center
    nodes.forEach(node => {
      positions.push(
        node.position.x, node.position.y, node.position.z,
        0, 0, 0
      );
    });

    return new Float32Array(positions);
  }, [nodes]);

  // Animation
  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire network
    if (groupRef.current) {
      groupRef.current.rotation.z = time * 0.1;

      // React to mouse movement
      groupRef.current.rotation.x = mousePosition.y * 0.3;
      groupRef.current.rotation.y = mousePosition.x * 0.3;
    }

    // Animate line opacity
    if (linesRef.current && !Array.isArray(linesRef.current.material)) {
      const material = linesRef.current.material as THREE.Material & { opacity: number };
      material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00FFF5"
          emissive="#00FFF5"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow for center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#00FFF5"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Social link nodes */}
      {nodes.map((node, index) => (
        <group key={node.label} position={node.position}>
          {/* Node sphere */}
          <mesh
            onClick={() => onNodeClick?.(node.url)}
            onPointerEnter={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'none';
            }}
          >
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Label */}
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>

          {/* Point light for glow */}
          <pointLight
            color={node.color}
            intensity={0.5}
            distance={2}
          />
        </group>
      ))}

      {/* Connection lines */}
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
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Ambient light */}
      <ambientLight intensity={0.2} />
    </group>
  );
}
