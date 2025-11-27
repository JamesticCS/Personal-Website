'use client'

import { motion } from 'framer-motion'

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none opacity-60" />

      <div className="mx-auto max-w-xl px-4 lg:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-center text-gray-400 max-w-md mx-auto mb-8">
            Have a question or want to work together? The best way to reach me is by email, but you can also contact me by phone.
          </p>

          <div className="bg-surface rounded-2xl p-8 shadow-xl border border-gray-800 w-full">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              <h3 className="text-xl font-medium text-white mb-4">Get In Touch</h3>

              <div className="flex flex-col items-center gap-5 max-w-md mx-auto">
                <div className="w-full">
                  <div className="flex items-center gap-3 text-left p-4 bg-background rounded-lg border border-gray-800 hover:border-primary/40 transition-colors">
                    <div className="text-primary">
                      <EmailIcon />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a href="mailto:jesse.hines@uwaterloo.ca" className="text-primary hover:text-primary/80 transition-colors font-medium">
                        jesse.hines@uwaterloo.ca
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center gap-3 text-left p-4 bg-background rounded-lg border border-gray-800 hover:border-primary/40 transition-colors">
                    <div className="text-primary">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Phone</p>
                      <a href="tel:+19025994779" className="text-primary hover:text-primary/80 transition-colors font-medium">
                        902-599-4779
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
