"use client";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  disableAnimation?: boolean;
  weight?: "light" | "medium" | "heavy";
}

export default function FloatingCard({ 
  children, 
  delay = 0, 
  className = "",
  disableAnimation = false,
  weight = "medium"
}: FloatingCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getFloatingParams = () => {
    switch (weight) {
      case "light": return { y: -15, duration: 2.5 };
      case "heavy": return { y: -5, duration: 4 };
      default: return { y: -10, duration: 3 };
    }
  };

  const { y, duration } = getFloatingParams();

  if (!isMounted || disableAnimation) {
    return (
        <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-lg shadow-xl ${className}`}>
          {children}
        </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [0, y, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.05} 
        scale={1.01}
        className={`backdrop-blur-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-colors duration-300 rounded-xl shadow-lg h-full ${className}`}
      >
        {children}
      </Tilt>
    </motion.div>
  );
}

