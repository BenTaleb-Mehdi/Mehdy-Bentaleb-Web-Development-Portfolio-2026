"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Monitor, XCircle, Play, ArrowLeft } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any | null; // Using any for flexibility with json data
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);
    } else {
        document.body.style.overflow = 'unset';
    }

    return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset video state when project changes or modal opens
  useEffect(() => {
      if (isOpen) setShowVideo(false);
  }, [isOpen, project]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container - Wide Layout */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-[#1e293b]/95 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col max-h-[90vh]"
          >
            {/* Window Header (Title Bar) */}
            <div className="h-10 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 justify-between shrink-0 select-none z-20">
              <div className="flex gap-2">
                <button 
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                >
                    <X size={10} className="text-red-900 opacity-0 group-hover:opacity-100" strokeWidth={3} />
                </button>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-mono text-slate-400 absolute left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-70">
                <Monitor size={12} />
                <span>project: {project.title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <div className="w-14"></div>
            </div>

            {/* Split Layout Content */}
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* Left Column: Media Area (55%) */}
              <div className="w-full md:w-[55%] bg-slate-900/50 relative group border-b md:border-b-0 md:border-r border-slate-700/50 flex flex-col">
                 <div className="relative w-full h-64 md:h-full overflow-hidden bg-slate-900">
                     {showVideo && project.demoVideo ? (
                        <div className="w-full h-full relative animate-in fade-in duration-300">
                             <iframe 
                                title="Project Demo"
                                src={project.demoVideo} 
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                             />
                             <button 
                                onClick={() => setShowVideo(false)}
                                className="absolute top-4 left-4 z-20 bg-black/50 hover:bg-black/70 text-slate-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-md border border-white/10 transition-colors"
                             >
                                <ArrowLeft size={14} /> Back to Preview
                             </button>
                        </div>
                     ) : (
                        <>
                             {project.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-sm bg-slate-900">
                                    NO PREVIEW AVAILABLE
                                </div>
                            )}
                            
                            {/* Overlay Gradient (only visible on image mode) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                        </>
                     )}
                 </div>
              </div>

              {/* Right Column: Details (45%) */}
              <div className="w-full md:w-[45%] flex flex-col bg-[#1e293b]/50">
                <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
                    
                    {/* Header */}
                    <div className="mb-6">
                       <h2 className="text-3xl font-bold text-slate-100 mb-3">{project.title}</h2>
                       <p className="text-slate-400 leading-relaxed text-sm md:text-base">{project.description}</p>
                    </div>

                    {/* Quick Actions (Buttons) */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {project.demoVideo && (
                            <button 
                                onClick={() => setShowVideo(true)}
                                className={`flex-1 min-w-[120px] bg-gradient-to-r ${showVideo ? 'from-emerald-600 to-teal-600' : 'from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500'} text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20`}
                            >
                                <Play size={16} fill="currentColor" className={showVideo ? "opacity-50" : ""} /> 
                                {showVideo ? "Watching Demo" : "Watch Demo"}
                            </button>
                        )}
                        <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 min-w-[120px] bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-600 hover:border-slate-500"
                        >
                            <ExternalLink size={16} /> Live Site
                        </a>
                        {project.githubLink && (
                            <a 
                                href={project.githubLink} 
                                target="_blank" 
                                rel="noreferrer"
                                 className="flex-1 min-w-[120px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
                            >
                                <Github size={16} /> Code
                            </a>
                        )}
                    </div>

                    {/* Metrics/Impact */}
                     {project.metrics && (
                        <div className="mb-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Key Features
                            </h3>
                            <p className="text-sm text-emerald-100/90 leading-relaxed">{project.metrics}</p>
                        </div>
                     )}

                    <div className="mt-auto pt-6 border-t border-slate-700/50">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Technologies</h3>
                        <div className="space-y-4">
                            {Object.entries(project.techStack).map(([category, techs]: [string, any]) => (
                                <div key={category}>
                                    <h4 className="text-[10px] font-semibold text-accent/80 mb-2 uppercase">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {techs.map((tech: string) => (
                                            <span key={tech} className="text-xs text-slate-300 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
