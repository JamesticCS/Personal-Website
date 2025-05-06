'use client';

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

type Props = {
  title: string
  description: string
  tech: string[]
  image?: string
  link?: string
}

export default function ProjectCard({ title, description, tech, image, link }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      className="flex flex-col gap-4 rounded-xl bg-surface p-0 shadow-lg transition overflow-hidden border border-gray-800"
    >
      <div className="w-full h-48 relative bg-gradient-to-br from-primary/5 to-purple-400/5">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">💻</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-3 p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
          {link && (
            <Link href={link} target="_blank" rel="noopener noreferrer" 
              className="text-primary hover:text-primary/80 transition-colors p-1">
              <ExternalLink size={18} />
            </Link>
          )}
        </div>
        
        <p className="text-sm text-gray-400 flex-1">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-primary/10 rounded text-xs text-primary/90">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
