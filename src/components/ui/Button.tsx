import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-800 disabled:pointer-events-none disabled:opacity-50",
          "h-9 px-4 py-2",
          variant === 'primary' && "bg-white text-black hover:bg-zinc-200",
          variant === 'outline' && "border border-zinc-800 bg-transparent hover:bg-zinc-900 text-white",
          variant === 'ghost' && "hover:bg-zinc-900 hover:text-white text-zinc-400",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
