import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CustomButton } from '../ui/CustomButton';
import { ResumeModal } from '../ui/ResumeModal';
import BlurText from '../reactbits/BlurText';
import ShinyText from '../reactbits/ShinyText';
import Magnet from '../reactbits/Magnet';
import Particles from '../reactbits/Particles';
import portfolioData from '../../data/portfolio.json';

export function Hero() {
  const { profile } = portfolioData;
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Spotlight position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXVal = event.clientX - rect.left;
      const mouseYVal = event.clientY - rect.top;
      
      // Update spotlight
      mouseX.set(mouseXVal);
      mouseY.set(mouseYVal);

      // Update tilt
      const xPct = (mouseXVal / width) - 0.5;
      const yPct = (mouseYVal / height) - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, x, y]);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative pt-24 pb-20 md:pt-30 md:pb-24 flex flex-col justify-center min-h-[100vh] border-b border-border overflow-hidden bg-background cursor-default"
    >
      {/* Interactive Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Particles */}
        <Particles
          particleCount={150}
          particleSpread={12}
          speed={0.15}
          particleColors={['#a1a1aa', '#71717a', '#52525b']}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
          alphaParticles={true}
          className="opacity-40"
        />
        
        {/* Spotlight Follow */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(161, 161, 170, 0.12), transparent 40%)`
            )
          }}
        />

        {/* Global Grid with Radial Fade */}
        <div 
          className="absolute inset-0 opacity-[0.12] z-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgb(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--foreground) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '4.5rem 4.5rem'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnet padding={80} magnetStrength={3}>
            <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-border bg-muted backdrop-blur-md text-xs font-semibold tracking-wide shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <ShinyText 
                text={profile.availability === "Full-time / Projects" ? "AVAILABLE FOR WORK" : profile.availability.toUpperCase()} 
                speed={4}
                className="tracking-[0.15em] text-muted-foreground"
              />
            </div>
          </Magnet>

          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-display font-bold tracking-tighter text-foreground mb-8 leading-[0.9] drop-shadow-2xl break-words max-w-4xl">
            <BlurText 
              text={profile.tagline} 
              delay={50} 
              animateBy="words" 
              className="inline-block"
            />
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl lg:text-2xl text-muted-foreground mb-14 leading-relaxed font-light font-display">
            {profile.role} specializing in High-End Creative Portfolios. <br className="hidden md:block" />
            Crafting digital experiences that feel as good as they look.
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <Magnet padding={50} magnetStrength={3}>
              <CustomButton className="px-10 py-5 text-lg font-semibold group shadow-[0_10px_40px_-10px_rgba(var(--foreground),0.1)]">
                Start a project
              </CustomButton>
            </Magnet>
            
            <Magnet padding={50} magnetStrength={3}>
              <CustomButton 
                onClick={() => setIsResumeModalOpen(true)}
                className="bg-transparent border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-muted-foreground/30 px-10 py-5 text-lg transition-all duration-300"
              >
                View Resume
              </CustomButton>
            </Magnet>
          </div>
        </motion.div>
      </div>

      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
        resumePaths={{
          en: profile.resumeEn,
          fr: profile.resumeFr
        }}
      />

      {/* Hero Bottom Signature */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-forwards pointer-events-none">
        <span>Curated for Mehdi</span>
        <div className="w-12 h-[1px] bg-border" />
        <span>Portfolio ©2026</span>
      </div>
    </section>
  );
}
