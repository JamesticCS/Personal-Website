'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function MathRenderer() {
  const renderedRef = useRef(false)

  useEffect(() => {
    if (renderedRef.current) return
    renderedRef.current = true

    // Function to render all math on the page
    const renderMath = () => {
      // Handle block equations - look for all $$...$$ patterns
      const blockMathElements = document.querySelectorAll('p, pre')
      
      blockMathElements.forEach(element => {
        if (element.textContent?.trim().startsWith('$$') && element.textContent?.trim().endsWith('$$')) {
          try {
            const tex = element.textContent.trim().slice(2, -2)
            const mathDiv = document.createElement('div')
            mathDiv.className = 'math-block my-6'
            katex.render(tex, mathDiv, {
              displayMode: true,
              throwOnError: false
            })
            element.parentNode?.replaceChild(mathDiv, element)
          } catch (error) {
            console.error('Error rendering block KaTeX:', error)
          }
        }
      })

      // Handle inline equations - look for all $...$ patterns in text
      const textNodes = getTextNodesIn(document.body)
      
      textNodes.forEach(node => {
        const text = node.textContent || ''
        if (text.includes('$') && !text.includes('$$')) {
          const parts = text.split(/(\$[^$]+\$)/)
          if (parts.length > 1) {
            const fragment = document.createDocumentFragment()
            
            parts.forEach(part => {
              if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
                try {
                  const tex = part.slice(1, -1)
                  const span = document.createElement('span')
                  span.className = 'math-inline'
                  katex.render(tex, span, {
                    displayMode: false,
                    throwOnError: false
                  })
                  fragment.appendChild(span)
                } catch (error) {
                  const textNode = document.createTextNode(part)
                  fragment.appendChild(textNode)
                }
              } else if (part) {
                const textNode = document.createTextNode(part)
                fragment.appendChild(textNode)
              }
            })
            
            if (node.parentNode) {
              node.parentNode.replaceChild(fragment, node)
            }
          }
        }
      })
    }

    // Helper function to get all text nodes
    function getTextNodesIn(el: Node): Text[] {
      const textNodes: Text[] = []
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)
      
      let node: Node | null
      while (node = walker.nextNode()) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() && !isInPreformattedElement(node)) {
          textNodes.push(node as Text)
        }
      }
      
      return textNodes
    }
    
    // Check if node is inside a code block or other preformatted element
    function isInPreformattedElement(node: Node): boolean {
      let parent = node.parentElement
      while (parent) {
        if (parent.tagName === 'PRE' || parent.tagName === 'CODE') {
          return true
        }
        parent = parent.parentElement
      }
      return false
    }

    // Execute after a delay to ensure DOM is ready
    setTimeout(renderMath, 300)
  }, [])

  return null
}