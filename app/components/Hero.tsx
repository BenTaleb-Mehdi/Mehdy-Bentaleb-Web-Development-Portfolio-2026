// components/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();

  // Terjama dyal l-joumla dyalek exact 3la 7sab l-logha mselectionniya
  const localTexts = {
    en: {
      greeting: "Hi, I'm Mehdi.",
      subHeading: "I build robust web applications."
    },
    fr: {
      greeting: "Salut, je suis Mehdi.",
      subHeading: "Je construis des applications web robustes."
    },
    es: {
      greeting: "Hola, soy Mehdi.",
      subHeading: "Construyo aplicaciones web robustas."
    }
  };

  const heroText = localTexts[language] || localTexts.en;

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16 z-10">
        
        {/* LEFT SIDE: Compact Typography */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex-1 flex flex-col items-start">
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase text-gray-400">
              {t.profile.role}
            </span>
          </motion.div>

          {/* HNA FIN ZEDNA L-TRANSLATION DYAL JOUMLA DYALEK 👇 */}
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] leading-[1.15] mb-6">
            {heroText.greeting} <br />
            <span className="text-gray-500 font-light">{heroText.subHeading}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base md:text-lg text-[#737373] font-light leading-relaxed mb-8 max-w-md">
            {t.profile.bio}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-6">
            <Link className="group flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all" href="#work">
              {t.nav.work}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </Link>
            
            <div className="flex items-center gap-4">
              <a href={t.profile.socials.github} target="_blank" className="text-gray-400 hover:text-[#111111] transition-colors p-2">
                <GithubIcon className="w-5 h-5"/>
              </a>
              <a href={t.profile.socials.linkedin} target="_blank" className="text-gray-400 hover:text-[#111111] transition-colors p-2">
                <LinkedinIcon className="w-5 h-5"/>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Compact Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} 
          className="shrink-0 relative"
        >
          <div className="w-48 h-48 md:w-72 md:h-72 relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
            <img 
              src="/images/profile/profile.jpg" 
              alt={t.profile.name} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] rounded-3xl pointer-events-none"></div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-md border border-gray-50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-600">Available</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}