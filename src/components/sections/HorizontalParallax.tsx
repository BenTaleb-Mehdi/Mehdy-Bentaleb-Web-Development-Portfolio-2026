import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HorizontalParallax() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal translation based on scroll progress
  // We move the container to the left as we scroll down
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  
  // Parallax background text moves at a different rate
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const cards = [
    {
      id: 1,
      number: "01",
      title: "Core Architecture",
      category: "Backend / Dev",
      description: "Building robust systems with Laravel and clean MVC patterns for maximum scalability."
    },
    {
      id: 2,
      number: "02",
      title: "Fluid Interfaces",
      category: "Frontend / UI",
      description: "Crafting immersive user experiences using Framer Motion and modern React patterns."
    },
    {
      id: 3,
      number: "03",
      title: "Digital Logic",
      category: "Full-Stack",
      description: "Bridging the gap between complex database operations and seamless client-side interactions."
    },
    {
      id: 4,
      number: "04",
      title: "Modern Ecosystems",
      category: "Optimization",
      description: "Integrating high-performance tools to ensure fast load times and reliable infrastructures."
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-zinc-900">
        {/* Background Parallax Text */}
        <motion.div 
          style={{ x: backgroundX, opacity }}
          className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
        >
          <span className="text-[25vw] font-black uppercase tracking-tighter text-white">
            Experiences in
          </span>
        </motion.div>

        {/* Horizontal Container */}
        <div className="relative flex h-full items-center px-[10vw]">
          <motion.div style={{ x }} className="flex gap-16 md:gap-32">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="group relative flex h-[500px] w-[320px] md:w-[450px] flex-col justify-between border border-zinc-900 bg-black p-8 md:p-12 transition-all duration-700 hover:border-zinc-700"
              >
                {/* 1px Accent Line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-brand-green group-hover:w-full transition-all duration-700 ease-in-out" />
                
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[0.6rem] tracking-[0.4em] text-zinc-500 uppercase">
                    Phase {card.number}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-brand-green uppercase tracking-wider">{card.category}</span>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
                      {card.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex flex-col gap-8">
                  <p className="text-sm md:text-base font-light leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-zinc-800 transition-colors" />
                    <span className="font-mono text-[0.6rem] text-zinc-600">INT_0{card.id}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
