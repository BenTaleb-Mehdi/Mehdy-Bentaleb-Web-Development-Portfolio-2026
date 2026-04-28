import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
// @ts-ignore
import { GridScan } from '../reactbits/GridScan';

interface LuxIntroProps {
  onLoadingComplete: () => void;
  logoText?: string;
}

export const LuxIntro: React.FC<LuxIntroProps> = ({
  onLoadingComplete,
  logoText = 'Mehdi Ben Taleb',
}) => {
  const [phase, setPhase] = useState<'intro' | 'done'>('intro');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // DOM refs for GSAP
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef1 = useRef<HTMLDivElement>(null);
  const ringRef2 = useRef<HTMLDivElement>(null);
  const ringRef3 = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Split logo text dynamically
  const parts = logoText.trim().split(' ');
  const lineA = parts[0] ?? 'MEHDI';
  const lineB = parts.slice(1).join(' ') || 'BEN TALEB';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Minimalist Initial Setup ---
      gsap.set(sceneRef.current, { scale: 0.9, opacity: 0 });
      gsap.set([ringRef1.current, ringRef2.current, ringRef3.current], { 
        rotationX: 90, 
        rotationY: 0,
        opacity: 0,
        scale: 0.5 
      });
      
      // Split text into individual letters for staggered animation
      const chars = gsap.utils.toArray('.min-char');
      gsap.set(chars, { 
        opacity: 0, 
        z: -100,
        rotationX: -90,
        transformOrigin: "50% 50% -50px" 
      });
      
      gsap.set('.subtitle-text', { opacity: 0, y: 20 });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(flashRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setPhase('done');
          setTimeout(onLoadingComplete, 100);
        }
      });

      // 1. Scene fades in softly
      tl.to(sceneRef.current, { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' }, 0.2)

      // 2. Delicate 3D Rings unfold
        .to(ringRef1.current, { rotationX: 20, rotationY: 30, opacity: 0.5, scale: 1, duration: 2.5, ease: 'power3.out' }, 0.5)
        .to(ringRef2.current, { rotationX: -40, rotationY: 15, opacity: 0.3, scale: 1.1, duration: 2.5, ease: 'power3.out' }, 0.6)
        .to(ringRef3.current, { rotationX: 60, rotationY: -25, opacity: 0.15, scale: 1.2, duration: 2.5, ease: 'power3.out' }, 0.7)

      // 3. Staggered, elegant text reveal (flip up from 3D space)
        .to(chars, { 
          opacity: 1, 
          z: 0, 
          rotationX: 0, 
          duration: 1.2, 
          stagger: 0.04, 
          ease: 'back.out(1.2)' 
        }, 1.2)
        
      // 3.5 Subtitle fades in
        .to('.subtitle-text', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 2.0)

      // 4. Subtle, continuous forward drift
        .to(sceneRef.current, { z: 150, duration: 4.0, ease: 'none' }, 2.0)
        
      // Progress line loads quickly
        .to(progressRef.current, { scaleX: 1, duration: 2.5, ease: 'power2.inOut' }, 1.5)

      // 5. Clean, fast exit zoom
        .to(chars, { opacity: 0, z: 200, duration: 0.6, stagger: 0.02, ease: 'power2.in' }, 4.0)
        .to('.subtitle-text', { opacity: 0, z: 200, duration: 0.5, ease: 'power2.in' }, 4.1)
        .to([ringRef1.current, ringRef2.current, ringRef3.current], { scale: 3, opacity: 0, duration: 0.8, ease: 'power3.in' }, 4.2)
        .to(sceneRef.current, { scale: 3, opacity: 0, duration: 0.8, ease: 'power2.in' }, 4.2)
        
      // 6. Flash transition
        .to(flashRef.current, { opacity: 1, duration: 0.2, ease: 'power2.in' }, 4.6);

      // Perpetual slow rotation for the rings
      gsap.to(ringRef1.current, { rotationZ: 360, duration: 20, repeat: -1, ease: 'none' });
      gsap.to(ringRef2.current, { rotationZ: -360, duration: 25, repeat: -1, ease: 'none' });
      gsap.to(ringRef3.current, { rotationZ: 360, duration: 30, repeat: -1, ease: 'none' });

    }, containerRef);

    return () => ctx.revert();
  }, [onLoadingComplete]);

  // Subtle Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (phase !== 'intro') return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10; 
      const y = (e.clientY / window.innerHeight - 0.5) * -10;
      
      gsap.to(sceneRef.current, {
        rotationY: x,
        rotationX: y,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [phase]);

  const renderStaggeredText = (text: string, className: string) => (
    <div className={`flex justify-center items-center ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="min-char inline-block"
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </span>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {phase === 'intro' && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0A0A0E]"
          style={{ perspective: '1000px' }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {/* Subtle Dotted Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-30 z-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* React Bits GridScan WebGL Background */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#2F293A"
              gridScale={0.1}
              scanColor="#FF9FFC"
              scanOpacity={0.4}
              enablePost={true}
              bloomIntensity={0.6}
              chromaticAberration={0.002}
              noiseIntensity={0.01}
            />
          </div>

          {/* Master Scene */}
          <div 
            ref={sceneRef}
            className="relative w-full h-full flex flex-col items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* Minimalist 3D Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              <div 
                ref={ringRef1} 
                className="absolute border border-white/20 rounded-full"
                style={{ width: '40vw', height: '40vw', maxWidth: '500px', maxHeight: '500px' }}
              />
              <div 
                ref={ringRef2} 
                className="absolute border border-white/10 rounded-full"
                style={{ width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px' }}
              />
              <div 
                ref={ringRef3} 
                className="absolute border border-white/5 rounded-full"
                style={{ width: '70vw', height: '70vw', maxWidth: '900px', maxHeight: '900px' }}
              />
            </div>

            {/* Typography */}
            <div className="relative z-10 flex flex-col items-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              {renderStaggeredText(lineA, "font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] text-white")}
              
              {renderStaggeredText(lineB, "font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] text-white mt-1 md:mt-2")}
              
              {/* Subtitle */}
              <div className="mt-6 md:mt-8 subtitle-text">
                 <p className="text-xs sm:text-sm md:text-base text-white/60 tracking-[0.2em] font-light uppercase text-center max-w-sm px-4">
                   Junior Full-Stack Web Developer
                 </p>
              </div>
            </div>

          </div>

          {/* Minimalist Progress Line */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-foreground/10">
            <div ref={progressRef} className="h-full bg-foreground/80" />
          </div>

          {/* Clean Exit Flash */}
          <div ref={flashRef} className="absolute inset-0 bg-[#0A0A0E] pointer-events-none z-50" />

        </motion.div>
      )}
    </AnimatePresence>
  );
};