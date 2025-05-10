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
      // Process block math ($$...$$)
      const article = document.querySelector('article')
      if (!article) return
      
      // Find all paragraphs that might contain block math
      const paragraphs = article.querySelectorAll('p')
      
      paragraphs.forEach(paragraph => {
        const content = paragraph.textContent || ''
        if (content.trim().startsWith('$$') && content.trim().endsWith('$$')) {
          try {
            // Extract the math content
            const tex = content.trim().slice(2, -2).trim()
            
            // Create a new element for KaTeX
            const mathContainer = document.createElement('div')
            mathContainer.className = 'math-block my-6'
            
            // Render the math
            katex.render(tex, mathContainer, {
              displayMode: true,
              throwOnError: false
            })
            
            // Replace the original paragraph with the rendered math
            paragraph.parentNode?.replaceChild(mathContainer, paragraph)
          } catch (error) {
            console.error('Error rendering block KaTeX:', error)
          }
        }
      })

      // Process inline math ($...$)
      const walker = document.createTreeWalker(
        article,
        NodeFilter.SHOW_TEXT,
        null
      )

      const nodesToProcess = []
      let currentNode
      
      // Collect text nodes containing inline math
      while ((currentNode = walker.nextNode())) {
        const content = currentNode.textContent || ''
        if (content.includes('$') && !content.includes('$$')) {
          nodesToProcess.push(currentNode)
        }
      }
      
      // Process collected nodes
      nodesToProcess.forEach(node => {
        const content = node.textContent || ''
        const parts = content.split(/(\$[^\$]+\$)/)
        
        if (parts.length > 1) {
          const fragment = document.createDocumentFragment()
          
          parts.forEach(part => {
            if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
              try {
                // Extract math content
                const tex = part.slice(1, -1).trim()
                
                // Create span for inline math
                const span = document.createElement('span')
                span.className = 'math-inline'
                
                // Render math
                katex.render(tex, span, {
                  displayMode: false,
                  throwOnError: false
                })
                
                fragment.appendChild(span)
              } catch (error) {
                console.error('Error rendering inline KaTeX:', error)
                // Fallback to original text if rendering fails
                fragment.appendChild(document.createTextNode(part))
              }
            } else if (part.trim()) {
              // Regular text
              fragment.appendChild(document.createTextNode(part))
            }
          })
          
          // Replace the original node with the processed fragment
          node.parentNode?.replaceChild(fragment, node)
        }
      })
    }

    // Execute after a short delay to ensure DOM is fully loaded
    setTimeout(renderMath, 200)
  }, [])

  return null
}