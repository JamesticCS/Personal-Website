'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const TECH_TAGS = ['Python', 'C++', 'TypeScript', 'React', 'Next.js', 'Node.js', 'ML']

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/JamesticCS',
    label: 'GitHub',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
  },
  {
    href: 'https://x.com/JesseSR_',
    label: 'X (Twitter)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" style={{ margin: '2px' }}>
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: 'mailto:jesse.hines@uwaterloo.ca',
    label: 'Email',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
]

export default function HeroSection() {
  return (
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
            Software developer with a focus on mathematics and problem-solving
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-4 mt-6 justify-center md:justify-start"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
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
        {TECH_TAGS.map((tech) => (
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
  )
}
