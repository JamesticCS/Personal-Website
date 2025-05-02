import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between py-4">
        <span className="font-semibold text-primary">JH</span>
        <ul className="flex gap-6 text-sm text-gray-300">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-gray-100">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
