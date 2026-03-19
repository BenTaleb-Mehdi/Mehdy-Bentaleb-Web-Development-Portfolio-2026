import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Globe, Eye, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumePaths: {
    en: string;
    fr: string;
  };
}

export function ResumeModal({ isOpen, onClose, resumePaths }: ResumeModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<'en' | 'fr' | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset selection when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setSelectedVersion(null), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className={`relative w-full ${selectedVersion ? 'max-w-5xl' : 'max-w-3xl'} max-h-[90dvh] bg-black border border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 shadow-2xl`}
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-4">
                {selectedVersion && (
                  <button 
                    onClick={() => setSelectedVersion(null)}
                    className="p-2 hover:bg-zinc-900 rounded-full text-zinc-500 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-green/10 rounded-lg">
                    <FileText size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {selectedVersion ? `Resume — ${selectedVersion.toUpperCase()}` : 'Curriculum Vitae'}
                    </h3>
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">Mehdi Bentaleb</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-zinc-900/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className={`relative flex-1 flex flex-col min-h-0 ${selectedVersion ? 'overflow-hidden' : 'overflow-y-auto md:overflow-y-hidden'}`}>
              <AnimatePresence mode="wait">
                {!selectedVersion ? (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-8 md:p-16 flex flex-col items-center justify-center gap-8 md:gap-12 text-center pb-12"
                  >
                    <div className="max-w-sm space-y-4">
                      <h4 className="text-3xl font-display font-medium text-white tracking-tight">Select Version</h4>
                      <p className="text-sm text-zinc-500 font-light leading-relaxed">
                        I maintain versions in both languages. View directly in your browser or download for offline access.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                      {[
                        { id: 'en', label: 'English', sub: 'International', icon: <Globe size={28} /> },
                        { id: 'fr', label: 'French', sub: 'European', icon: <span className="text-2xl font-bold">FR</span> }
                      ].map((ver) => (
                        <div key={ver.id} className="group relative p-8 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                          <div className="flex flex-col items-center mb-8">
                            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl mb-4 group-hover:scale-110 transition-transform text-zinc-500 group-hover:text-brand-green">
                              {ver.icon}
                            </div>
                            <h5 className="text-xl font-bold text-white">{ver.label}</h5>
                            <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mt-1">{ver.sub}</span>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <button 
                              onClick={() => setSelectedVersion(ver.id as 'en' | 'fr')}
                              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-green/10 text-brand-green border border-brand-green/20 font-bold text-sm rounded-xl hover:bg-brand-green hover:text-black transition-all"
                            >
                              <Eye size={16} />
                              VIEW PREVIEW
                            </button>
                            <a 
                              href={ver.id === 'en' ? resumePaths.en : resumePaths.fr} 
                              download 
                              className="flex items-center justify-center gap-2 w-full py-3.5 bg-zinc-900 text-zinc-300 font-bold text-sm rounded-xl border border-zinc-800 hover:bg-white hover:text-black transition-all"
                            >
                              <Download size={16} />
                              DOWNLOAD PDF
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col min-h-0 bg-zinc-950"
                  >
                    <div className="flex-1 p-4 md:p-8 overflow-hidden">
                      <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800">
                        <iframe 
                          src={`${selectedVersion === 'en' ? resumePaths.en : resumePaths.fr}#view=FitH&toolbar=0&navpanes=0`} 
                          className="w-full h-[60vh] md:h-[70vh] border-none"
                          title="Resume Preview"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 border-t border-zinc-900 flex justify-center bg-zinc-950/80 backdrop-blur-md">
                       <a 
                        href={selectedVersion === 'en' ? resumePaths.en : resumePaths.fr} 
                        download 
                        className="flex items-center gap-3 px-12 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-2xl group"
                      >
                        <Download size={18} className="transition-transform group-hover:-translate-y-1" />
                        DOWNLOAD AS PDF
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
