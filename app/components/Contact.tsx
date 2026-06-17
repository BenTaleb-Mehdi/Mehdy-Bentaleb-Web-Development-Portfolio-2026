// components/Contact.tsx
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();

  // Dictionnaire local sghir lil-headlines dyal lcontact section
  const localTexts = {
    en: {
      whatsNext: "What's Next?",
      headingNormal: "Let's work ",
      headingItalic: "together.",
      subText: "Whether you have a project in mind or just want to say hi, my inbox is always open. I'll try my best to get back to you!"
    },
    fr: {
      whatsNext: "Et ensuite ?",
      headingNormal: "Travaillons ",
      headingItalic: "ensemble.",
      subText: "Que vous ayez un projet en tête ou que vous vouliez simplement dire bonjour, ma boîte de réception est toujours ouverte. Je ferai de mon mieux pour vous répondre !"
    },
    es: {
      whatsNext: "¿Qué sigue?",
      headingNormal: "Trabajemos ",
      headingItalic: "juntos.",
      subText: "Ya sea que tengas un proyecto en mente o simplemente quieras decir hola, mi bandeja de entrada siempre está abierta. ¡Haré todo lo posible por responderte!"
    }
  };

  const text = localTexts[language] || localTexts.en;

  return (
    <section id="contact" className="py-32 px-6 md:px-24 max-w-7xl mx-auto border-t border-gray-100 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-6">
          {text.whatsNext}
        </h2>
        
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#111111] mb-8 tracking-tight">
          {text.headingNormal}
          <span className="font-serif italic text-gray-400">{text.headingItalic}</span>
        </h3>
        
        <p className="text-gray-500 font-light text-base sm:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          {text.subText}
        </p>
        
        {/* ⚠️ RESPONSIVE FIX DIAL EMAIL HNA 👇 */}
        <a 
          href={`mailto:${t.profile.email}`}
          className="inline-block border-b-2 border-[#111111] pb-1 text-base sm:text-2xl md:text-4xl font-medium text-[#111111] hover:text-gray-500 hover:border-gray-500 transition-colors duration-300 max-w-full break-all"
        >
          {t.profile.email}
        </a>
      </motion.div>
    </section>
  );
}