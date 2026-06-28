import React from 'react'

import LinkSection from 'app/components/link-section'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { techStack, homeFeaturedProjects, socialLinks, externalLinks } from 'app/constants/links'

const Page: React.FC = () => {
  return (
    <section className={designSystem.spacing.page}>
      <div className={entranceClasses(0)}>
        <h1 className={designSystem.typography.display}>
          Hi, I&apos;m <span className="text-accent">M1n</span>.
        </h1>
        <p
          className={`mt-3 max-w-lg ${designSystem.typography.body} ${designSystem.typography.secondaryText}`}
        >
          I love coding, thinking about philosophy, and playing games.
          <br />
          Linux user. Rust as the most entertaining language.
        </p>
        <p className={`mt-4 ${designSystem.typography.meta}`}>{techStack.join(' · ')}</p>
      </div>

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
