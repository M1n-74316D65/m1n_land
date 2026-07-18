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
    <header
      className={cn(
        designSystem.spacing.component.nav,
        'border-b border-border-subtle pb-5',
        entranceClasses(0, 'fade')
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className={cn(
            'font-sans text-sm font-medium tracking-tight',
            designSystem.colors.text.linkEmphasis
          )}
        >
          M1n
        </Link>
        <nav
          className="flex items-center gap-1 overflow-x-auto scrollbar-none sm:gap-2"
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
                  'inline-flex shrink-0 items-center gap-1 px-2.5 py-1.5 text-sm transition-[color,background-color] duration-[var(--duration-normal)] ease-out focus-visible:outline-none',
                  isActive
                    ? 'bg-focus font-medium text-foreground shadow-[inset_0_-1px_0_0_var(--accent)]'
                    : cn('text-muted-foreground', designSystem.interactions.navItem)
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
