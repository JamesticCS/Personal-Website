'use client'

import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'

interface BlogPost {
  slug: string
  meta: {
    title: string
    date: string
    summary: string
  }
}

interface Project {
  title: string
  description: string
  tech: string[]
  image?: string
  link?: string
}

interface HomeClientProps {
  projects: Project[]
  blogPosts: BlogPost[]
}

export default function HomeClient({ projects, blogPosts }: HomeClientProps) {
  return (
    <div>
      <HeroSection />
      <ProjectsSection projects={projects} />
      <ExperienceSection />
      <BlogSection posts={blogPosts} />
      <ContactSection />
    </div>
  )
}
