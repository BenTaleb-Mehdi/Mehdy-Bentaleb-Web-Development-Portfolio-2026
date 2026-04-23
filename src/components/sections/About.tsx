import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import BlurText from '../reactbits/BlurText';
import ScrollReveal from '../reactbits/ScrollReveal';
import CountUp from '../reactbits/CountUp';

import portfolioData from '../../data/portfolio.json';

export function About() {
  const { profile } = portfolioData;
  
  return (
    <section id="about" className="py-32 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <SectionHeader 
              title="About Me" 
              subtitle="Introduction" 
              className="mb-8 lg:mb-12"
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-border bg-muted mb-8 lg:mb-0"
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
              <div className="text-xl md:text-2xl text-foreground font-medium leading-[1.3]">
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={5}
                >
                  {profile.aboutText.split('. ')[0]}.
                </ScrollReveal>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed font-light text-base md:text-lg">
                <BlurText
                  text={profile.aboutText.split('. ').slice(1, 3).join('. ') + '.'}
                  delay={15}
                  animateBy="words"
                  className="text-muted-foreground"
                />
                <BlurText
                  text={profile.aboutText.split('. ').slice(3).join('. ')}
                  delay={15}
                  animateBy="words"
                  className="text-muted-foreground"
                />
              </div>

              <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-border justify-items-center lg:justify-items-start">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">Location</div>
                  <div className="text-sm font-medium text-foreground">{profile.location}</div>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">Experience</div>
                  <div className="text-sm font-medium text-foreground">
                    <CountUp to={profile.experience} duration={1.5} />+ Years
                  </div>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">Availability</div>
                  <div className="text-sm font-medium text-foreground">{profile.availability}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
