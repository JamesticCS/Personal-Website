import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import PrismSetup from './PrismSetup'
import 'katex/dist/katex.min.css'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogFrontmatter = {
  title: string
  date: string
  summary?: string
}

// Helper: list *.mdx files in /content/blog
async function listBlogSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

// Helper: import the MDX module compiled by @next/mdx
async function getPostModule(slug: string): Promise<{
  default: ComponentType
  frontmatter: BlogFrontmatter
}> {
  return import(`../../../content/blog/${slug}.mdx`)
}

// --- Static generation ---

export async function generateStaticParams() {
  const slugs = await listBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Ensure only known slugs are valid
export const dynamicParams = false

type Props = {
  params: Promise<{ slug: string }>
}

// Use frontmatter to build <head> metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = await getPostModule(slug)

  return {
    title: frontmatter.title ?? slug,
    description: frontmatter.summary ?? undefined,
  }
}

// --- Page component ---

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { default: MDXContent, frontmatter } = await getPostModule(slug)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <PrismSetup />
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">{frontmatter.title}</h1>
        <p className="text-gray-400 text-sm mt-2">{frontmatter.date}</p>
      </div>
      <article className="prose prose-invert max-w-none">
        <MDXContent />
      </article>
    </div>
  )
}
