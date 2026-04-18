import { motion } from 'framer-motion';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function CustomButton({ children, onClick, className = '' }: CustomButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`px-6 py-3 rounded-xl border border-border text-sm font-medium text-foreground bg-background hover:bg-muted transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
