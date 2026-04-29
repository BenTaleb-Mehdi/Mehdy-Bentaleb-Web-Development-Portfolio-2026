import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  type: string;
  year: string;
  description?: string;
  bgClass: string;
  className?: string;
  image?: string;
  demoUrl?: string;
  codeUrl?: string;
  onClick?: () => void;
}

export function ProjectCard({ 
  title, 
  type, 
  year, 
  description,
  bgClass, 
  className = '', 
  image,
  demoUrl,
  codeUrl,
  onClick
}: ProjectCardProps) {
  return (
    <motion.div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-background min-h-[480px] flex flex-col justify-end p-8 cursor-pointer ${className}`}
      whileHover={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background Layer (Moved forward from -z-10) */}
      <div className={`absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110 z-0`}>
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000 bg-gradient-to-br from-brand-green/10 via-transparent to-transparent dark:from-white/5`} />
        <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 ${bgClass}`} />
        {image && (
          <img 
            src={image} 
            alt={title} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity duration-1000" 
          />
        )}
      </div>
      
      {/* Optimized Overlay Gradient (z-10) */}
      <div className="absolute inset-0 bg-background/10 group-hover:bg-background/40 transition-colors duration-500 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-10" />

      {/* Border Glow (z-20) */}
      <div className="absolute inset-0 border border-black/5 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-all duration-1000 z-20 pointer-events-none" />

      {/* Hover Reveal Content (Top) (z-30) */}
      <div className="absolute top-8 left-8 right-8 z-30 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
        {description && (
          <p className="text-sm text-foreground/90 dark:text-foreground font-light leading-relaxed max-w-[90%] drop-shadow-md">
            {description}
          </p>
        )}
        
        <div className="flex gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-foreground text-background rounded-full hover:scale-110 transition-transform shadow-2xl"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {codeUrl && (
            <a 
              href={codeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-muted/60 backdrop-blur-sm border border-border text-foreground rounded-full hover:scale-110 transition-transform shadow-2xl"
              title="View Code"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Static Content (Bottom) (z-30) */}
      <div className="relative z-30 transition-all duration-500 group-hover:-translate-y-2">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-[0.65rem] font-mono tracking-widest text-brand-green uppercase mb-1 drop-shadow-sm">{year}</span>
            <p className="text-sm text-foreground/70 dark:text-muted-foreground font-medium translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-sm">{type}</p>
          </div>
        </div>

        <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight leading-none mb-6 drop-shadow-2xl">
          {title}
        </h3>
        
        <div className="flex items-center text-[0.65rem] font-mono tracking-[0.2em] text-foreground/50 dark:text-muted-foreground group-hover:text-brand-green transition-colors duration-500 drop-shadow-sm">
          <Eye size={12} className="mr-2" />
          VIEW DETAILS
        </div>
      </div>

      {/* Reveal Line (z-40) */}
      <div className="absolute top-0 left-0 h-[3px] w-0 bg-brand-green opacity-80 group-hover:w-full transition-all duration-700 ease-in-out z-40" />
    </motion.div>
  );
}
