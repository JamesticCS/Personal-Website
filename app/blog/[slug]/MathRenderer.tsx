'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'

export default function MathRenderer() {
  const renderedRef = useRef(false)

  useEffect(() => {
    if (renderedRef.current) return
    renderedRef.current = true

    // Function to render all math on the page
    const renderMath = () => {
      // Find all elements with class 'math-display'
      const mathElements = document.querySelectorAll('.math-display')
      
      mathElements.forEach(element => {
        try {
          const tex = element.textContent || ''
          katex.render(tex, element, {
            displayMode: true,
            throwOnError: false
          })
        } catch (error) {
          console.error('Error rendering KaTeX:', error)
        }
      })

      // Find all inline math elements
      const inlineMathElements = document.querySelectorAll('.math-inline')
      
      inlineMathElements.forEach(element => {
        try {
          const tex = element.textContent || ''
          katex.render(tex, element, {
            displayMode: false,
            throwOnError: false
          })
        } catch (error) {
          console.error('Error rendering inline KaTeX:', error)
        }
      })
    }

    // Execute after a short delay to ensure DOM is ready
    setTimeout(renderMath, 100)
  }, [])

  return null
}