import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export interface SpeedDialAction {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
  href?: string;
}

interface SpeedDialProps {
  actions: SpeedDialAction[];
  className?: string;
  radius?: number; // Distance of buttons from center
}

export function SpeedDial({ actions, className = '', radius = 80 }: SpeedDialProps) {
  const [isOpen, setIsOpen] = useState(false);

  // We want to map buttons across a quarter circle (-90deg to 0deg or 180 to 270 depending on position).
  // Assuming it's positioned at bottom-right, standard fab layout:
  // Angle should span from 180deg (left) to 270deg (top).
  // We calculate angle step based on number of actions.
  
  const angleStep = actions.length > 1 ? 90 / (actions.length - 1) : 0;
  // Convert degrees to radians for Math.sin/Math.cos
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 ${className} fab-flower`}>
      <div className="relative flex items-center justify-center w-14 h-14">
        
        <AnimatePresence>
          {isOpen && actions.map((action, index) => {
            // Calculate angle starting from 180 (left) to 270 (top)
            const angleDeg = 180 + (index * angleStep);
            const angleRad = toRadians(angleDeg);
            
            // For a bottom-right aligned speed dial, center is bottom-right.
            // X goes left (negative), Y goes up (negative).
            // Actually, if we use standard unit circle, Math.cos(180) = -1, Math.sin(180) = 0.
            // Math.cos(270) = 0, Math.sin(270) = -1.
            const targetX = Math.round(radius * Math.cos(angleRad));
            const targetY = Math.round(radius * Math.sin(angleRad));

            return (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: targetX, 
                  y: targetY 
                }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
                className="absolute pointer-events-auto"
              >
                {action.href ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-12 h-12 bg-muted text-foreground border border-border shadow-lg rounded-full hover:bg-accent hover:scale-110 transition-transform"
                    aria-label={action.name}
                  >
                    {action.icon}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      if (action.onClick) action.onClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center w-12 h-12 bg-muted text-foreground border border-border shadow-lg rounded-full hover:bg-accent hover:scale-110 transition-transform"
                    aria-label={action.name}
                  >
                    {action.icon}
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 flex items-center justify-center w-14 h-14 bg-foreground text-background shadow-xl rounded-full focus:outline-none pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
             <Plus size={24} className="stroke-2" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
