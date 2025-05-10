import React from 'react'
import type { MDXComponents } from 'mdx/types'

// Define custom MDX components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Standard elements
    p: (props) => <p className="my-5 text-gray-200 text-lg leading-relaxed" {...props} />,
    h1: (props) => <h1 className="text-3xl font-bold mt-10 mb-5 text-white" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-10 mb-5 text-white" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-8 mb-4 text-white" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2" {...props} />,
    li: (props) => <li className="text-gray-200 my-1" {...props} />,
    a: (props) => <a className="text-primary underline hover:text-secondary transition-colors" {...props} />,
    hr: () => <hr className="my-10 border-gray-700" />,
    em: (props) => <em className="text-gray-400 italic" {...props} />,
    strong: (props) => <strong className="font-bold text-white" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-400" {...props} />,
    pre: ({ children, ...props }: any) => {
      // Extract the language from className
      const language = 
        children?.props?.className?.replace(/language-/, '') || 'text'
      
      return (
        <div className="code-block">
          <div className="code-header">
            <div className="window-controls">
              <div className="window-control red"></div>
              <div className="window-control yellow"></div>
              <div className="window-control green"></div>
            </div>
            <div className="code-language">{language}</div>
          </div>
          <pre {...props}>{children}</pre>
        </div>
      )
    },
    ...components,
  }
}