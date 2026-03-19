import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import BlurText from '../reactbits/BlurText';
import ScrollReveal from '../reactbits/ScrollReveal';
import CountUp from '../reactbits/CountUp';

import portfolioData from '../../data/portfolio.json';

export function About() {
  const { profile } = portfolioData;
  
  return (
    <section id="about" className="py-24 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <SectionHeader 
              title="About Me" 
              subtitle="Introduction" 
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900"
            >
              <img src={profile.profileImg} alt="Profile" className="w-full h-full object-cover" />
            </motion.div>
          </div>
          
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-xl md:text-2xl text-white font-medium leading-[1.3]">
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={5}
                >
                  {profile.aboutText.split('. ')[0]}.
                </ScrollReveal>
              </div>
              
              <div className="space-y-4 text-zinc-400 leading-relaxed font-light text-base md:text-lg">
                <BlurText
                  text={profile.aboutText.split('. ').slice(1, 3).join('. ') + '.'}
                  delay={15}
                  animateBy="words"
                  className="text-zinc-400"
                />
                <BlurText
                  text={profile.aboutText.split('. ').slice(3).join('. ')}
                  delay={15}
                  animateBy="words"
                  className="text-zinc-400"
                />
              </div>

              <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-900">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500 mb-2">Location</div>
                  <div className="text-sm font-medium text-white">{profile.location}</div>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500 mb-2">Experience</div>
                  <div className="text-sm font-medium text-white">
                    <CountUp to={profile.experience} duration={1.5} />+ Years
                  </div>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500 mb-2">Availability</div>
                  <div className="text-sm font-medium text-white">{profile.availability}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
