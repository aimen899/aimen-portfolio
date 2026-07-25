import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Constants ─────────────────────────────────────────────── */

const GIF_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
];

const CARD_COUNT = GIF_IMAGES.length;
const HELIX_NODES = 30;

// Base (desktop) values
const BASE_HELIX_HEIGHT = 740;
const BASE_HELIX_RADIUS = 72;
const BASE_ORBIT_RX = 380;
const BASE_STRAND_THICKNESS = 18;

const EASE_CUBIC_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

const getResponsiveScale = (vw: number) => Math.min(Math.max(vw / 900, 0.55), 1);

/* ═══════════════════ SECTION ═══════════════════ */

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(() =>
    getResponsiveScale(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  const helixContainerRef = useRef<HTMLDivElement>(null);
  const helixTiltRef = useRef<HTMLDivElement>(null);
  const glowBackdropRef = useRef<HTMLDivElement>(null);
  const coreBeamRef = useRef<HTMLDivElement>(null);

  const rungRefs = useRef<HTMLDivElement[]>([]);
  const joinerRefs = useRef<HTMLDivElement[]>([]);
  const node1Refs = useRef<HTMLDivElement[]>([]);
  const halo1Refs = useRef<HTMLDivElement[]>([]);
  const node2Refs = useRef<HTMLDivElement[]>([]);
  const halo2Refs = useRef<HTMLDivElement[]>([]);

  const particle1Refs = useRef<HTMLDivElement[]>([]);
  const particle2Refs = useRef<HTMLDivElement[]>([]);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardInnerRefs = useRef<HTMLDivElement[]>([]);

  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 });
  const scrollRef = useRef({ progress: 0, angle: 0, smoothAngle: 0 });
  const timeRef = useRef({ now: 0, breath: 0 });
  const scaleRef = useRef(scale);

  const rafRef = useRef(0);

  // Keep scaleRef in sync
  useEffect(() => { scaleRef.current = scale; }, [scale]);

  // Track resize
  useEffect(() => {
    const handleResize = () => {
      setScale(getResponsiveScale(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    mouseRef.current.x = (e.clientX / vw) * 2 - 1;
    mouseRef.current.y = (e.clientY / vh) * 2 - 1;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true });
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      mouseRef.current.x = (touch.clientX / vw) * 2 - 1;
      mouseRef.current.y = (touch.clientY / vh) * 2 - 1;
    };
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [onMove]);

  /* ─── Main RAF loop ── */

  useEffect(() => {
    const tick = (now: number) => {
      timeRef.current.now = now;
      const sc = scaleRef.current;

      // Scaled constants
      const HELIX_HEIGHT = BASE_HELIX_HEIGHT * sc;
      const HELIX_RADIUS = BASE_HELIX_RADIUS * sc;
      const ORBIT_RX = BASE_ORBIT_RX * sc;
      const STRAND_THICKNESS = BASE_STRAND_THICKNESS * sc;

      const m = mouseRef.current;
      m.smoothX += (m.x - m.smoothX) * 0.06;
      m.smoothY += (m.y - m.smoothY) * 0.06;

      const sr = scrollRef.current;
      sr.smoothAngle += (sr.angle - sr.smoothAngle) * 0.08;

      timeRef.current.breath = 1 + Math.sin(now * 0.0008) * 0.035;
      const breath = timeRef.current.breath;

      if (helixTiltRef.current) {
        const tiltX = m.smoothY * 12;
        const tiltY = m.smoothX * 16;
        helixTiltRef.current.style.transform =
          `translate(-50%,-50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      if (glowBackdropRef.current) {
        const glowPulse = 0.32 + Math.sin(now * 0.0006) * 0.06;
        glowBackdropRef.current.style.opacity = String(glowPulse + 0.68);
      }
      if (coreBeamRef.current) {
        const beamPulse = 0.7 + Math.sin(now * 0.0009) * 0.3;
        coreBeamRef.current.style.opacity = String(beamPulse);
      }

      const angle = sr.smoothAngle;
      for (let i = 0; i < HELIX_NODES; i++) {
        const f = i / (HELIX_NODES - 1);
        const y = f * HELIX_HEIGHT - HELIX_HEIGHT / 2;
        const helixAngle = f * Math.PI * 3.8 + angle * 0.01;
        const wave = Math.sin(now * 0.0005 + f * Math.PI * 2.5) * 0.04;
        const r = HELIX_RADIUS * (1 + wave) * breath;

        const cosA = Math.cos(helixAngle);
        const sinA = Math.sin(helixAngle);
        const x1 = cosA * r;
        const z1 = sinA * r;
        const x2 = -cosA * r;
        const z2 = -sinA * r;

        const avgZ = (z1 + z2) / 2;
        const dn = (avgZ + HELIX_RADIUS) / (2 * HELIX_RADIUS);
        const opacity = 0.55 + dn * 0.45;
        const nScale = 0.72 + dn * 0.28;
        const glow = dn * 0.85;

        const rungW = Math.hypot(x2 - x1, z2 - z1);
        const rungAngle = Math.atan2(z2 - z1, x2 - x1);

        if (rungRefs.current[i]) {
          const el = rungRefs.current[i];
          el.style.transform = `translate3d(${x1}px,${y}px,${z1}px) rotateY(${rungAngle}rad)`;
          el.style.width = `${rungW}px`;
          el.style.opacity = String(opacity * 0.8);
        }

        if (joinerRefs.current[i]) {
          const s = 6 * nScale * sc;
          joinerRefs.current[i].style.transform =
            `translate3d(${(x1 + x2) / 2}px,${y}px,${(z1 + z2) / 2}px)`;
          joinerRefs.current[i].style.width = `${s}px`;
          joinerRefs.current[i].style.height = `${s}px`;
          joinerRefs.current[i].style.opacity = String(opacity * 0.9);
        }

        if (node1Refs.current[i]) {
          const s = STRAND_THICKNESS * nScale;
          node1Refs.current[i].style.transform = `translate3d(${x1}px,${y}px,${z1}px)`;
          node1Refs.current[i].style.width = `${s}px`;
          node1Refs.current[i].style.height = `${s}px`;
          node1Refs.current[i].style.opacity = String(opacity);
          node1Refs.current[i].style.boxShadow =
            `0 0 ${14 + glow * 22}px rgba(56,189,248,${0.65 + glow * 0.35}),` +
            `0 0 ${32 + glow * 40}px rgba(124,58,237,${0.4 + glow * 0.4}),` +
            `0 0 ${55 + glow * 55}px rgba(168,85,247,${glow * 0.35}),` +
            `inset 0 1.5px 4px rgba(255,255,255,0.75)`;
        }

        if (halo1Refs.current[i]) {
          const hs = STRAND_THICKNESS * nScale * 2.8;
          halo1Refs.current[i].style.transform = `translate3d(${x1}px,${y}px,${z1}px)`;
          halo1Refs.current[i].style.width = `${hs}px`;
          halo1Refs.current[i].style.height = `${hs}px`;
          halo1Refs.current[i].style.background =
            `radial-gradient(circle, rgba(56,189,248,${glow * 0.35}) 0%, rgba(124,58,237,${glow * 0.15}) 50%, transparent 75%)`;
        }

        if (node2Refs.current[i]) {
          const s = STRAND_THICKNESS * nScale;
          node2Refs.current[i].style.transform = `translate3d(${x2}px,${y}px,${z2}px)`;
          node2Refs.current[i].style.width = `${s}px`;
          node2Refs.current[i].style.height = `${s}px`;
          node2Refs.current[i].style.opacity = String(opacity);
          node2Refs.current[i].style.boxShadow =
            `0 0 ${14 + glow * 22}px rgba(232,121,249,${0.65 + glow * 0.35}),` +
            `0 0 ${32 + glow * 40}px rgba(168,85,247,${0.4 + glow * 0.4}),` +
            `0 0 ${55 + glow * 55}px rgba(192,132,252,${glow * 0.35}),` +
            `inset 0 1.5px 4px rgba(255,255,255,0.75)`;
        }

        if (halo2Refs.current[i]) {
          const hs = STRAND_THICKNESS * nScale * 2.8;
          halo2Refs.current[i].style.transform = `translate3d(${x2}px,${y}px,${z2}px)`;
          halo2Refs.current[i].style.width = `${hs}px`;
          halo2Refs.current[i].style.height = `${hs}px`;
          halo2Refs.current[i].style.background =
            `radial-gradient(circle, rgba(232,121,249,${glow * 0.35}) 0%, rgba(168,85,247,${glow * 0.15}) 50%, transparent 75%)`;
        }
      }

      // Particles Strand 1
      const HELIX_H = BASE_HELIX_HEIGHT * sc;
      const HELIX_R = BASE_HELIX_RADIUS * sc;
      for (let p = 0; p < 8; p++) {
        const phase = ((now * 0.00012 + p * 0.125) % 1);
        const py = phase * HELIX_H - HELIX_H / 2;
        const pAngle = phase * Math.PI * 3.8 + angle * 0.01;
        const pWave = Math.sin(now * 0.0005 + phase * Math.PI * 2.5) * 0.04;
        const pr = HELIX_R * (1 + pWave) * breath;
        const px = Math.cos(pAngle) * pr;
        const pz = Math.sin(pAngle) * pr;
        if (particle1Refs.current[p]) {
          particle1Refs.current[p].style.transform = `translate3d(${px}px,${py}px,${pz}px)`;
          particle1Refs.current[p].style.opacity = String(0.7 + Math.sin(phase * Math.PI) * 0.3);
        }
      }

      // Particles Strand 2
      for (let p = 0; p < 8; p++) {
        const phase = ((now * 0.00011 + p * 0.125 + 0.06) % 1);
        const py = phase * HELIX_H - HELIX_H / 2;
        const pAngle = phase * Math.PI * 3.8 + angle * 0.01 + Math.PI;
        const pWave = Math.sin(now * 0.0005 + phase * Math.PI * 2.5) * 0.04;
        const pr = HELIX_R * (1 + pWave) * breath;
        const px = Math.cos(pAngle) * pr;
        const pz = Math.sin(pAngle) * pr;
        if (particle2Refs.current[p]) {
          particle2Refs.current[p].style.transform = `translate3d(${px}px,${py}px,${pz}px)`;
          particle2Refs.current[p].style.opacity = String(0.7 + Math.sin(phase * Math.PI) * 0.3);
        }
      }

      // Orbital Cards
      if (cardContainerRef.current) {
        cardContainerRef.current.style.transform =
          `rotateX(${m.smoothY * 3}deg) rotateY(${m.smoothX * 5}deg)`;
      }

      for (let c = 0; c < CARD_COUNT; c++) {
        const base = (360 / CARD_COUNT) * c;
        const cardAngle = base + angle * 0.8;
        const rad = (cardAngle * Math.PI) / 180;

        const rawX = Math.sin(rad) * ORBIT_RX;
        const rawZ = Math.cos(rad) * ORBIT_RX;
        const rawY = Math.sin(rad * 2) * 28 * sc;

        const dn = (rawZ + ORBIT_RX) / (2 * ORBIT_RX);
        const cardScale = 0.78 + dn * 0.24;
        const opacity = 0.6 + dn * 0.4;
        const blur = (1 - dn) * 3;
        const zIdx = Math.round(dn * 100);
        const sat = 0.75 + dn * 0.25;

        const px = m.smoothX * (1 - dn) * 28 * sc;
        const py = m.smoothY * (1 - dn) * 20 * sc;

        if (cardInnerRefs.current[c]) {
          const el = cardInnerRefs.current[c];
          el.style.transform = `translate3d(${rawX + px}px,${rawY + py}px,${rawZ}px) scale(${cardScale})`;
          el.style.zIndex = String(zIdx);
          el.style.opacity = String(opacity);
          el.style.filter =
            [blur > 0.5 ? `blur(${blur}px)` : '', sat < 0.95 ? `saturate(${sat})` : '']
              .filter(Boolean)
              .join(' ') || 'none';
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ─── GSAP ScrollTrigger ── */

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            onUpdate: (self) => {
              scrollRef.current.angle = EASE_CUBIC_OUT(self.progress) * 1080;
            },
          },
        }
      );

      gsap.fromTo(
        '.dna-helix-container',
        { scale: 0.7, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 85%',
            end: 'center center',
            scrub: 1.5,          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ─── Responsive dimensions for static JSX ── */

  const HELIX_H = BASE_HELIX_HEIGHT * scale;
  const CARD_W = 290 * scale;
  const CARD_H = 196 * scale;
  const GLOW_W = 360 * scale;
  const GLOW_H = HELIX_H + 240 * scale;
  const CORE_W = 140 * scale;
  const CORE_H = HELIX_H + 100 * scale;
  const MIN_HEIGHT = Math.max(750 * scale, 550);
  const PARTICLE_SIZE = Math.max(8 * scale, 4);
  const RUNG_HEIGHT = 3.5 * scale;

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F1E8] overflow-hidden w-full relative"
      style={{ perspective: 1400, perspectiveOrigin: '50% 50%' }}
    >
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: '95vh', minHeight: MIN_HEIGHT, maxHeight: 1000 }}
      >
        {/* ── DNA Helix ── */}
        <div
          className="dna-helix-container absolute left-1/2 top-1/2 pointer-events-none"
          ref={helixContainerRef}
          style={{
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div
            ref={helixTiltRef}
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* Volumetric glow backdrop */}
            <div
              ref={glowBackdropRef}
              className="absolute pointer-events-none"
              style={{
                width: GLOW_W,
                height: GLOW_H,
                left: -GLOW_W / 2,
                top: -HELIX_H / 2 - 120 * scale,
                background:
                  'radial-gradient(ellipse at center, rgba(141,106,174,0.38) 0%, rgba(168,85,247,0.24) 30%, rgba(56,189,248,0.14) 55%, transparent 75%)',
                filter: 'blur(70px)',
                willChange: 'opacity',
              }}
            />

            {/* Inner core beam */}
            <div
              ref={coreBeamRef}
              className="absolute pointer-events-none"
              style={{
                width: CORE_W,
                height: CORE_H,
                left: -CORE_W / 2,
                top: -HELIX_H / 2 - 50 * scale,
                background:
                  'radial-gradient(ellipse at center, rgba(192,132,252,0.25) 0%, rgba(124,58,237,0.1) 50%, transparent 80%)',
                filter: 'blur(35px)',
                willChange: 'opacity',
              }}
            />

            {/* Helix nodes */}
            {Array.from({ length: HELIX_NODES }, (_, i) => (
              <React.Fragment key={i}>
                <div
                  ref={(el) => { if (el) rungRefs.current[i] = el; }}
                  className="absolute"
                  style={{
                    left: 0,
                    top: 0,
                    height: RUNG_HEIGHT,
                    transformOrigin: '0 50%',
                    background: `linear-gradient(90deg,
                      rgba(141,106,174,0.85),
                      rgba(56,189,248,0.75),
                      rgba(232,121,249,0.7),
                      rgba(168,85,247,0.75),
                      rgba(141,106,174,0.85))`,
                    boxShadow: '0 0 12px rgba(168,85,247,0.5), 0 0 20px rgba(56,189,248,0.3)',
                    borderRadius: 4,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                />
                <div
                  ref={(el) => { if (el) joinerRefs.current[i] = el; }}
                  className="absolute rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 0 10px rgba(56,189,248,0.9), 0 0 20px rgba(168,85,247,0.7)',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                />
                <div
                  ref={(el) => { if (el) node1Refs.current[i] = el; }}
                  className="absolute rounded-full"
                  style={{
                    background: `radial-gradient(circle at 32% 28%,
                      rgba(255,255,255,1) 0%,
                      rgba(186,230,253,0.95) 25%,
                      rgba(56,189,248,0.9) 55%,
                      rgba(124,58,237,0.85) 100%)`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                />
                <div
                  ref={(el) => { if (el) halo1Refs.current[i] = el; }}
                  className="absolute rounded-full pointer-events-none"
                  style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                />
                <div
                  ref={(el) => { if (el) node2Refs.current[i] = el; }}
                  className="absolute rounded-full"
                  style={{
                    background: `radial-gradient(circle at 32% 28%,
                      rgba(255,255,255,1) 0%,
                      rgba(245,208,254,0.95) 25%,
                      rgba(232,121,249,0.9) 55%,
                      rgba(168,85,247,0.85) 100%)`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                />
                <div
                  ref={(el) => { if (el) halo2Refs.current[i] = el; }}
                  className="absolute rounded-full pointer-events-none"
                  style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                />
              </React.Fragment>
            ))}

            {/* Particles Strand 1 */}
            {Array.from({ length: 8 }, (_, p) => (
              <div
                key={`p1-${p}`}
                ref={(el) => { if (el) particle1Refs.current[p] = el; }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: PARTICLE_SIZE,
                  height: PARTICLE_SIZE,
                  left: -PARTICLE_SIZE / 2,
                  top: -PARTICLE_SIZE / 2,
                  background: 'rgba(56,189,248,1)',
                  boxShadow:
                    '0 0 10px rgba(56,189,248,1), 0 0 24px rgba(56,189,248,0.8), 0 0 45px rgba(56,189,248,0.4)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
            ))}

            {/* Particles Strand 2 */}
            {Array.from({ length: 8 }, (_, p) => (
              <div
                key={`p2-${p}`}
                ref={(el) => { if (el) particle2Refs.current[p] = el; }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: PARTICLE_SIZE,
                  height: PARTICLE_SIZE,
                  left: -PARTICLE_SIZE / 2,
                  top: -PARTICLE_SIZE / 2,
                  background: 'rgba(232,121,249,1)',
                  boxShadow:
                    '0 0 10px rgba(232,121,249,1), 0 0 24px rgba(232,121,249,0.8), 0 0 45px rgba(232,121,249,0.4)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Orbital Cards ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          ref={cardContainerRef}
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {GIF_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: 0,
                height: 0,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                ref={(el) => { if (el) cardInnerRefs.current[idx] = el; }}
                style={{
                  position: 'absolute',
                  marginLeft: -(CARD_W / 2),
                  marginTop: -(CARD_H / 2),
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden bg-[#E8DDF2] border border-[#8D6AAE]/40"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    boxShadow: '0 12px 36px rgba(141,106,174,0.18)',
                  }}
                >
                  <img
                    src={src}
                    alt={`Portfolio ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
