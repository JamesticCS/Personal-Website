import { projects } from '@/content/projects'
import ProjectCard from '@/components/ProjectCard'

export const metadata = { title: 'Projects' }

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  )
}
