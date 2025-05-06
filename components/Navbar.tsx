'use client'

import { useState, useEffect } from 'react'
import SmoothScrollLink from './SmoothScrollLink'
import { motion } from 'framer-motion'

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar background on scroll
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = links.map(link => link.href.replace('/#', ''))
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 ${
        scrolled 
          ? 'backdrop-blur-md bg-black/80 shadow-lg shadow-primary/5' 
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-6 px-4">
        <SmoothScrollLink href="/#home" className="no-underline">
          <motion.span 
            whileHover={{ scale: 1.02 }}
            className="relative text-2xl font-bold tracking-tight text-white"
          >
            Jesse Hines
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
          </motion.span>
        </SmoothScrollLink>
        
        <ul className="flex gap-4 md:gap-8 text-sm md:text-base font-medium text-gray-300">
          {links.map(({ href, label }) => {
            const isActive = activeSection === href.replace('/#', '')
            
            return (
              <li key={href}>
                <SmoothScrollLink 
                  href={href} 
                  className={`hover:text-primary transition-colors no-underline px-2 py-1 relative ${
                    isActive ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-purple-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </SmoothScrollLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </motion.header>
  )
}