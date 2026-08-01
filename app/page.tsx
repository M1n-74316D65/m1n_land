import Image from 'next/image'
import { BadgeCheck, BriefcaseBusiness, MapPin } from 'lucide-react'
import React from 'react'

import LinkSection from 'app/components/link-section'
import { entranceClasses } from 'app/lib/animation'
import { socialLinks, externalLinks } from 'app/constants/links'

const Page: React.FC = () => {
  return (
    <section className="flex flex-1 flex-col justify-between gap-5 sm:gap-8">
      <header
        className={`grid grid-cols-[5rem_1fr] items-center gap-4 border-y border-border py-4 sm:grid-cols-[6rem_1fr] sm:gap-6 sm:py-5 ${entranceClasses(0)}`}
      >
        <Image
          src="https://profiles.cache.lol/m1n/picture?v=1767470215"
          alt="M1n"
          width={112}
          height={112}
          priority
          sizes="(min-width: 640px) 96px, 80px"
          className="aspect-square h-20 w-20 object-cover sm:h-24 sm:w-24"
        />
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h1 className="flex items-center gap-1.5 font-mono text-2xl font-semibold tracking-tight">
              M1n
              <BadgeCheck className="h-5 w-5 text-accent" aria-label="Verified profile" />
            </h1>
            <span className="text-xs text-muted-foreground">he/him</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseBusiness className="h-3.5 w-3.5" aria-hidden="true" />
              Developer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Galicia, Spain
            </span>
          </div>
          <p className="profile-bio mt-3 text-sm leading-relaxed sm:text-base">
            I am <strong>David</strong>, also known as M1n. I write <strong>code</strong> and enjoy{' '}
            <strong>games</strong> and <strong>philosophy</strong>.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-x-8">
        <LinkSection
          className={`[&_a]:py-1.5 ${entranceClasses(1)}`}
          staggerOffset={1}
          title="Connect"
          links={socialLinks.map((link) => ({
            href: link.href,
            label: link.label,
            icon: link.icon,
          }))}
        />

        <LinkSection
          className={`[&_a]:py-1.5 ${entranceClasses(2)}`}
          staggerOffset={3}
          title="Links"
          links={externalLinks.map((link) => ({
            href: link.href,
            label: link.label,
            icon: link.icon,
          }))}
        />
      </div>
    </section>
  )
}

export default Page
