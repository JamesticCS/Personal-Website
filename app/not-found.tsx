'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-medium mb-6 text-gray-200">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium transition-transform hover:scale-105"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}