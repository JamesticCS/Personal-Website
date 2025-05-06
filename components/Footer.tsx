'use client'

import { GitHub, Linkedin, Mail, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  { 
    name: 'GitHub',
    url: 'https://github.com/jessehines',
    icon: <GitHub size={18} />
  },
  { 
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/jessehines',
    icon: <Linkedin size={18} />
  },
  { 
    name: 'Twitter',
    url: 'https://twitter.com/jesse_hines',
    icon: <Twitter size={18} />
  },
  { 
    name: 'Email',
    url: 'mailto:jesse.hines@uwaterloo.ca',
    icon: <Mail size={18} />
  }
]

export default function Footer() {
  return (
    <footer className="bg-surface py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-2">
              Jesse Hines
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              Mathematics student at the University of Waterloo. Building software, exploring math, and sharing what I learn.
            </p>
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
        
        <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Jesse Hines. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
