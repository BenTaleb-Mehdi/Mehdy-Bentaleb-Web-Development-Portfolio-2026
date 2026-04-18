import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-black border border-zinc-900 rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-900">
                <h3 className="text-xl font-display font-medium text-white">Get In Touch</h3>
                <button
                  onClick={onClose}
                  className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Message Sent</h4>
                      <p className="text-zinc-500 text-sm">I'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-zinc-500">Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-zinc-500">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-medium text-zinc-500">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                        placeholder="How can I help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 w-full bg-white text-black font-medium py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
