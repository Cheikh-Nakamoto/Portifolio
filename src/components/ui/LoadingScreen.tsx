'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCode } from 'react-icons/hi';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onComplete?.();
            }, 500);
          }, 500);
          return 100;
        }
        // Incremental progress with varying speed
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const displayProgress = Math.min(Math.floor(progress), 100);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-neutral-darkest flex items-center justify-center"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-primary/5"
              style={{ backgroundSize: '400% 400%' }}
            />

            {/* Particle effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100, window.innerHeight + 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
                className="absolute w-1 h-1 bg-primary rounded-full"
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo with 3D effect */}
            <motion.div
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotateY: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow layers */}
              <div className="absolute inset-0 bg-primary blur-3xl opacity-30 animate-pulse" />

              {/* Logo container */}
              <div className="relative w-32 h-32 glass-strong border-4 border-primary rounded-3xl flex items-center justify-center glow-primary">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <HiCode className="w-20 h-20 text-primary" />
                </motion.div>
              </div>

              {/* Orbiting particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translateX(${80 + i * 15}px)`,
                      backgroundColor: i === 0 ? '#00FFF5' : i === 1 ? '#B026FF' : '#FF3366',
                      boxShadow: `0 0 10px ${i === 0 ? '#00FFF5' : i === 1 ? '#B026FF' : '#FF3366'}`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-black gradient-text">
                Chargement
              </h2>

              {/* Progress bar */}
              <div className="w-64 h-2 glass-strong rounded-full overflow-hidden border border-primary/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-primary glow-primary"
                />
              </div>

              {/* Progress percentage */}
              <motion.p
                key={displayProgress}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-primary"
              >
                {displayProgress}%
              </motion.p>

              {/* Loading dots */}
              <div className="flex items-center justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>

            {/* Completion burst effect */}
            {displayProgress === 100 && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full bg-primary"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
