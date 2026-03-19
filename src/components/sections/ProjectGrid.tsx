import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectModal } from '../ui/ProjectModal';

import portfolioData from '../../data/portfolio.json';

const projects = portfolioData.projects;

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-32 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="Selected Works" 
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true, margin: "-100px" }}
              className={
                project.colSpan === "md:col-span-8" ? "md:col-span-8 w-full" : 
                project.colSpan === "md:col-span-4" ? "md:col-span-4 w-full" : 
                "md:col-span-12 w-full"
              }
            >
              <ProjectCard 
                title={project.title}
                type={project.type}
                year={project.year}
                description={project.description}
                image={project.image}
                bgClass={project.bgClass}
                demoUrl={project.demoUrl}
                codeUrl={project.codeUrl}
                className="h-full"
                onClick={() => openModal(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        project={selectedProject} 
      />
    </section>
  );
}
