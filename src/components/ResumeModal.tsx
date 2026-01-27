"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}


export default function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    setMounted(true);
    
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);
    } else {
        document.body.style.overflow = 'unset';
    }

    return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[823px] h-[85vh] bg-[#1e293b]/95 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md flex flex-col"
          >
            {/* Header */}
            <div className="h-14 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-6 justify-between shrink-0 select-none z-20">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-accent/10 rounded-lg">
                    <FileText size={18} className="text-accent" />
                 </div>
                 <span className="font-bold text-slate-200 text-sm tracking-wide">MY RESUME</span>
              </div>

              <div className="flex items-center gap-3">
                 <a 
                    href={resumeUrl} 
                    download
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded transition-colors"
                 >
                    <Download size={14} />
                    Download PDF
                 </a>
                 <button 
                    onClick={onClose}
                    className="w-8 h-8 rounded-full hover:bg-slate-700/50 flex items-center justify-center transition-colors text-slate-400 hover:text-red-400"
                >
                    <X size={20} />
                </button>
              </div>
            </div>

            {/* Content (PDF) using react-pdf */}
            <div className="flex-1 bg-slate-900/50 relative overflow-y-auto custom-scrollbar p-6 flex flex-col items-center">
                 <Document
                    file={resumeUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div className="text-accent">Loading PDF...</div>}
                    className="flex flex-col gap-4"
                 >
                    {numPages && Array.from(new Array(numPages), (el, index) => (
                        <Page 
                            key={`page_${index + 1}`} 
                            pageNumber={index + 1} 
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-lg"
                            width={750} // Approximate width to fit in modal
                        />
                    ))}
                 </Document>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
