'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const isOnBlogPage = pathname === '/blog' || pathname?.startsWith('/blog/')
  
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar background on scroll
      setScrolled(window.scrollY > 20)
      
      // Only update active section based on scroll if we're on the homepage
      if (isOnBlogPage) return
      
      // Get sections
      const sections = links.map(link => link.href.replace('/#', ''))
      
      // We need to check sections in reverse order (bottom to top of page)
      // but put 'contact' at the end to ensure it has priority
      const orderedSections = [...sections]
      // Move 'contact' to the end if it exists in the array
      const contactIndex = orderedSections.indexOf('contact')
      if (contactIndex !== -1) {
        orderedSections.splice(contactIndex, 1)
        orderedSections.push('contact')
      }
      
      for (const section of orderedSections.reverse()) {
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
    
    // If on blog page, set the blog section as active
    if (isOnBlogPage) {
      setActiveSection('blog')
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isOnBlogPage])
  
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
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-4 md:py-6 px-3 md:px-4">
        <SmoothScrollLink href="/#home" className="no-underline">
          <motion.span 
            whileHover={{ scale: 1.02 }}
            className="relative text-2xl font-bold tracking-tight text-white"
          >
            Jesse Hines
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
          </motion.span>
        </SmoothScrollLink>
        
        <ul className="flex flex-wrap gap-2 md:gap-8 text-xs md:text-base font-medium text-gray-300">
          {links.map(({ href, label }) => {
            const isActive = activeSection === href.replace('/#', '')
            
            return (
              <li key={href}>
                <SmoothScrollLink 
                  href={href} 
                  className={`hover:text-primary transition-colors no-underline px-1.5 md:px-2 py-1 relative ${
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