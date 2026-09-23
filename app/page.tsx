import Image from 'next/image'
import React from 'react'

import { entranceClasses } from 'app/lib/animation'
import { socialLinks, externalLinks, techStack } from 'app/constants/links'
import { cn } from 'app/lib/utils'

const Page: React.FC = () => {
  return (
    <section className="flex flex-1 flex-col">
      <div className={cn('zone', entranceClasses(0))}>
        <div className="pb-8 pt-4 sm:pb-10 sm:pt-6">
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0">
              <h1 className="display-type !text-[clamp(4.5rem,14vw,6rem)]">M1n</h1>
            </div>
            <Image
              src="https://profiles.cache.lol/m1n/picture?v=1767470215"
              alt="M1n"
              width={112}
              height={112}
              priority
              sizes="(min-width: 640px) 96px, 72px"
              className="aspect-square size-[4.5rem] shrink-0 rounded-lg border border-border-subtle object-cover sm:size-24"
            />
          </div>

          <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.6875rem] tracking-[0.02em] text-muted-foreground">
            <span>Developer</span>
            <span aria-hidden="true">/</span>
            <span>Galicia, ES</span>
            <span aria-hidden="true">/</span>
            <span>he/him</span>
          </p>

          <p className="profile-bio mt-6 sm:mt-7">
            I am <strong>David</strong>, also known as M1n. I write <strong>code</strong> and enjoy{' '}
            <strong>games</strong> and <strong>philosophy</strong>.
          </p>

          <ul
            aria-label="Tools I use"
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.6875rem] text-text-dim"
          >
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-7 pt-6 sm:grid-cols-2 sm:gap-8 sm:pt-8">
        <section className={entranceClasses(1, 'reveal')} aria-labelledby="connect-title">
          <h2
            id="connect-title"
            className="pb-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Connect
          </h2>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="cmd-row">
                  <link.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={cn(
            'sm:border-l sm:border-border-subtle sm:pl-8',
            entranceClasses(2, 'reveal')
          )}
          aria-labelledby="links-title"
        >
          <h2
            id="links-title"
            className="pb-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Elsewhere
          </h2>
          <ul>
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="cmd-row">
                  <link.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

export default Page
