import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from '../reactbits/CountUp';
import ShinyText from '../reactbits/ShinyText';
import portfolioData from '../../data/portfolio.json';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Optional: add any logic to ensure all assets are loaded
    // For now, we use a fixed duration as per the plan
  }, []);

  const handleEnd = () => {
    // Delay slightly to show 100% for a moment
    setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 1000); // Match exit animation duration
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background Grid Pattern (Subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)',
                 backgroundSize: '32px 32px' 
               }} 
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-24 h-24 border border-zinc-800 flex items-center justify-center relative">
                <div className="absolute inset-0 border border-brand-green/30 animate-pulse" />
                <span className="text-4xl font-black text-white italic">
                  {portfolioData.profile.logoText}
                </span>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-green" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-green" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-green" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-green" />
              </div>
            </motion.div>

            {/* Name/Loading Text */}
            <div className="text-center mb-12">
              <ShinyText 
                text={portfolioData.profile.name.toUpperCase()} 
                className="text-xl md:text-2xl font-black tracking-widest block mb-2"
                speed={1.5}
                color="#71717a"
                shineColor="#ffffff"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.3em] font-medium"
              >
                Initializing Digital Core • Portfolio 2026
              </motion.p>
            </div>

            {/* Progress Container */}
            <div className="w-64 relative">
              <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">Loading System</span>
                 <div className="text-2xl font-black text-white italic leading-none">
                   <CountUp
                     from={0}
                     to={100}
                     duration={2.5}
                     onEnd={handleEnd}
                     className="tabular-nums"
                   />
                   <span className="text-xs ml-1">%</span>
                 </div>
              </div>
              
              {/* Progress Bar Track */}
              <div className="h-[2px] w-full bg-zinc-900 overflow-hidden relative">
                {/* Moving Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-brand-green shadow-[0_0_10px_#bef264]"
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="absolute bottom-10 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 mb-4"
            >
              <div className="w-1 h-1 bg-brand-green rounded-full animate-ping" />
              <div className="w-1 h-1 bg-zinc-800 rounded-full" />
              <div className="w-1 h-1 bg-zinc-800 rounded-full" />
            </motion.div>
            <p className="text-[8px] text-zinc-700 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} MB Environment v1.0.4
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
