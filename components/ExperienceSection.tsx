'use client'

import { motion } from 'framer-motion'
import ExperienceClient from '@/app/experience/ExperienceClient'

export default function ExperienceSection() {
  return (
    <section id="experience" className="pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6 mb-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent mx-auto"
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
