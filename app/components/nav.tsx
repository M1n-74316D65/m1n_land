'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import { navItems } from 'app/constants/links'
import { entranceClasses } from 'app/lib/animation'
import { cn } from 'app/lib/utils'
import ZoneLabel from 'app/components/zone-label'
import ThemeToggle from 'app/components/ui/theme-toggle'

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header className={cn('zone', entranceClasses(0, 'fade'))}>
      <ZoneLabel label="NAV / ROUTING" unitId="SYS" />
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <Link
          href="/"
          className="font-sans text-sm font-extrabold uppercase tracking-[-0.03em] text-foreground transition-colors duration-[var(--duration-normal)] ease-out hover:text-accent focus-visible:outline-none"
        >
          M1n
        </Link>
        <nav
          className="flex items-center gap-0 overflow-x-auto scrollbar-none"
          id="nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map(({ path, name }, index) => {
            const isExternal = path.startsWith('http')
            const isActive = !isExternal && pathname !== null && pathname === path

            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1 border-l border-border px-3 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] transition-colors duration-[var(--duration-normal)] ease-out focus-visible:outline-none sm:px-4',
                  index === 0 && 'border-l-0 pl-0 sm:pl-0',
                  isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
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
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
