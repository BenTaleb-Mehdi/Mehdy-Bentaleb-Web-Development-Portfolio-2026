import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Mail, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import portfolioData from '../../data/portfolio.json';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = portfolioData.profile.email;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = portfolioData.navigation.socialItems.map(social => ({
    name: social.label,
    icon: (LucideIcons as any)[social.icon],
    link: social.link
  }));

  return (
    <section id="contact" className="py-32 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col gap-20">
          
          {/* Header Section */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-[0.65rem] font-mono tracking-[0.3em] text-brand-green uppercase"
            >
              <span className="w-8 h-[1px] bg-brand-green"></span>
              GET IN TOUCH
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white leading-none tracking-tight"
            >
              LET’S BUILD <br />
              <span className="text-zinc-800">SOMETHING</span> REAL.
            </motion.h2>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
            
            {/* Contact Actions */}
            <div className="flex flex-col gap-8">
              <p className="text-xl text-zinc-400 font-light max-w-md leading-relaxed">
                Currently available for new projects and interesting collaborations. 
                Drop me a line or find me on socials.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={copyToClipboard}
                  className="group relative flex items-center gap-3 px-8 py-5 bg-white text-black font-bold rounded-2xl hover:bg-brand-green transition-all duration-300"
                >
                  <Mail size={20} />
                  <span>{copied ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
                  {copied ? <Check size={18} className="text-black" /> : <Copy size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                </button>
                
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center justify-center w-16 h-16 border border-zinc-800 rounded-2xl text-white hover:border-white transition-all duration-300"
                >
                  <ExternalLink size={24} />
                </a>
              </div>
            </div>

            {/* Profile Card */}
            <div className="lg:w-[450px]">
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 h-full flex flex-col justify-center">
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-brand-green rounded-full blur-[4px] opacity-60" />
                  </div>
                  <span className="text-[0.65rem] font-mono text-zinc-400 uppercase tracking-[0.2em]">Available for work</span>
                </div>

                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-zinc-800 bg-zinc-800">
                  <img src={portfolioData.profile.profileImg} alt={portfolioData.profile.name} className="w-full h-full object-cover" />
                </div>

                <p className="text-zinc-400 leading-relaxed mb-8 font-light italic">
                  "My inbox is always open. Whether you have a project or just want to say Hi. I would love to hear from you."
                </p>

                <div className="flex items-center gap-6">
                  {socials.map((social) => (
                    <a 
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
