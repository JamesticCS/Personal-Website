import { projects } from '@/content/projects'
import { allMdxFiles } from '@/content/mdx'
import HomeClient from './HomeClient'

export default function HomePage() {
  return <HomeClient projects={projects} blogPosts={allMdxFiles} />
}