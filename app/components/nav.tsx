'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import { navItems } from 'app/constants/links'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header className={cn(designSystem.spacing.component.nav, 'pb-6', entranceClasses(0, 'fade'))}>
      <div className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className={cn(
            'font-mono text-sm font-semibold tracking-tight',
            designSystem.colors.text.linkEmphasis
          )}
        >
          M1n
        </Link>
        <nav
          className="flex items-center gap-3 overflow-x-auto scrollbar-none sm:gap-4"
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
                  'inline-flex shrink-0 items-center gap-1 border-b text-sm transition-[color,border-color] duration-[var(--duration-normal)] ease-out focus-visible:outline-none',
                  isActive
                    ? 'border-foreground font-medium text-foreground'
                    : cn(
                        'border-transparent text-muted-foreground hover:border-foreground',
                        designSystem.interactions.navItem
                      )
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
      </div>
    </header>
  )
})

export default Navbar
