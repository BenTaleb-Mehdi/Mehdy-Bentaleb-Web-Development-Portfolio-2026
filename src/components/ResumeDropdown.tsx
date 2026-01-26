"use client";
import React, { useState, useRef, useEffect } from "react";
import { Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

interface ResumeDropdownProps {
  resumeEn: string;
  resumeFr: string;
  onViewResume: (url: string) => void;
}

export default function ResumeDropdown({ resumeEn, resumeFr, onViewResume }: ResumeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Magnetic>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-6 py-3 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 rounded transition-all font-mono group ${isOpen ? 'bg-slate-800 border-accent/50 text-accent' : ''}`}
        >
          <span>Resume</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </Magnetic>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-[#1e293b] border border-slate-700 shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          >
            <div className="py-2">
                 {/* English Section */}
                <div className="px-4 py-2 flex items-center justify-between border-b border-slate-700/50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">English</span>
                    <div className="flex gap-2">
                         <button onClick={() => { onViewResume(resumeEn); setIsOpen(false); }} title="View" className="p-1 hover:text-accent text-slate-300 transition-colors"><Eye size={14} /></button>
                         <a href={resumeEn} download onClick={() => setIsOpen(false)} title="Download" className="p-1 hover:text-accent text-slate-300 transition-colors"><Download size={14} /></a>
                    </div>
                </div>

                 {/* French Section */}
                <div className="px-4 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">French</span>
                    <div className="flex gap-2">
                         <button onClick={() => { onViewResume(resumeFr); setIsOpen(false); }} title="View" className="p-1 hover:text-accent text-slate-300 transition-colors"><Eye size={14} /></button>
                         <a href={resumeFr} download onClick={() => setIsOpen(false)} title="Download" className="p-1 hover:text-accent text-slate-300 transition-colors"><Download size={14} /></a>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
