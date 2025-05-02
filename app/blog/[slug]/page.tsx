import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'node:fs/promises'
import path from 'node:path'

type Props = { params: { slug: string } }   // <-- string, not string[]

/* ---------- FIXED: generateStaticParams ---------- */
export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'))
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\\.mdx$/, '') })) // <-- slug as string
}

export default async function BlogPostPage({ params }: Props) {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`) // <-- string slug
  const source = await fs.readFile(filePath, 'utf8')
  return (
    <article className="prose prose-invert mx-auto py-10">
      <MDXRemote source={source} />
    </article>
  )
}

