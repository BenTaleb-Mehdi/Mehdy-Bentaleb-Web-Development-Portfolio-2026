import { motion } from 'framer-motion';
import BlurText from '../reactbits/BlurText';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12"
    >
      <div className="text-[0.65rem] font-semibold tracking-[0.1em] text-zinc-500 uppercase mb-3">
        {subtitle}
      </div>
      <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
        <BlurText text={title} delay={50} animateBy="words" />
      </h2>
    </motion.div>
  );
}
