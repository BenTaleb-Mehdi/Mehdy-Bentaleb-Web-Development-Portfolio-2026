// components/Experience.tsx
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Experience() {
  const { t, language } = useLanguage();

  // Dictionnaire local sghir lil-titles static dyal had lsection
  const localTexts = {
    en: {
      experience: "Experience.",
      expertise: "Expertise."
    },
    fr: {
      experience: "Expérience.",
      expertise: "Expertise."
    },
    es: {
      experience: "Experiencia.",
      expertise: "Habilidades."
    }
  };

  const text = localTexts[language] || localTexts.en;

  return (
    <section id="expertise" className="py-24 px-6 md:px-24 max-w-7xl mx-auto border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        
        {/* LEFT COLUMN: EXPERIENCE */}
        <div>
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light mb-12 text-[#111111] tracking-tight"
          >
            {text.experience}
          </motion.h2>
          <div className="space-y-12">
            {t.experience.map((exp, index) => (
              <motion.div 
                key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l border-gray-200"
              >
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-[6.5px] top-1.5" />
                <p className="text-sm font-medium text-[#737373] mb-1">{exp.duration}</p>
                <h3 className="text-lg font-semibold text-[#111111]">{exp.role}</h3>
                <p className="text-[#111111] mb-3 font-medium">{exp.company}</p>
                <p className="text-[#737373] font-light text-sm leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: EXPERTISE / SKILLS */}
        <div>
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light mb-12 text-[#111111] tracking-tight"
          >
            {text.expertise}
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {t.skills.map((skill, index) => (
              <motion.span
                key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className="bg-white text-[#111111] px-5 py-2.5 text-sm font-medium rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-colors duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}