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
      className={`px-6 py-3 rounded-xl border border-zinc-800 text-sm font-medium text-white hover:bg-zinc-900 transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
