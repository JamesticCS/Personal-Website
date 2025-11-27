'use client'

import { motion } from 'framer-motion'
import ExperienceClient from '@/app/experience/ExperienceClient'

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6 mb-12">
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
  )
}
