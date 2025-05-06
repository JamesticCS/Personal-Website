'use client'

import React from 'react'

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function SmoothScrollLink({ href, children, className = '' }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Extract the ID from the href
    const targetId = href.replace(/.*\#/, '')
    const element = document.getElementById(targetId)
    
    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      
      // Update the URL without refreshing the page
      window.history.pushState({}, '', href)
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