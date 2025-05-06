'use client'

import SmoothScrollLink from './SmoothScrollLink'

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-6 px-4">
        <span className="text-xl font-bold text-primary">JESSE HINES</span>
        <ul className="flex gap-8 text-base font-medium text-gray-300">
          {links.map(({ href, label }) => (
            <li key={href}>
              <SmoothScrollLink href={href} className="hover:text-primary transition-colors no-underline">
                {label}
              </SmoothScrollLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}