'use client'

import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function SmoothScrollLink({ href, children, className = '' }: SmoothScrollLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isOnBlogPage = pathname === '/blog' || pathname?.startsWith('/blog/')
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Parse the hash and path from href
    const hasHash = href.includes('#')
    const targetHash = hasHash ? href.split('#')[1] : null
    
    // If we're on a blog page and trying to navigate to a main page section
    if (isOnBlogPage && hasHash && href.startsWith('/#')) {
      // First navigate to the home page
      router.push('/')
      
      // Then try to scroll to the section after a delay to ensure the page has loaded
      if (targetHash) {
        setTimeout(() => {
          const element = document.getElementById(targetHash)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      }
      return
    }
    
    // If we're already on the home page and trying to navigate to a section
    if (!isOnBlogPage && hasHash) {
      const element = document.getElementById(targetHash || '')
      
      if (element) {
        // Special handling for contact section - scroll a bit more
        if (targetHash === 'contact') {
          const offset = element.offsetTop - 50; // Adjust offset for better positioning
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        } else {
          // Scroll to the element with smooth behavior
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
        
        // Update URL without full page reload
        window.history.pushState({}, '', href)
      }
      return
    }
    
    // For any other navigation, use router
    router.push(href)
  }

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}