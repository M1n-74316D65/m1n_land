'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import { navItems } from 'app/constants/links'
import { entranceClasses } from 'app/lib/animation'
import { cn } from 'app/lib/utils'
import ThemeToggle from 'app/components/ui/theme-toggle'

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header className={cn('pb-5 sm:pb-7', entranceClasses(0, 'fade'))}>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link
          href="/"
          className="font-sans text-2xl font-medium tracking-[-0.06em] text-foreground transition-colors duration-[var(--duration-normal)] ease-out hover:text-accent"
        >
          m1n<span className="text-muted-foreground"> / land</span>
        </Link>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <nav
            className="flex flex-1 items-center gap-1 rounded-md bg-card p-1"
            id="nav"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map(({ path, name }) => {
              const isExternal = path.startsWith('http')
              const isActive = !isExternal && pathname !== null && pathname === path

              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    'inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-sm px-3 text-[0.8125rem] transition-colors duration-[var(--duration-normal)] ease-out sm:px-4',
                    isActive
                      ? 'bg-background text-foreground'
                      : 'text-muted-foreground hover:bg-focus hover:text-foreground'
                  )}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={isExternal ? `${name} (opens in new tab)` : name}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {name}
                  {isExternal && <ArrowUpRight className="h-3 w-3 opacity-50" aria-hidden="true" />}
                </Link>
              )
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
