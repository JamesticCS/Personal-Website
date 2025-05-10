import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PrismSetup from './PrismSetup'

type Props = { params: { slug: string } }

// Custom MDX components
const components = {
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
  // Standard elements
  p: (props: any) => <p className="my-5 text-gray-200 text-lg leading-relaxed" {...props} />,
  h1: (props: any) => <h1 className="text-3xl font-bold mt-10 mb-5 text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-10 mb-5 text-white" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-8 mb-4 text-white" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-5 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-5 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-200 my-1" {...props} />,
  a: (props: any) => <a className="text-primary underline hover:text-secondary transition-colors" {...props} />,
  hr: () => <hr className="my-10 border-gray-700" />,
  em: (props: any) => <em className="text-gray-400 italic" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-400" {...props} />,
}

export async function generateStaticParams() {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'))
    return files
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => ({
        slug: filename.replace(/\.mdx$/, '')
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default function BlogPostPage({ params }: Props) {
  const slug = params.slug
  const contentDir = path.join(process.cwd(), 'content', 'blog')
  const filePath = path.join(contentDir, `${slug}.mdx`)
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(fileContents)
    
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <PrismSetup />
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">{data.title}</h1>
          <p className="text-gray-400 text-sm mt-2">{data.date}</p>
        </div>
        <article className="prose prose-invert max-w-none">
          <MDXRemote source={content} components={components} />
        </article>
      </div>
    )
  } catch (error) {
    console.error(`Error loading blog post for slug: ${slug}`, error)
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-red-500">Post Not Found</h1>
        <p className="text-gray-300 mt-4">Sorry, we couldn't find the post you were looking for.</p>
        <p className="text-gray-400 mt-2">Error: {(error as Error).message}</p>
      </div>
    )
  }
}