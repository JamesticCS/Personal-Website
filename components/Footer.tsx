'use client'

import { Github, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  { 
    name: 'GitHub',
    url: 'https://github.com/JamesticCS',
    icon: <Github size={18} />
  },
  { 
    name: 'X (Twitter)',
    url: 'https://x.com/JesseSR_',
    icon: (
      <svg width="18" height="18" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" className="lucide" style={{ margin: '1px' }}>
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
      </svg>
    )
  },
  { 
    name: 'Email',
    url: 'mailto:jesse.hines@uwaterloo.ca',
    icon: <Mail size={18} />
  }
]

export default function Footer() {
  return (
    <footer className="bg-surface py-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Jesse Hines
            </h2>
          </div>
          
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <motion.a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800/50 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Jesse Hines. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
