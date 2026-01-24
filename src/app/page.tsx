"use client";
import FloatingCard from "@/components/FloatingCard";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import Magnetic from "@/components/Magnetic";
import Terminal from "@/components/Terminal";
import portfolioData from "../../data/portfolio.json";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Instagram, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import TechIcon from "@/components/TechIcon";

export default function Home() {
  const { profile, skills, experience, projects } = portfolioData;
  const [activeSection, setActiveSection] = useState("about");
  const [terminalTrigger, setTerminalTrigger] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<any | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "experience", "education", "projects"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHeroTrigger = () => {
      setTerminalTrigger("exec --view-projects");
  };

  const handleCommandComplete = () => {
      setTerminalTrigger(null);
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
          // Small delay to allow user to read output
          setTimeout(() => {
            projectsSection.scrollIntoView({ behavior: "smooth" });
          }, 800);
      }
  };

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-0 font-sans md:px-12 md:py-20 lg:px-16 lg:py-0 relative">
      <CustomCursor />
      <ParticleBackground />
      <Terminal triggerCommand={terminalTrigger} onCommandComplete={handleCommandComplete} />

      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Left Column (Sticky Sidebar) */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-2/5 lg:flex-col lg:justify-between lg:py-12  lg:overflow-hidden">
          <div className="space-y-6 lg:space-y-12 w-full max-w-lg mx-auto py-8 lg:py-12"> 
            <Hero onTriggerTerminal={handleHeroTrigger} />
            
            {/* Navigation */}
            <nav className="nav hidden lg:block" aria-label="In-page jump links">
              <ul className="w-max space-y-5">
                {["About", "Skills", "Experience", "Projects"].map((item) => (
                  <li key={item}>
                    <Magnetic>
                      <a
                        className={`group flex items-center py-1 ${
                          activeSection === item.toLowerCase() ? "text-slate-200" : "text-slate-500"
                        }`}
                        href={`#${item.toLowerCase()}`}
                      >
                        <span
                          className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
                            activeSection === item.toLowerCase() ? "w-16 bg-slate-200" : "w-8 bg-slate-600"
                          }`}
                        ></span>
                        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 transition-colors">
                          {item}
                        </span>
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
            
           {/* Social Links - Pushed to bottom */}
           <ul className="flex items-center gap-5 w-full max-w-lg mx-auto pt-3" aria-label="Social media">
              {Object.entries(profile.socialLinks).map(([key, url]) => (
                  <li key={key}>
                  <Magnetic>
                      <a href={url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-accent transition-colors block p-2">
                          {key === 'github' && <Github size={24} />}
                          {key === 'linkedin' && <Linkedin size={24} />}
                          {key === 'twitter' && <Twitter size={24} />}
                          {key === 'instagram' && <Instagram size={24} />}
                          {key === 'email' && <Mail size={24} />}
                          {/* Fallback for other keys */}
                          {!['github', 'linkedin', 'twitter', 'instagram', 'email'].includes(key) && <LinkIcon size={24} />}
                      </a>
                  </Magnetic>
                  </li>
              ))}
          </ul>
        </header>

        {/* Right Column (Scrollable Content) - 60% Width */}
        <main className="pt-12 lg:w-3/5 lg:py-24 space-y-12"> {/* Increased gap between sections */}
          
          {/* About Section */}
          <section id="about" className="scroll-mt-16 lg:scroll-mt-24">
             <div className="sticky top-0 z-20 -mx-4 mb-4 bg-slate-900/75 px-4 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
               <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-accent">// About</h2>
             </div>
             <FloatingCard delay={0.2} weight="light" className="p-4 md:p-6">
                 <p className="mb-4 text-slate-400 leading-relaxed">
                   {profile.bio} I specialize in building specialized software solutions that are both robust and aesthetically pleasing. 
                 </p>
                 <p className="mb-4 text-slate-400 leading-relaxed">
                  My journey started with a curiosity for how things work on the web, and has evolved into a passion for architectural design, performance optimization, and creating intuitive user interfaces.
                 </p>
             </FloatingCard>
          </section>

          {/* Skills Section (New) */}
          <section id="skills" className="scroll-mt-16 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-4 mb-4 bg-slate-900/75 px-4 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-accent">// Skills</h2>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {/* @ts-ignore */}
               {skills.map((skill, index) => (
                 <FloatingCard key={index} delay={index * 0.05} weight="light" className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-accent/30 transition-all group flex items-center gap-3 min-w-0">
                   <div className="text-accent/80 group-hover:text-accent transition-colors shrink-0">
                      <TechIcon name={skill.name} className="w-5 h-5" />
                   </div>
                   <span className="text-slate-300 text-sm font-mono group-hover:text-white transition-colors truncate">{skill.name}</span>
                 </FloatingCard>
               ))}
             </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-16 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-4 mb-4 bg-slate-900/75 px-4 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-accent">// Experience</h2>
            </div>
            <div>
              <ol className="group/list space-y-12">
                {experience.map((job, index) => (
                  <li key={index}>
                    <FloatingCard delay={index * 0.1} weight="medium" className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 p-4 md:p-6">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          {job.duration}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                              <span className="text-lg font-bold text-slate-200 group-hover:text-accent transition-colors">
                                {job.role} · {job.company}
                              </span>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400">{job.description}</p>
                          
                          {/* Metrics (Attributes) */}
                          {job.metrics && (
                            <ul className="mt-4 space-y-2 list-disc pl-4 text-xs text-slate-400">
                                {job.metrics.map((metric, i) => (
                                    <li key={i} className="text-slate-300">{metric}</li>
                                ))}
                            </ul>
                          )}

                          <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
                            {job.techUsed.map(tech => (
                              <li key={tech} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                    </FloatingCard>
                  </li>
                ))}
              </ol>
            </div>
          </section>



          {/* Education Section */}
          <section id="education" className="scroll-mt-16 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-4 mb-4 bg-slate-900/75 px-4 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-accent">// Education</h2>
            </div>
            <div>
              <ol className="group/list space-y-12">
                 {/* @ts-ignore */}
                 {portfolioData.education && portfolioData.education.map((edu, index) => (
                  <li key={index}>
                    <FloatingCard delay={index * 0.1} weight="medium" className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 p-4 md:p-6">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          {edu.duration}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                              {/* @ts-ignore */}
                              {edu.link ? (
                                <a 
                                  href={edu.link} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="text-lg font-bold text-slate-200 group-hover:text-accent transition-colors flex items-center gap-1 hover:underline"
                                >
                                  {edu.school}
                                  <ExternalLink size={14} className="inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              ) : (
                                <span className="text-lg font-bold text-slate-200 group-hover:text-accent transition-colors">
                                  {edu.school}
                                </span>
                              )}
                          </h3>
                          <p className="text-slate-400 mt-1">{edu.degree}</p>
                          <p className="mt-2 text-sm leading-normal text-slate-400">{edu.description}</p>
                        </div>
                    </FloatingCard>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-16 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-4 mb-4 bg-slate-900/75 px-4 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
               <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-accent">// Projects</h2>
            </div>
            {/* Grid Layout Fix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* @ts-ignore */}
                {projects.map((project: any, index) => (
                  <FloatingCard 
                    key={index} 
                    delay={index * 0.1} 
                    weight="heavy" 
                    className="group relative flex flex-col h-full bg-slate-800/50 hover:bg-slate-800/80 transition-all p-4 md:p-6 border border-slate-700 hover:border-accent/30 cursor-pointer"
                    onClick={() => setActiveProject(project)}
                  >
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <div className="z-10 flex flex-col h-full">
                          <header className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-bold text-slate-200 group-hover:text-accent transition-colors flex items-center gap-1">
                                    {project.title}
                              </h3>
                              <div className="z-20 flex gap-2">
                                  {project.githubLink && (
                                      <a 
                                        href={project.githubLink} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-slate-400 hover:text-accent transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                          <Github size={18} />
                                      </a>
                                  )}
                              </div>
                          </header>

                          {/* Image Placeholder - Verified z-index */}
                          <div className="aspect-video w-full rounded border border-slate-700 bg-slate-900/50 flex items-center justify-center mb-4 group-hover:border-accent/30 transition-colors overflow-hidden relative">
                             {/* @ts-ignore */}
                             {project.image ? (
                               <img 
                                 src={project.image} 
                                 alt={project.title} 
                                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                               />
                             ) : (
                               <span className="text-xs text-slate-500 font-mono">PROJECT PREVIEW</span>
                             )}
                          </div>

                          <p className="mt-auto text-sm leading-normal text-slate-400 mb-4">{project.description}</p>
                          
                          {project.metrics && (
                             <p className="mb-4 text-xs font-semibold text-accent border-l-2 border-accent pl-2">{project.metrics}</p>
                          )}

                         <div className="flex flex-wrap gap-2 mt-auto">
                            {/* Tech Stack Flattened for Card */}
                            {Object.values(project.techStack).flat().slice(0, 4).map((tech: any) => (
                                <span key={tech as string} className="rounded-full bg-teal-400/10 px-2 py-1 text-xs font-medium leading-5 text-teal-300">
                                    {tech as string}
                                </span>
                            ))}
                          </div>
                        </div>
                  </FloatingCard>
                ))}
            </div>
          </section>

          
          {/* Footer */}
          <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0 font-mono">
             <p>Designed enabled with Mehdi Ben taleb &reg;</p>
          </footer>
        </main>
      </div>
      <ProjectModal 
        isOpen={!!activeProject} 
        onClose={() => setActiveProject(null)} 
        project={activeProject} 
      />
    </div>
  );
}
