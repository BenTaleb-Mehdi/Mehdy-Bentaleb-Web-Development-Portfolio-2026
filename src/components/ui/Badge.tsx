import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2",
        variant === 'default' && "border-zinc-800 bg-transparent text-zinc-300",
        variant === 'success' && "border-green-500/20 bg-green-500/10 text-green-400",
        className
      )}
      {...props}
    />
  );
}
