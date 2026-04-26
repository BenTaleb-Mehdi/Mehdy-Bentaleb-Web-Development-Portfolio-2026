import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Play, Calendar, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    images?: string[];
    bgClass: string;
    stack?: string[];
    demoUrl?: string;
    codeUrl?: string;
    videoUrl?: string;
  } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Reset index when modal opens or project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsZoomed(false);
    setZoomedImage(null);
  }, [project, isOpen]);

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

  const images = project.images || (project.image ? [project.image] : []);
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-background border border-border rounded-3xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Left: Image/Video Preview */}
            <div className="md:w-1/2 relative bg-muted overflow-hidden min-h-[300px] md:min-h-full flex items-center justify-center border-r border-border">
              <div className={`absolute inset-0 ${project.bgClass} opacity-40`} />
              
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => {
                        setZoomedImage(images[currentImageIndex]);
                        setIsZoomed(true);
                      }}
                      className="w-full h-full object-cover relative z-10 cursor-zoom-in"
                    />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center mb-4">
                      <Play size={32} className="opacity-40" />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-widest opacity-40">Project Preview Placeholder</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Carousel Controls */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 z-20 p-2 bg-background/50 hover:bg-background/70 rounded-full text-foreground transition-all border border-border/10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 z-20 p-2 bg-background/50 hover:bg-background/70 rounded-full text-foreground transition-all border border-border/10"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex 
                            ? "bg-brand-green w-6" 
                            : "bg-foreground/30 hover:bg-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {project.videoUrl && (
                <div className="absolute bottom-16 left-8 z-20">
                    <a 
                      href={project.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-brand-green text-black font-bold rounded-full hover:scale-105 transition-transform text-sm"
                    >
                        <Play size={16} fill="currentColor" />
                        WATCH VIDEO DEMO
                    </a>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.65rem] font-mono tracking-widest text-brand-green uppercase py-1 px-3 border border-brand-green/50 rounded-full">
                  {project.type}
                </span>
                <span className="text-[0.65rem] font-mono tracking-widest text-foreground/60 dark:text-muted-foreground uppercase flex items-center gap-1.5">
                  <Play size={12} className="opacity-40" />
                  {project.year}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-8">
                {project.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-foreground/40 dark:text-muted-foreground uppercase mb-4">About the Project</h4>
                  <p className="text-foreground/80 dark:text-muted-foreground leading-relaxed text-lg font-light">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {project.stack && (
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-2">
                       <Cpu size={14} />
                       Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground/70 dark:text-muted-foreground font-medium">
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
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity"
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
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-muted text-foreground font-bold rounded-xl border border-border hover:bg-accent transition-colors"
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

      {/* Zoom Overlay */}
      <AnimatePresence>
        {isZoomed && zoomedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <motion.img
              src={zoomedImage}
              alt="Zoomed Project"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative z-10 max-w-full max-h-full object-contain shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
