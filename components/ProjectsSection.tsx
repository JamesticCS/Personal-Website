'use client'

import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'

interface Project {
  title: string
  description: string
  tech: string[]
  image?: string
  link?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-center text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent mb-3 md:mb-4">
            Projects
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-12">
            Here are some projects I&apos;ve made, feel free to check them out!
          </p>

          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 w-full" id="project-grid">
            {projects.map((p, index) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ProjectCard {...p} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
