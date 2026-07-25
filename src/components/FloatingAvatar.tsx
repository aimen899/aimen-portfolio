import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Magnet } from './Magnet';
import avatarStylizedGirl from '../assets/aimen_3d_stylized_girl_avatar.png';

const SECTIONS = ['about', 'services', 'projects', 'contact'];

export const FloatingAvatar: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(-1);
  const [inHero, setInHero] = useState(true);
  const [avatarW, setAvatarW] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1200,
    vh: typeof window !== 'undefined' ? window.innerHeight : 900,
  });
  const imgRef = useRef<HTMLImageElement>(null);

  const { scrollY } = useScroll();

  const measure = useCallback(() => {
    if (imgRef.current) {
      setAvatarW(imgRef.current.offsetWidth);
    }
    setWindowDimensions({
      vw: window.innerWidth,
      vh: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const { vw, vh } = windowDimensions;
  const isMobile = vw < 640;

  // All hooks must be called before any conditional returns
  // Mobile: avatar is 140px, center it then move it to right side
  // Desktop: avatar is 290-490px, center then move right
  const rightOffset = isMobile
    ? vw * 0.18
    : Math.max(vw * 0.47 - avatarW * 0.25, 120);

  const x = useTransform(scrollY, [0, vh * 0.65], [0, rightOffset]);
  const y = useTransform(scrollY, [0, vh * 0.65], ['22vh', '20vh']);
  const scale = useTransform(
    scrollY,
    [0, vh * 0.35, vh * 0.65],
    isMobile ? [0.85, 0.55, 0.4] : [1.15, 0.7, 0.46]
  );

  const smoothX = useSpring(x, { damping: 30, stiffness: 50, mass: 1.2 });
  const smoothY = useSpring(y, { damping: 30, stiffness: 50, mass: 1.2 });
  const smoothScale = useSpring(scale, { damping: 30, stiffness: 50, mass: 1.2 });

  const scrollGazeY = useTransform(scrollY, [0, vh * 0.5, vh * 4], [0, -14, -18]);
  const smoothGazeY = useSpring(scrollGazeY, { damping: 25, stiffness: 70 });

  const tiltX = useTransform(scrollY, [0, vh, vh * 2, vh * 3], [0, -4, 4, -3]);
  const smoothTiltX = useSpring(tiltX, { damping: 25, stiffness: 70 });

  useEffect(() => {
    let scheduled = false;
    const handleScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const sy = window.scrollY;
        setInHero(sy < vh * 0.4);

        const sectionEls = SECTIONS.map((id) => document.getElementById(id));
        const viewportCenter = sy + vh * 0.45;

        let activeIdx = -1;
        sectionEls.forEach((el, idx) => {
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = sy + rect.top;
            const bottom = top + rect.height;
            if (viewportCenter >= top && viewportCenter <= bottom) {
              activeIdx = idx;
            }
          }
        });
        setCurrentSection((prev) => (prev !== activeIdx ? activeIdx : prev));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [vh]);

  const getSectionTilt = () => {
    switch (currentSection) {
      case 0: return { x: 4, y: -12, scale: 1.03 };
      case 1: return { x: -3, y: -15, scale: 1.05 };
      case 2: return { x: 5, y: -10, scale: 1.02 };
      case 3: return { x: -2, y: -8, scale: 1.04 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  const sectionTilt = getSectionTilt();

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        left: '50%',
        marginLeft: -(avatarW / 2 || -70),
        top: 0,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        style={{
          rotateX: smoothTiltX,
          rotateY: smoothGazeY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
      >
        <motion.div
          animate={{
            rotateX: sectionTilt.x,
            rotateY: sectionTilt.y,
            scale: sectionTilt.scale,
            y: inHero ? 0 : [0, -8, 0],
          }}
          transition={{
            rotateX: { type: 'spring', damping: 22, stiffness: 75 },
            rotateY: { type: 'spring', damping: 22, stiffness: 75 },
            scale: { type: 'spring', damping: 20, stiffness: 80 },
            y: inHero
              ? { duration: 0.3 }
              : { repeat: Infinity, duration: 4, ease: 'easeInOut' },
          }}
        >
          <Magnet enabled={inHero}>
            <img
              ref={imgRef}
              src={avatarStylizedGirl}
              alt="Aimen Hafeez Stylized 3D Girl Avatar"
              className="w-[200px] sm:w-[290px] md:w-[430px] lg:w-[490px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(141,106,174,0.35)] select-none pointer-events-none"
            />
          </Magnet>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
