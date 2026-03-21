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
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ClickSpark 
      sparkColor="#bef264" 
      sparkCount={12} 
      sparkRadius={25} 
      duration={400}
    >
      <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-green selection:text-black">
        <SplashCursor />
        <CustomCursor />
        <Navbar />
        <Chatbot />
      
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
            className="text-zinc-800 uppercase italic font-black"
          />
        </div>

        <ProjectGrid />

        <div className="py-20 overflow-hidden text-zinc-900/10">
          <ScrollVelocity 
            texts={['Impactful Experiences', 'Pixel Perfect Solutions']} 
            velocity={-100} 
            className="text-white/5 uppercase font-black"
          />
        </div>

        <HorizontalParallax />

        <Experience />
        <Education />

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full border-b border-zinc-900">
          <FAQ />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          <Contact />
        </div>
      </main>
      
      <footer className="py-12 text-center text-sm font-medium text-zinc-500 border-t border-zinc-900">
        &copy; {new Date().getFullYear()} Mehdy Bentaleb. All rights reserved.
      </footer>
    </div>
    </ClickSpark>
  );
}

export default App;
