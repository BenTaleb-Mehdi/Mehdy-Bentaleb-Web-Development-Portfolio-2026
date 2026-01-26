"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a192f] overflow-hidden">
      <motion.div
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ 
            opacity: [0.5, 1, 0.5], 
            scale: [0.85, 1, 0.85],
         }}
         transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
         }}
         className="relative"
      >
        <img 
            src="/hero-logo.png" 
            alt="Loading..." 
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
      </motion.div>
    </div>
  );
}
