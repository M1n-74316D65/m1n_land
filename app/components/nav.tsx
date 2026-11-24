'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import ThemeToggle from 'app/components/ui/theme-toggle'
import { navItems } from 'app/constants/links'
import { cn } from 'app/lib/utils'

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <Link href="/" className="site-brand">
        m1n<span> / land</span>
      </Link>
      <div className="nav-actions">
        <nav aria-label="Primary">
          <ul className="nav-tree">
            {navItems.map(({ path, name }) => {
              const isExternal = path.startsWith('http')
              const isActive = !isExternal && pathname !== null && pathname === path

              return (
                <li key={path}>
                  <Link
                    href={path}
                    className={cn('nav-link', isActive && 'is-active')}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={isExternal ? `${name} (opens in new tab)` : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
