import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = ""
}) => {
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Spring physics for buttery smooth cursor following
  const springConfig = { damping: 12, stiffness: 200, mass: 0.5 };
  const xSpring = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);
  const rotateXSpring = useSpring(0, { damping: 25, stiffness: 90, mass: 1 });
  const rotateYSpring = useSpring(0, { damping: 25, stiffness: 90, mass: 1 });

  useEffect(() => {
    const touchMedia = window.matchMedia('(pointer: coarse)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsTouchOrReducedMotion(touchMedia.matches || motionMedia.matches);
    };

    update();
    touchMedia.addEventListener('change', update);
    motionMedia.addEventListener('change', update);
    return () => {
      touchMedia.removeEventListener('change', update);
      motionMedia.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (isTouchOrReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Track cursor relative to whole viewport — always active, full range
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Normalize cursor to -1 → +1 across full window
      const normX = (e.clientX / vw) * 2 - 1; // -1 = left edge, +1 = right edge
      const normY = (e.clientY / vh) * 2 - 1; // -1 = top edge,  +1 = bottom edge

      // Viewport-driven movement: avatar travels ~35% of viewport in each axis
      const moveX = normX * vw * 0.35;
      const moveY = normY * vh * 0.2;

      // 3D tilt: head tilts toward cursor
      const rotY = normX * 20;
      const rotX = -normY * 15;

      xSpring.set(moveX);
      ySpring.set(moveY);
      rotateXSpring.set(rotX);
      rotateYSpring.set(rotY);
    };

    const handleMouseLeave = () => {
      xSpring.set(0);
      ySpring.set(0);
      rotateXSpring.set(0);
      rotateYSpring.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchOrReducedMotion, xSpring, ySpring, rotateXSpring, rotateYSpring]);

  if (isTouchOrReducedMotion) {
    // Idle float only — no cursor tracking on touch / reduced-motion
    return (
      <motion.div
        className={`inline-block ${className}`}
        animate={{ y: [-5, 5, -5], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};
