'use client'

import { useEffect } from 'react'
import Prism from 'prismjs'

// Import language syntaxes
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-markdown'

export default function PrismSetup() {
  useEffect(() => {
    // Highlight all code blocks on page load
    Prism.highlightAll()
  }, [])

  return null
}