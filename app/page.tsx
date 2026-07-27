import Image from 'next/image'
import { BadgeCheck, BriefcaseBusiness, MapPin } from 'lucide-react'
import React from 'react'

import LinkSection from 'app/components/link-section'
import { entranceClasses } from 'app/lib/animation'
import { homeFeaturedProjects, socialLinks, externalLinks } from 'app/constants/links'

const Page: React.FC = () => {
  return (
    <section className="space-y-9">
      <header className={`text-center ${entranceClasses(0)}`}>
        <Image
          src="https://profiles.cache.lol/m1n/picture?v=1767470215"
          alt="M1n"
          width={167}
          height={167}
          priority
          className="mx-auto aspect-square rounded-xl object-cover"
        />
        <h1 className="mt-4 flex items-center justify-center gap-1.5 font-mono text-2xl font-semibold tracking-tight">
          M1n
          <BadgeCheck className="h-5 w-5 text-accent" aria-label="Verified profile" />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">he/him</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            Developer
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Galicia, Spain
          </span>
        </div>
        <p className="profile-bio mx-auto mt-6 max-w-md text-lg leading-relaxed">
          Hi, I&apos;m <strong>David</strong>, also known as M1n.
          <br />
          I&apos;m passionate about <strong>coding</strong>, <strong>games</strong>, and{' '}
          <strong>philosophy</strong>.
        </p>
      </header>

      <LinkSection
        className={entranceClasses(1)}
        staggerOffset={1}
        title="Projects"
        links={homeFeaturedProjects.map((project) => ({
          href: project.href,
          label: project.label,
          icon: project.icon,
          description: project.description,
        }))}
        viewAllHref="/projects"
        viewAllLabel="View all"
      />

      <LinkSection
        className={entranceClasses(2)}
        staggerOffset={3}
        title="Connect"
        links={socialLinks.map((link) => ({
          href: link.href,
          label: link.label,
          icon: link.icon,
        }))}
      />

      <LinkSection
        className={entranceClasses(3)}
        staggerOffset={5}
        title="Links"
        links={externalLinks.map((link) => ({
          href: link.href,
          label: link.label,
          icon: link.icon,
        }))}
      />
    </section>
  )
}

export default Page
