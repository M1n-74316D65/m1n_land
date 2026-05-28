'use client'

import Link from 'next/link'
import React from 'react'
import { groupedLinks, type LinkGroup, type LinkItem } from 'app/constants/links'

const GroupedLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {groupedLinks.map((group, index) => (
        <div
          key={group.title}
          className={`bg-card border-[3px] border-border shadow-brutal p-5 transition-all duration-100 hover:-translate-y-1 hover:shadow-brutal-lg hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0 animate-fade-in-up delay-${(index % 5) + 1}`}
        >
          <h3 className="font-mono text-xs font-black uppercase tracking-widest text-accent mb-4 border-l-[3px] border-accent pl-3">
            {group.title}
          </h3>
          <ul className="space-y-1.5">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-100 py-1.5 hover:-translate-y-px"
                >
                  <link.icon className="h-3.5 w-3.5" />
                  <span className="font-mono tracking-tight">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default GroupedLinks
export type { LinkGroup, LinkItem }
