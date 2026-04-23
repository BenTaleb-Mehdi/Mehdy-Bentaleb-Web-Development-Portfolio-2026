import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';

import portfolioData from '../../data/portfolio.json';

const educationData = (portfolioData as any).education || [];

export function Education() {
  return (
    <section id="education" className="py-32 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <SectionHeader 
              title="Education" 
              subtitle="Academic Background" 
            />
          </div>
          
          <div className="lg:col-span-8">
            <div className="flex flex-col border-t border-border">
              {educationData.map((edu: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col md:flex-row py-10 border-b border-border transition-colors duration-500 hover:bg-muted/10 cursor-default"
                >
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <span className="text-[0.65rem] font-mono tracking-widest text-muted-foreground uppercase">{edu.duration}</span>
                    <h3 className="text-xl font-medium text-foreground mt-2 group-hover:text-foreground transition-colors">
                      {edu.degree}
                    </h3>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-12">
                    <div className="flex items-center gap-2 mb-4">
                      {edu.link ? (
                        <a 
                          href={edu.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm font-medium text-muted-foreground hover:text-brand-green transition-colors"
                        >
                          @{edu.school}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">@{edu.school}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-light leading-relaxed group-hover:text-muted-foreground transition-colors">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
