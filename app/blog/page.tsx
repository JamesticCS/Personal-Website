import Link from 'next/link'
import { allMdxFiles } from '@/content/mdx'

export const metadata = { title: 'Blog' }

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-3xl py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Blog</h1>
      <ul className="flex flex-col gap-6">
        {allMdxFiles.map((post) => (
          <li key={post.slug} className="rounded-xl bg-surface p-6 shadow">
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-lg font-semibold text-gray-100">{post.meta.title}</h3>
            </Link>
            <p className="mt-1 text-xs text-gray-400">{post.meta.date}</p>
            <p className="mt-2 text-sm text-gray-300 line-clamp-2">{post.meta.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
