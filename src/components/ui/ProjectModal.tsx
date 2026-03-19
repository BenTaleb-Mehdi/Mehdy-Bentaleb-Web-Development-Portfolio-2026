import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Play, Calendar, Cpu } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    fullDescription?: string;
    type: string;
    year: string;
    image?: string;
    bgClass: string;
    stack?: string[];
    demoUrl?: string;
    codeUrl?: string;
    videoUrl?: string;
  } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-black border border-zinc-800 rounded-3xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Left: Image/Video Preview */}
            <div className="md:w-1/2 relative bg-zinc-900 overflow-hidden min-h-[300px] md:min-h-full">
              <div className={`absolute inset-0 ${project.bgClass} opacity-40`} />
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover relative z-10" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 p-12 text-center">
                   <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                     <Play size={32} className="opacity-40" />
                   </div>
                   <p className="text-xs font-mono uppercase tracking-widest opacity-40">Project Preview Placeholder</p>
                </div>
              )}
              
              {project.videoUrl && (
                <div className="absolute bottom-8 left-8 z-20">
                    <a 
                      href={project.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-brand-green text-black font-bold rounded-full hover:scale-105 transition-transform"
                    >
                        <Play size={18} fill="currentColor" />
                        WATCH VIDEO DEMO
                    </a>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.65rem] font-mono tracking-widest text-brand-green uppercase py-1 px-3 border border-brand-green/30 rounded-full">
                  {project.type}
                </span>
                <span className="text-[0.65rem] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                  <Calendar size={12} />
                  {project.year}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-8">
                {project.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">About the Project</h4>
                  <p className="text-zinc-400 leading-relaxed text-lg font-light">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {project.stack && (
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4 flex items-center gap-2">
                       <Cpu size={14} />
                       Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                      LIVE DEMO
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.codeUrl && (
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors"
                    >
                      SOURCE CODE
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
