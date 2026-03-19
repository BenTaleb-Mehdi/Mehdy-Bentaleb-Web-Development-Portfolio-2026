import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import LogoLoop from '../reactbits/LogoLoop';
import portfolioData from '../../data/portfolio.json';
import * as SiIcons from 'react-icons/si';

const techLogos = portfolioData.stack.map(tech => ({
  node: React.createElement((SiIcons as any)[tech.icon]),
  title: tech.title,
  href: tech.href
}));

export function TechStack() {
  return (
    <section id="stack" className="py-24 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <SectionHeader 
          title="Technology Stack" 
          subtitle="Expertise" 
        />
        
        <div className="mt-12 space-y-12">
          <div className="relative group">
            <div className="absolute -inset-x-6 -inset-y-4 bg-zinc-900/0 group-hover:bg-zinc-900/30 rounded-2xl transition-colors duration-500 -z-10" />
            <LogoLoop
              logos={techLogos}
              speed={40}
              direction="left"
              logoHeight={40}
              gap={80}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#000000"
              className="text-white/60 hover:text-white transition-colors duration-500"
            />
          </div>

          <div className="relative group grayscale hover:grayscale-0 transition-all duration-700 opacity-50 hover:opacity-100">
            <LogoLoop
              logos={techLogos}
              speed={-40} // Opposite direction
              direction="left"
              logoHeight={40}
              gap={100}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#000000"
              className="text-zinc-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

