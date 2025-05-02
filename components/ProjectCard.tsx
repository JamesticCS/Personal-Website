'use client';

import { motion } from 'framer-motion'

type Props = {
  title: string
  description: string
  tech: string[]
}

export default function ProjectCard({ title, description, tech }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      className="flex flex-col gap-3 rounded-xl bg-surface p-6 shadow-lg transition"
    >
      <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
      <p className="text-sm text-gray-400 flex-1">{description}</p>
      <ul className="flex flex-wrap gap-2 text-xs text-primary">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </motion.article>
  )
}
