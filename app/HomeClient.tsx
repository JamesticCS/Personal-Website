'use client'

import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import ExperienceClient from './experience/ExperienceClient'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

type FormData = z.infer<typeof schema>

interface BlogPost {
  slug: string;
  meta: {
    title: string;
    date: string;
    summary: string;
  };
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface HomeClientProps {
  projects: Project[];
  blogPosts: BlogPost[];
}

export default function HomeClient({ projects, blogPosts }: HomeClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })
  const [sent, setSent] = useState(false)

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    setSent(true)
  }

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Jesse&nbsp;Hines
          </span>
        </h1>
        <p className="max-w-lg text-lg text-gray-400">
          Mathematics student at the University of Waterloo. I build software, explore math, and write about what I learn.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mx-auto max-w-6xl py-20">
        <h1 className="mb-8 text-center text-3xl font-bold">Projects</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <h1 className="mb-8 text-center text-3xl font-bold">Experience</h1>
        <ExperienceClient />
      </section>

      {/* Blog Section */}
      <section id="blog" className="mx-auto max-w-3xl py-20">
        <h1 className="mb-8 text-center text-3xl font-bold">Blog</h1>
        <ul className="flex flex-col gap-6">
          {blogPosts.map((post) => (
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

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-md py-20 space-y-6">
        <h1 className="text-center text-3xl font-bold">Contact</h1>
        {sent ? (
          <p className="text-center text-green-400">Thanks! I'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register('name')}
              placeholder="Name"
              className="w-full rounded bg-surface p-3 text-sm"
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full rounded bg-surface p-3 text-sm"
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            <textarea
              {...register('message')}
              placeholder="Message"
              rows={5}
              className="w-full rounded bg-surface p-3 text-sm"
            />
            {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
            <button
              disabled={isSubmitting}
              className="w-full rounded bg-primary py-2 font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : 'Send'}
            </button>
          </form>
        )}

        <div className="text-center text-sm text-gray-400">
          Or email me directly at{' '}
          <a href="mailto:jesse.hines@uwaterloo.ca" className="underline">
            jesse.hines@uwaterloo.ca
          </a>{' '}
          or call <a href="tel:+19025994779">902‑599‑4779</a>.
        </div>
      </section>
    </div>
  )
}