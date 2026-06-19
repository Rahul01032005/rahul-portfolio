import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  // Use framer-motion values to prevent full component re-renders on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configure smooth spring physics for tracking delay/inertia
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset values to align center of the glow circle with cursor tip
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-accent-sky/8 blur-[100px] pointer-events-none z-30"
      style={{
        x: glowX,
        y: glowY,
      }}
    />
  );
}
