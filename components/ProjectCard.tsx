'use client';

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

type Props = {
  title: string
  description: string
  tech: string[]
  image?: string
  githubUrl?: string | null
  liveUrl?: string | null
}

export default function ProjectCard({ title, description, tech, image, githubUrl, liveUrl }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      className="flex flex-col gap-3 md:gap-4 rounded-xl bg-surface p-0 shadow-lg transition overflow-hidden border border-gray-800 h-full"
    >
      <div className="w-full h-40 sm:h-48 relative bg-gradient-to-br from-primary/5 to-purple-400/5">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover ${title === 'Physicle' ? 'object-[center_20%] scale-100' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl sm:text-5xl opacity-30">💻</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 md:gap-3 p-4 md:p-6 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg md:text-xl font-semibold text-gray-100">{title}</h3>
          <div className="flex gap-2">
            {githubUrl && (
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors p-1"
                aria-label="GitHub Repository">
                <Github size={16} />
              </Link>
            )}
            {liveUrl && (
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors p-1"
                aria-label="Live Demo">
                <ExternalLink size={16} />
              </Link>
            )}
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-400 flex-1">{description}</p>
        
        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto pt-2">
          {tech.map((t) => (
            <span key={t} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-primary/10 rounded text-[10px] md:text-xs text-primary/90">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
