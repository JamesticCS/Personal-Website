import '@/app/globals.css'
import '@/app/styles/code-theme.css'
import '@/app/styles/blog-styles.css'
import '@/app/styles/math-styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jesse Hines | Mathematics & Software Development',
  description: 'Mathematics student at the University of Waterloo and software developer with a focus on mathematics and problem-solving.',
  keywords: ['Mathematics', 'Software Development', 'University of Waterloo', 'Jesse Hines', 'Programming', 'Web Development'],
  authors: [{ name: 'Jesse Hines' }],
  creator: 'Jesse Hines',
  publisher: 'Jesse Hines',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Jesse Hines | Mathematics & Software Development',
    description: 'Mathematics student at the University of Waterloo and software developer with a focus on mathematics and problem-solving.',
    siteName: 'Jesse Hines',
    images: [
      {
        url: '/profile/profile.png',
        width: 1200,
        height: 630,
        alt: 'Jesse Hines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jesse Hines | Mathematics & Software Development',
    description: 'Mathematics student at the University of Waterloo and software developer with a focus on mathematics and problem-solving.',
    creator: '@JesseSR_',
    images: ['/profile/profile.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
