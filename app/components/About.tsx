// components/About.tsx
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();

  // Dictionnaire sghir d l-headlines d had l-section hit static f l-code original
  const localTexts = {
    en: {
      headline: "Building software that solving real problems, not just writing code.",
      sub: "My journey from Miage Tangier to Solicode has taught me that the best applications require both a rock-solid backend infrastructure and a seamless user experience.",
      title: "Academic Background"
    },
    fr: {
      headline: "Créer des logiciels qui résolvent de vrais problèmes, pas seulement écrire du code.",
      sub: "Mon parcours de Miage Tanger à Solicode m'a appris que les meilleures applications nécessitent à la fois une infrastructure backend solide et une expérience utilisateur fluide.",
      title: "Parcours Académique"
    },
    es: {
      headline: "Crear software que resuelva problemas reales, no solo escribir código.",
      sub: "Mi viaje desde Miage Tánger hasta Solicode me ha enseñado que las mejores aplicaciones requieren tanto una infraestructura backend sólida como una experiencia de usuario perfecta.",
      title: "Historial Académico"
    }
  };

  const text = localTexts[language] || localTexts.en;

  return (
    <section id="about" className="py-24 px-6 md:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Quote / Statement */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-[#111111] mb-6">
            {text.headline.split(',')[0]}, <span className="font-semibold italic text-gray-400">{text.headline.split(',')[1]}</span>
          </h2>
          <p className="text-lg text-[#737373] font-light leading-relaxed">
            {text.sub}
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-8 text-[#111111]">{text.title}</h3>
          <div className="space-y-8">
            {t.education.map((edu, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-gray-100">
                <div className="absolute w-3 h-3 bg-[#111111] rounded-full -left-[7px] top-1.5" />
                <p className="text-sm font-medium text-gray-500 mb-1">{edu.duration}</p>
                <h4 className="text-lg font-medium text-[#111111]">{edu.degree}</h4>
                <p className="text-[#111111] mb-2">{edu.school}</p>
                <p className="text-sm text-gray-500 font-light">{edu.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}