import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LuxIntroProps {
  onLoadingComplete: () => void;
  logoText?: string;
}

// ─── Tiny floating particle ───────────────────────────────────────────────────
const PARTICLE_COUNT = 28;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 0.4,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 6,
  opacity: Math.random() * 0.28 + 0.06,
}));

export const LuxIntro: React.FC<LuxIntroProps> = ({
  onLoadingComplete,
  logoText = 'Mehdi Ben Taleb',
}) => {
  const [phase, setPhase] = useState<'intro' | 'done'>('intro');
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef     = useRef<HTMLDivElement>(null);

  // Logo
  const logoWrapRef  = useRef<HTMLDivElement>(null);
  const logoTextRef  = useRef<HTMLDivElement>(null);
  const shimmerRef   = useRef<HTMLDivElement>(null);
  const scanRef      = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const lineLeftRef  = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);

  // Rings
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);

  // Grid + glow
  const gridRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── Initial states ───────────────────────────────────────────────
      gsap.set(sceneRef.current,    { z: -1000, opacity: 0, rotationX: 16 });
      gsap.set(gridRef.current,     { opacity: 0 });
      gsap.set(glowRef.current,     { opacity: 0, scale: 0.3 });
      gsap.set(logoWrapRef.current, { opacity: 0, y: 32, filter: 'blur(20px)' });
      gsap.set(logoTextRef.current, { scaleY: 1.8, scaleX: 0.65, filter: 'blur(30px) brightness(4)' });
      gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0, opacity: 0 });
      gsap.set(taglineRef.current,  { opacity: 0, y: 12 });
      gsap.set(underlineRef.current,{ scaleX: 0, opacity: 0 });
      gsap.set(shimmerRef.current,  { x: '-115%', opacity: 0 });
      gsap.set(scanRef.current,     { y: '-100%', opacity: 0 });
      gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
        opacity: 0, scale: 0.1, rotationX: 80,
      });

      // ─── Master Timeline ──────────────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setPhase('done');
          setTimeout(onLoadingComplete, 500);
        },
      });

      // 1) Camera RUSHES IN from deep Z
      tl.to(sceneRef.current, { z: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: 'expo.out' }, 0)

      // 2) Grid fades in
      .to(gridRef.current, { opacity: 1, duration: 1.2 }, 0.1)

      // 3) Ambient glow blooms
      .to(glowRef.current, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.2)

      // 4) Rings snap into orbit — staggered
      .to(ring1Ref.current, { opacity: 1,    scale: 1, rotationX: 74, duration: 1.0, ease: 'back.out(1.6)' }, 0.35)
      .to(ring2Ref.current, { opacity: 0.5,  scale: 1, rotationX: 74, duration: 1.0, ease: 'back.out(1.6)' }, 0.48)
      .to(ring3Ref.current, { opacity: 0.25, scale: 1, rotationX: 74, duration: 1.0, ease: 'back.out(1.6)' }, 0.60)

      // 5) Logo condenses from blur
      .to(logoWrapRef.current,  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }, 0.75)
      .to(logoTextRef.current,  { scaleY: 1, scaleX: 1, filter: 'blur(0px) brightness(1)', duration: 0.9, ease: 'expo.out' }, 0.77)

      // 6) Accent lines shoot out
      .to(lineLeftRef.current,  { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power4.out', transformOrigin: 'right center' }, 1.35)
      .to(lineRightRef.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power4.out', transformOrigin: 'left center'  }, 1.35)

      // 7) Underline sweeps in
      .to(underlineRef.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power4.out', transformOrigin: 'left center' }, 1.5)

      // 8) Scan line drops
      .to(scanRef.current, { opacity: 0.95, duration: 0.02 }, 1.56)
      .to(scanRef.current, { y: '250%', duration: 0.44, ease: 'power1.inOut' }, 1.56)
      .to(scanRef.current, { opacity: 0, duration: 0.06 }, 1.98)

      // 9) Shimmer sweep
      .to(shimmerRef.current, { opacity: 1, x: '125%', duration: 0.54, ease: 'power2.inOut' }, 1.65)

      // 10) Tagline rises
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.65 }, 1.72)

      // 11) Hold — let it breathe
      .to({}, { duration: 1.4 })

      // 12) EXIT — everything collapses then thrusts forward
      .to(gridRef.current,  { opacity: 0, duration: 0.4, ease: 'power2.in' })
      .to(glowRef.current,  { opacity: 0, scale: 2.5, duration: 0.6, ease: 'expo.in' }, '<')
      .to(sceneRef.current, {
        z: 1600, scale: 1.12, opacity: 0, filter: 'blur(18px)',
        duration: 0.95, ease: 'expo.in',
      }, '<0.1')

      // 13) Black flash (cleaner than white for pure black theme)
      .to(flashRef.current, { opacity: 1, duration: 0.3, ease: 'power4.in' }, '-=0.28');

      // ─── Perpetual ring orbit ─────────────────────────────────────────
      gsap.to(ring1Ref.current, { rotation:  360, duration:  9, ease: 'none', repeat: -1, delay: 1.35 });
      gsap.to(ring2Ref.current, { rotation: -360, duration: 16, ease: 'none', repeat: -1, delay: 1.35 });
      gsap.to(ring3Ref.current, { rotation:  360, duration: 24, ease: 'none', repeat: -1, delay: 1.35 });

    }, containerRef);

    return () => ctx.revert();
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {phase === 'intro' && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: '#000000',
            perspective: '900px',
            perspectiveOrigin: '50% 50%',
          }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >

          {/* ── Subtle dot grid ── */}
          <div
            ref={gridRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              maskImage:
                'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
            }}
          />

          {/* ── Floating particles ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                }}
                animate={{ y: [0, -22, 0], opacity: [p.opacity, p.opacity * 2.2, p.opacity] }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.92) 100%)',
            }}
          />

          {/* ── Corner brackets ── */}
          {([
            { top: 24, left: 24, bT: true, bL: true },
            { top: 24, right: 24, bT: true, bR: true },
            { bottom: 24, left: 24, bB: true, bL: true },
            { bottom: 24, right: 24, bB: true, bR: true },
          ] as any[]).map((c, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: 20,
                height: 20,
                top: c.top, right: c.right, bottom: c.bottom, left: c.left,
                borderTop:    c.bT ? '1px solid rgba(255,255,255,0.18)' : undefined,
                borderBottom: c.bB ? '1px solid rgba(255,255,255,0.18)' : undefined,
                borderLeft:   c.bL ? '1px solid rgba(255,255,255,0.18)' : undefined,
                borderRight:  c.bR ? '1px solid rgba(255,255,255,0.18)' : undefined,
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
            />
          ))}

          {/* ── Version label (Xi-style micro detail) ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom: 28,
              right: 28,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontWeight: 300,
              fontSize: 9,
              letterSpacing: '0.32em',
              color: 'rgba(255,255,255,0.18)',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            v1.0
          </motion.div>

          {/* ════════════════ 3D SCENE ════════════════ */}
          <div
            ref={sceneRef}
            className="relative flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d', width: 580, height: 460 }}
          >
            {/* Ambient glow behind everything */}
            <div
              ref={glowRef}
              className="absolute pointer-events-none"
              style={{
                width: 420,
                height: 200,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(ellipse at center, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 45%, transparent 70%)',
                filter: 'blur(32px)',
              }}
            />

            {/* ── Ring 1 — outer glow ring ── */}
            <div
              ref={ring1Ref}
              className="absolute pointer-events-none"
              style={{
                width: 480,
                height: 480,
                top: '50%', left: '50%',
                marginTop: -240, marginLeft: -240,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.13)',
                boxShadow:
                  '0 0 0 1px rgba(255,255,255,0.03), inset 0 0 40px rgba(255,255,255,0.02)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Bright orbital dot */}
              <div style={{
                position: 'absolute',
                top: '50%', left: 0,
                width: 5, height: 5,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 0 14px 5px rgba(255,255,255,0.45)',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>

            {/* ── Ring 2 — mid ── */}
            <div
              ref={ring2Ref}
              className="absolute pointer-events-none"
              style={{
                width: 358,
                height: 358,
                top: '50%', left: '50%',
                marginTop: -179, marginLeft: -179,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.09)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                width: 4, height: 4,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.82)',
                boxShadow: '0 0 10px 3px rgba(255,255,255,0.34)',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>

            {/* ── Ring 3 — inner subtle ── */}
            <div
              ref={ring3Ref}
              className="absolute pointer-events-none"
              style={{
                width: 240,
                height: 240,
                top: '50%', left: '50%',
                marginTop: -120, marginLeft: -120,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.055)',
                transformStyle: 'preserve-3d',
              }}
            />

            {/* ══════ LOGO BLOCK ══════ */}
            <div
              ref={logoWrapRef}
              className="relative flex flex-col items-center"
              style={{ zIndex: 10 }}
            >
              <div className="flex items-center" style={{ gap: 20 }}>

                {/* Left accent line */}
                <div
                  ref={lineLeftRef}
                  style={{
                    width: 68,
                    height: 1,
                    background:
                      'linear-gradient(to left, rgba(255,255,255,0.62), transparent)',
                    transformOrigin: 'right center',
                  }}
                />

                {/* Logo — clip container for scan + shimmer */}
                <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 1 }}>

                  {/* Scan line */}
                  <div
                    ref={scanRef}
                    style={{
                      position: 'absolute',
                      left: 0, right: 0, top: 0,
                      height: 2,
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.98), transparent)',
                      filter: 'blur(1px)',
                      zIndex: 20,
                    }}
                  />

                  {/* Shimmer */}
                  <div
                    ref={shimmerRef}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '52%',
                      background:
                        'linear-gradient(108deg, transparent 10%, rgba(255,255,255,0.18) 50%, transparent 90%)',
                      zIndex: 15,
                    }}
                  />

                  {/* Logo text */}
                  <div
                    ref={logoTextRef}
                    style={{
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 100,
                      fontSize: 'clamp(46px, 9vw, 88px)',
                      letterSpacing: '0.22em',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      userSelect: 'none',
                      transformOrigin: 'center center',
                    }}
                  >
                    {logoText}
                  </div>
                </div>

                {/* Right accent line */}
                <div
                  ref={lineRightRef}
                  style={{
                    width: 68,
                    height: 1,
                    background:
                      'linear-gradient(to right, rgba(255,255,255,0.62), transparent)',
                    transformOrigin: 'left center',
                  }}
                />
              </div>

              {/* Underline */}
              <div
                ref={underlineRef}
                style={{
                  width: '100%',
                  height: 1,
                  marginTop: 8,
                  background:
                    'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
                  transformOrigin: 'left center',
                }}
              />

              {/* Tagline */}
              <div
                ref={taglineRef}
                style={{
                  marginTop: 17,
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(8px, 1.05vw, 11px)',
                  letterSpacing: '0.46em',
                  color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                Enter The Experience
              </div>
            </div>
          </div>
          {/* ════════════════ END SCENE ════════════════ */}

          {/* ── Progress bar ── */}
          <div
            className="absolute bottom-10 left-1/2"
            style={{
              width: 100,
              height: 1,
              transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'rgba(255,255,255,0.45)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4.8, ease: [0.22, 0.1, 0.2, 1] }}
            />
          </div>

          {/* ── Black exit flash ── */}
          <div
            ref={flashRef}
            className="absolute inset-0 pointer-events-none"
            style={{ background: '#000000', opacity: 0, zIndex: 200 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};