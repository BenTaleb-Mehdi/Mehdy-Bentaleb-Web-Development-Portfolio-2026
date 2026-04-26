import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { TechStack } from './components/sections/TechStack';
import { ProjectGrid } from './components/sections/ProjectGrid';
import { HorizontalParallax } from './components/sections/HorizontalParallax';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import ScrollVelocity from './components/reactbits/ScrollVelocity';
import ClickSpark from './components/reactbits/ClickSpark';
import { Chatbot } from './components/ui/Chatbot';
import { CustomCursor } from './components/ui/CustomCursor';
import { SplashCursor } from './components/ui/SplashCursor';
import { LuxIntro } from './components/ui/LuxIntro';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { SpeedDial } from './components/ui/SpeedDial';
import { ContactModal } from './components/ui/ContactModal';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Bot, Mail, Instagram, Linkedin, Github } from 'lucide-react';
import portfolioData from './data/portfolio.json';
import { motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const socials = portfolioData.navigation.socialItems;
  const speedDialActions = [
    { name: 'Contact', icon: <Mail size={20} />, onClick: () => setIsContactModalOpen(true) },
    { name: 'GitHub', icon: <Github size={20} />, href: socials.find(s => s.label === 'GitHub')?.link },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: socials.find(s => s.label === 'LinkedIn')?.link },
    { name: 'Instagram', icon: <Instagram size={20} />, href: socials.find(s => s.label === 'Instagram')?.link }
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <ClickSpark 
      sparkColor="#bbbbbbff" 
      sparkCount={12} 
      sparkRadius={25} 
      duration={400}
    >
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-green selection:text-brand-dark transition-colors duration-500">
        {isLoading && <LuxIntro onLoadingComplete={() => setIsLoading(false)} />}
        
        <div style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.8s ease' 
        }}>
          <SplashCursor />
          <CustomCursor />
          <Navbar />
          <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
          
          {/* Standalone AI Chatbot Toggle on Left */}
          <motion.button
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-[80] w-14 h-14 bg-foreground text-background shadow-xl rounded-full flex items-center justify-center focus:outline-none pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot size={24} className="stroke-2" />
          </motion.button>
          
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          <SpeedDial actions={speedDialActions} />
          <ScrollToTop />
        
          {/* 1px border lines container globally applied to sections via their individual border-b styles */}
          <main className="w-full">
            <Hero />
            
            <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
              <About />
              <TechStack />
            </div>

            <div className="py-20 overflow-hidden">
              <ScrollVelocity 
                texts={['Design Driven Development', 'Creative Engineering']} 
                velocity={100} 
                className="text-muted-foreground uppercase italic font-black"
              />
            </div>

            <ProjectGrid />

            <div className="py-20 overflow-hidden">
              <ScrollVelocity 
                texts={['Impactful Experiences', 'Pixel Perfect Solutions']} 
                velocity={-100} 
                className="text-foreground/5 uppercase font-black"
              />
            </div>

            <HorizontalParallax />

            <Experience />
            <Education />

            <div className="max-w-6xl mx-auto px-6 md:px-12 w-full border-b border-border">
              <FAQ />
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
              <Contact />
            </div>
          </main>
          
          <footer className="py-12 text-center text-sm font-medium text-muted-foreground border-t border-border flex flex-col items-center gap-6">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-3 bg-foreground text-background rounded-full font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Mail size={16} /> Open Contact Form
            </button>
            <p>&copy; {new Date().getFullYear()} Mehdy Bentaleb. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ClickSpark>
  );
}

export default App;
