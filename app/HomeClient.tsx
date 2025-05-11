'use client'

import Link from 'next/link'
import Image from 'next/image'
import ProjectCard from '@/components/ProjectCard'
import ExperienceClient from './experience/ExperienceClient'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { motion } from 'framer-motion'

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
  tech: string[];
  image?: string;
  link?: string;
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

  const [formError, setFormError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    // Clear any previous error message
    setFormError(null)
    
    try {
      console.log('Sending form data:', data)
      
      const response = await fetch('/api/contact', { 
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json()
      
      if (response.ok) {
        console.log('Form submission successful:', result)
        setSent(true)
      } else {
        console.error('Form submission failed:', result)
        let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
        
        // Show more specific error if available
        if (result.error) {
          errorMessage = `Error: ${result.error}`
          if (result.details) {
            console.error('Detailed error:', result.details)
            errorMessage += `. ${JSON.stringify(result.details)}`
          }
        }
        
        setFormError(errorMessage)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormError('Network error occurred while sending the message. Please check your connection and try again.')
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center gap-6 md:gap-10 py-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-5xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left order-2 md:order-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
              >
                Jesse&nbsp;Hines
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-300 mb-4 md:mb-6"
            >
              Mathematics student at the University of Waterloo
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-base sm:text-lg text-gray-400"
            >
              Software developer with a focus on mathematics and problem-solving.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-4 mt-6 justify-center md:justify-start"
            >
              <a 
                href="https://github.com/JamesticCS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a 
                href="https://x.com/JesseSR_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="X (Twitter)"
              >
                <svg width="20" height="20" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" className="lucide" style={{ margin: '2px' }}>
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="mailto:jesse.hines@uwaterloo.ca" 
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 order-1 md:order-2 mb-4 md:mb-0"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 p-1">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                <Image 
                  src="/profile/profile.png" 
                  alt="Jesse Hines" 
                  width={300} 
                  height={300} 
                  className="rounded-full object-cover w-full h-full transform scale-[1.15]"
                  style={{ objectPosition: "center top" }}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2 md:mt-4 px-2"
        >
          {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'ML'].map((tech) => (
            <motion.span 
              key={tech}
              whileHover={{ scale: 1.05, y: -3 }}
              className="px-2 md:px-3 py-1 bg-surface/80 rounded-full text-xs md:text-sm text-gray-300 border border-primary/30"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-center text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4">Projects</h1>
            <p className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-12">Here are some projects I've made recently, feel free to check them out!</p>
          
            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 w-full">
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

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="mx-auto max-w-6xl px-4 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mx-auto"
          >
            Experience
          </motion.h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <ExperienceClient />
        </motion.div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">Blog</h1>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">Sometimes I like to write :)</p>
          
            <ul className="flex flex-col gap-6 w-full">
              {blogPosts.map((post, index) => (
                <motion.li 
                  key={post.slug} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="rounded-xl bg-surface p-6 shadow-lg border border-gray-800 hover:border-primary/30 transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="no-underline">
                    <h3 className="text-lg font-semibold text-gray-100 hover:text-primary transition-colors">{post.meta.title}</h3>
                  </Link>
                  <p className="mt-1 text-xs text-gray-400">{post.meta.date}</p>
                  <p className="mt-2 text-sm text-gray-300 line-clamp-2">{post.meta.summary}</p>
                  <div className="mt-4">
                    <Link href={`/blog/${post.slug}`} className="text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-1">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none opacity-60" />
        
        <div className="mx-auto max-w-xl px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">Get In Touch</h1>
            <p className="text-center text-gray-400 max-w-md mx-auto mb-8">
              Have a question or want to work together? The best way to reach me is by email, but you can also contact me by phone.
            </p>
          
            <div className="bg-surface rounded-2xl p-8 shadow-xl border border-gray-800 w-full">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                
                <h3 className="text-xl font-medium text-white mb-4">Get In Touch</h3>
                
                <div className="flex flex-col items-center gap-5 max-w-md mx-auto">
                  <div className="w-full">
                    <div className="flex items-center gap-3 text-left p-4 bg-background rounded-lg border border-gray-800 hover:border-primary/40 transition-colors">
                      <div className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <a href="mailto:jesse.hines@uwaterloo.ca" className="text-primary hover:text-primary/80 transition-colors font-medium">
                          jesse.hines@uwaterloo.ca
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <div className="flex items-center gap-3 text-left p-4 bg-background rounded-lg border border-gray-800 hover:border-primary/40 transition-colors">
                      <div className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                        <a href="tel:+19025994779" className="text-primary hover:text-primary/80 transition-colors font-medium">
                          902-599-4779
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form code commented out for later implementation
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{formError}</p>
                </div>
              )}
              
              <div>
                <input
                  {...register('name')}
                  placeholder="Name"
                  className="w-full rounded-lg bg-background border border-gray-700 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <input
                  {...register('email')}
                  placeholder="Email"
                  className="w-full rounded-lg bg-background border border-gray-700 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <textarea
                  {...register('message')}
                  placeholder="Your message"
                  rows={5}
                  className="w-full rounded-lg bg-background border border-gray-700 p-3 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-primary to-purple-500 py-3 font-medium text-white disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </motion.button>
            </form>
            */}
          </motion.div>
        </div>
      </section>
    </div>
  )
}