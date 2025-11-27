'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface BlogPost {
  slug: string
  meta: {
    title: string
    date: string
    summary: string
  }
}

interface BlogSectionProps {
  posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">
            Blog
          </h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
            Sometimes I like to write :)
          </p>

          <ul className="flex flex-col gap-6 w-full">
            {posts.map((post, index) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="rounded-xl bg-surface p-6 shadow-lg border border-gray-800 hover:border-primary/30 transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="no-underline">
                  <h3 className="text-lg font-semibold text-gray-100 hover:text-primary transition-colors">
                    {post.meta.title}
                  </h3>
                </Link>
                <p className="mt-1 text-xs text-gray-400">{post.meta.date}</p>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">{post.meta.summary}</p>
                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 ml-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
