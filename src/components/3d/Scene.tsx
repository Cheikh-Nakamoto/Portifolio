'use client';

import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  Preload,
} from '@react-three/drei';
import { useSceneStore } from '@/store/scene.store';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface SceneProps {
  children?: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  enableControls?: boolean;
  enablePostProcessing?: boolean;
  className?: string;
}

function SceneContent({ children, enablePostProcessing = true }: {
  children?: React.ReactNode;
  enablePostProcessing?: boolean;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00FFF5" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#B026FF" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Scene content */}
      {children}

      {/* Post-processing effects */}
      {enablePostProcessing && (
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      )}

      {/* Preload assets */}
      <Preload all />
    </>
  );
}

export function Scene({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  enableControls = false,
  enablePostProcessing = true,
  className = '',
}: SceneProps) {
  const isMobile = useSceneStore((state) => state.isMobile);
  const setFps = useSceneStore((state) => state.setFps);

  // FPS monitoring
  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    measureFPS();
  }, [setFps]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 200,
        }}
      >
        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={camera.position}
          fov={camera.fov}
        />

        {/* Optional orbit controls for debugging */}
        {enableControls && <OrbitControls enableDamping dampingFactor={0.05} />}

        {/* Scene content in Suspense for lazy loading */}
        <Suspense fallback={null}>
          <SceneContent enablePostProcessing={enablePostProcessing}>
            {children}
          </SceneContent>
        </Suspense>
      </Canvas>
    </div>
  );
}
