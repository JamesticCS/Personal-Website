import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getAllPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const { data } = matter(source)
      return {
        slug: file.replace(/\.mdx$/, ''),
        meta: data as { title: string; date: string; summary: string },
      }
    })
}

export const allMdxFiles = getAllPosts()
