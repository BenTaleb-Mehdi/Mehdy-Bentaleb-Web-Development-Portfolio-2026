// components/Navbar.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GlobeIcon } from './Icons';
import { useLanguage } from '@/context/LanguageContext'; // ZID HADI

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // KHEDDEM HOOK DYAL L-LOGHA
  const { language, setLanguage, t } = useLanguage(); 

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' }
  ] as const;

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
      >
        <div className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative">
          <Link href="/" className="text-sm font-bold tracking-tight text-[#111111] z-50">
            MB.
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#737373]">
            {/* DABA KANKHEDMO B "t.nav..." F BLAST TEXT STATIQUE */}
            <Link href="#about" className="hover:text-[#111111] transition-colors">{t.nav.about}</Link>
            <Link href="#work" className="hover:text-[#111111] transition-colors">{t.nav.work}</Link>
            <Link href="#expertise" className="hover:text-[#111111] transition-colors">{t.nav.expertise}</Link>
            <Link href="#contact" className="hover:text-[#111111] transition-colors">{t.nav.contact}</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 z-50">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#737373] hover:text-[#111111] rounded-full hover:bg-gray-100 transition-colors uppercase"
              >
                <GlobeIcon className="w-4 h-4" />
                <span className="hidden sm:block">{language}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-20 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden flex flex-col py-2"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code); // HNA KANBEDLOU L-LOGHA
                          setIsLangOpen(false);
                        }}
                        className={`text-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'font-bold text-[#111111]' : 'text-gray-500'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href={`mailto:${t.profile.email}`} 
              className="hidden md:block text-sm font-medium text-white bg-[#111111] px-5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-md"
            >
              {t.nav.letsTalk}
            </a>
            
            <button 
              className="md:hidden p-2 text-[#111111]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
                ) : (
                  <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-light text-[#111111]">
              <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
              <Link href="#work" onClick={() => setIsOpen(false)}>Work</Link>
              <Link href="#expertise" onClick={() => setIsOpen(false)}>Expertise</Link>
              <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
              <a 
                href={`mailto:${t.profile.email}`} 
                className="mt-4 text-base font-medium text-white bg-[#111111] px-8 py-3 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}