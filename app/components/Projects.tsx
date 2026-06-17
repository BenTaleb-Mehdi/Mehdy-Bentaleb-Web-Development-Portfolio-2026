// components/Projects.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon, PlayIcon, CloseIcon } from './Icons';
import { useLanguage } from '@/context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedProject]);

  return (
    <section id="work" className="py-24 px-6 md:px-24 max-w-7xl mx-auto border-t border-gray-100">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-light mb-16 text-[#111111] tracking-tight">
        {t.sections.selectedWorks}
      </motion.h2>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {t.projects.map((project, index) => (
          <motion.div 
            key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-[16/10] bg-[#F9F9FB] border border-gray-200 shadow-sm rounded-[2rem] mb-6 overflow-hidden relative flex items-center justify-center p-3 sm:p-4 transition-colors group-hover:border-gray-300">
               <img 
                 src={project.coverImage} 
                 alt={project.title} 
                 className="w-full h-full object-contain object-center rounded-xl group-hover:scale-105 transition-transform duration-700 shadow-sm border border-gray-100/50" 
                 onError={(e) => { e.currentTarget.style.display = 'none'; }} 
               />
               <div className="absolute inset-0 bg-[#111111]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="bg-white/95 backdrop-blur-md text-[#111111] px-6 py-3 rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-gray-100">
                   {t.sections.viewDetails}
                 </span>
               </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#111111] mb-2">{project.title}</h3>
              <p className="text-[#737373] font-light text-base">{project.shortDescription}</p>
            </div>
          </motion.div>
        ))}
      </div>

      
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#111111]/40 backdrop-blur-md"
            onClick={() => setSelectedProject(null)} 
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-y-auto relative flex flex-col"
              onClick={(e) => e.stopPropagation()} 
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-[#111111] rounded-full transition-colors z-10">
                <CloseIcon className="w-6 h-6"/>
              </button>

              <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                
                <div className="space-y-6 order-2 lg:order-1">
                  {selectedProject.gallery?.map((img: string, i: number) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 bg-[#F9F9FB] aspect-[4/3] flex items-center justify-center p-2">
                      <img src={img} alt={`${selectedProject.title} screenshot ${i+1}`} className="w-full h-full object-contain object-center rounded-xl shadow-sm" 
                        onError={(e) => { e.currentTarget.src = "[https://via.placeholder.com/800x600.png?text=Project+Screenshot](https://via.placeholder.com/800x600.png?text=Project+Screenshot)"; }}
                      />
                    </div>
                  ))}
                </div>

                {/* Right Side: Information (Order-1 in Mobile) */}
                <div className="relative order-1 lg:order-2">
                  <div className="sticky top-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-6">{selectedProject.title}</h2>
                    <p className="text-lg text-[#737373] font-light leading-relaxed mb-8">
                      {selectedProject.longDescription}
                    </p>

                    <div className="mb-10">
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">{t.sections.technologies}</h4>
                      <div className="flex flex-col gap-4">
                        {Object.entries(selectedProject.techStack || {}).map(([category, techs]) => (
                          <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-sm font-medium text-[#111111] w-20">{category}:</span>
                            <div className="flex gap-2 flex-wrap">
                              {(techs as string[]).map((t, i) => (
                                <span key={i} className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">{t}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                      
                      
                      {selectedProject.links?.demo ? (
                        <a href={selectedProject.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                          {selectedProject.links.demo.includes('vimeo') || selectedProject.links.demo.includes('youtube') ? <PlayIcon className="w-4 h-4"/> : <ExternalLinkIcon className="w-4 h-4"/>}
                          {t.sections.livePreview}
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 bg-gray-100 text-gray-400 px-6 py-3 rounded-xl text-sm font-medium cursor-not-allowed border border-gray-200">
                          <ExternalLinkIcon className="w-4 h-4 opacity-50"/>
                          {t.sections.noDemo}
                        </span>
                      )}

                      
                      {selectedProject.links?.github ? (
                        <a href={selectedProject.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white border border-gray-200 text-[#111111] px-6 py-3 rounded-xl text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors">
                          <GithubIcon className="w-4 h-4"/> {t.sections.sourceCode}
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 bg-white border border-gray-100 text-gray-300 px-6 py-3 rounded-xl text-sm font-medium cursor-not-allowed">
                          <GithubIcon className="w-4 h-4 opacity-50"/> {t.sections.privateCode}
                        </span>
                      )}

                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}