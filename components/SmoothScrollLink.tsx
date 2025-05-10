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
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Check if this is a hash link or a different page
    const isHashLink = href.includes('#')
    const targetUrl = isHashLink ? href.split('#')[0] || '/' : href
    const targetHash = isHashLink ? href.split('#')[1] : null
    
    // Check if we're already on the target page
    const currentPath = pathname || '/'
    const isCurrentPage = targetUrl === '/' || currentPath === targetUrl
    
    if (isCurrentPage && targetHash) {
      // If already on the correct page, just scroll to the element
      const element = document.getElementById(targetHash)
      
      if (element) {
        // Scroll to the element with smooth behavior
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        
        // Update the URL without refreshing the page
        window.history.pushState({}, '', href)
      }
    } else {
      // Navigate to different page
      if (targetHash) {
        // If navigating to a hash on another page
        // First navigate to the page, then scroll will be handled on load
        router.push(href)
      } else {
        // Navigate to a page without hash
        router.push(href)
      }
    }
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