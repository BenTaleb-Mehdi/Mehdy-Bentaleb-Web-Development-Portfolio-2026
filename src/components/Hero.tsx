"use client";
import portfolioData from "../../data/portfolio.json";
import FloatingCard from "./FloatingCard";
import Magnetic from "./Magnetic";

interface HeroProps {
    onTriggerTerminal: () => void;
}

export default function Hero({ onTriggerTerminal }: HeroProps) {
  const { profile } = portfolioData;

  return (
    <section className="flex flex-col items-center lg:items-start space-y-6 py-0 lg:py-0">
      <FloatingCard delay={0} className="w-full p-3 relative !bg-transparent !border-none !shadow-none overflow-hidden" weight="heavy">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>
        
        <div className="space-y-4 relative z-10">
          <h2 className="text-accent font-mono text-lg">Hi, my name is</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-200 tracking-tight">
            {profile.name}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-400">
            {profile.role}
          </h2>
          <p className="max-w-xl text-slate-400 text-lg leading-relaxed mt-4">
            {profile.bio}
          </p>

          <div className="flex gap-4 pt-8">
            <Magnetic>
              <button 
                 onClick={onTriggerTerminal}
                 className="px-6 py-3 border border-accent text-accent rounded hover:bg-accent/10 transition-colors font-mono"
              >
                Check out my work!
              </button>
            </Magnetic>
          </div>
        </div>
      </FloatingCard>
    </section>
  );
}
