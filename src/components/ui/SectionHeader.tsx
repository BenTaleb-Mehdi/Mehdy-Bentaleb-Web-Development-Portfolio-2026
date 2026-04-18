import { motion } from 'framer-motion';
import BlurText from '../reactbits/BlurText';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-12 ${className}`}
    >
      <div className="text-[0.65rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase mb-3">
        {subtitle}
      </div>
      <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">
        <BlurText text={title} delay={50} animateBy="words" />
      </h2>
    </motion.div>
  );
}
