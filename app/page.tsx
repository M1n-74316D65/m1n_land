import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'
import React from 'react'

import ZoneLabel from 'app/components/zone-label'
import { entranceClasses } from 'app/lib/animation'
import { socialLinks, externalLinks, techStack } from 'app/constants/links'
import { cn } from 'app/lib/utils'

const Page: React.FC = () => {
  return (
    <section className="flex flex-1 flex-col">
      <div className={cn('zone', entranceClasses(0))}>
        <ZoneLabel label="IDENTITY" unitId="UNIT / ID-01" />
        <div className="zone-body">
          <div className="grid grid-cols-[4.5rem_1fr] items-start gap-4 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
            <Image
              src="https://profiles.cache.lol/m1n/picture?v=1767470215"
              alt="M1n"
              width={112}
              height={112}
              priority
              sizes="(min-width: 640px) 88px, 72px"
              className="aspect-square h-[4.5rem] w-[4.5rem] border border-border object-cover sm:h-[5.5rem] sm:w-[5.5rem]"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <h1 className="display-type !text-[clamp(2.5rem,10vw,4rem)]">M1n</h1>
                <BadgeCheck
                  className="mb-1.5 h-5 w-5 text-accent sm:mb-2"
                  aria-label="Verified profile"
                />
              </div>
              <dl className="mt-3 grid gap-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground sm:text-[0.75rem]">
                <div className="flex gap-3">
                  <dt className="text-text-dim">Role</dt>
                  <dd className="text-foreground">Developer</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-text-dim">Loc</dt>
                  <dd className="text-foreground">Galicia / ES</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-text-dim">Pron</dt>
                  <dd className="text-foreground">he/him</dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="profile-bio mt-5 border-t border-border pt-4">
            I am <strong>David</strong>, also known as M1n. I write <strong>code</strong> and enjoy{' '}
            <strong>games</strong> and <strong>philosophy</strong>.
          </p>

          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-dim">
            Stack // {techStack.join(' / ')}
          </p>
        </div>
      </div>

      <div className={cn('zone', entranceClasses(1, 'reveal'))}>
        <ZoneLabel label="CONNECT" unitId="NET" />
        <ul className="divide-y divide-border px-4 sm:px-5">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="cmd-row">
                <span className="min-w-0 flex-1 truncate">{link.label}</span>
                <span className="shrink-0 text-text-dim" aria-hidden="true">
                  EXT
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn('zone', entranceClasses(2, 'reveal'))}>
        <ZoneLabel label="LINKS" unitId="EXT" />
        <ul className="divide-y divide-border px-4 sm:px-5">
          {externalLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="cmd-row">
                <span className="min-w-0 flex-1 truncate">{link.label}</span>
                <span className="shrink-0 text-text-dim" aria-hidden="true">
                  EXT
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page
