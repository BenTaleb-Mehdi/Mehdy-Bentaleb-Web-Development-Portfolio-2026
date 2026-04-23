import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import portfolioData from '../../data/portfolio.json';

const faqs = portfolioData.faqs;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Side: Title */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest text-brand-green uppercase">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
              FAQS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6">
              Have<br/>
              <span className="text-muted-foreground">Questions?</span>
            </h2>
          </motion.div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              
              return (
                <div 
                  key={idx} 
                  className="bg-muted/40 border border-border rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <div className="px-6 py-5 flex items-center justify-between">
                    <h3 className="text-base font-medium text-foreground flex items-center gap-3">
                      <span className="text-brand-muted">{faq.num}</span> {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-brand-muted"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-brand-muted text-sm leading-relaxed border-t border-border mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
