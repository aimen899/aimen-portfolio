import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = "",
  enabled = true,
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 12, stiffness: 200, mass: 0.5 };
  const xSpring = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);
  const rotateXSpring = useSpring(0, { damping: 25, stiffness: 90, mass: 1 });
  const rotateYSpring = useSpring(0, { damping: 25, stiffness: 90, mass: 1 });

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(motionMedia.matches);
    update();
    motionMedia.addEventListener('change', update);
    return () => motionMedia.removeEventListener('change', update);
  }, []);

  // Desktop: mouse tracking
  useEffect(() => {
    if (isReducedMotion || !enabled) {
      xSpring.set(0);
      ySpring.set(0);
      rotateXSpring.set(0);
      rotateYSpring.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const normX = (e.clientX / vw) * 2 - 1;
      const normY = (e.clientY / vh) * 2 - 1;
      const moveX = normX * vw * 0.35;
      const moveY = normY * vh * 0.2;
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
  }, [isReducedMotion, enabled, xSpring, ySpring, rotateXSpring, rotateYSpring]);

  // Mobile: touch tracking
  useEffect(() => {
    if (isReducedMotion || !enabled) return;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const normX = (touch.clientX / vw) * 2 - 1;
      const normY = (touch.clientY / vh) * 2 - 1;
      const moveX = normX * vw * 0.25;
      const moveY = normY * vh * 0.15;
      const rotY = normX * 15;
      const rotX = -normY * 10;

      xSpring.set(moveX);
      ySpring.set(moveY);
      rotateXSpring.set(rotX);
      rotateYSpring.set(rotY);
    };

    const handleTouchEnd = () => {
      xSpring.set(0);
      ySpring.set(0);
      rotateXSpring.set(0);
      rotateYSpring.set(0);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isReducedMotion, enabled, xSpring, ySpring, rotateXSpring, rotateYSpring]);

  if (isReducedMotion) {
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
