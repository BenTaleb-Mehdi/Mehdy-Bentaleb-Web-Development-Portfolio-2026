import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';

import portfolioData from '../../data/portfolio.json';

const experiences = portfolioData.experience;

export function Experience() {
  return (
    <section id="experience" className="py-32 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <SectionHeader 
              title="Experience" 
              subtitle="Work History" 
            />
          </div>
          
          <div className="lg:col-span-8">
            <div className="flex flex-col border-t border-zinc-900">
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col md:flex-row py-10 border-b border-zinc-900 transition-colors duration-500 hover:bg-zinc-900/10 cursor-default"
                >
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <span className="text-[0.65rem] font-mono tracking-widest text-zinc-500 uppercase">{exp.period}</span>
                    <h3 className="text-xl font-medium text-white mt-2 group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-12">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-zinc-300">@{exp.company}</span>
                    </div>
                    <p className="text-zinc-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <a 
                href={(portfolioData.profile as any).resumeEn} 
                download
                className="inline-flex items-center text-sm font-medium text-white group"
              >
                Download Resume
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
