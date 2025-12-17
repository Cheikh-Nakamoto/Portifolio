'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click'>('default');

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });

      // Outline follows with delay (elastic effect)
      gsap.to(cursorOutline, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Mouse down handler
    const handleMouseDown = () => {
      setCursorState('click');
      gsap.to(cursorOutline, {
        scale: 0.8,
        duration: 0.1,
      });
    };

    // Mouse up handler
    const handleMouseUp = () => {
      setCursorState('default');
      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.2,
      });
    };

    // Hover detection for interactive elements
    const handleMouseEnter = () => {
      setCursorState('hover');
      gsap.to(cursorOutline, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      setCursorState('default');
      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .interactive'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor Dot - small filled circle */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Cursor Outline - large circle that follows with delay */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] transition-colors ${
          cursorState === 'hover'
            ? 'border-secondary'
            : cursorState === 'click'
            ? 'border-accent'
            : 'border-primary'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow:
            cursorState === 'hover'
              ? '0 0 20px rgba(176, 38, 255, 0.4)'
              : cursorState === 'click'
              ? '0 0 20px rgba(255, 51, 102, 0.4)'
              : '0 0 20px rgba(0, 255, 245, 0.3)',
        }}
      />
    </>
  );
}
