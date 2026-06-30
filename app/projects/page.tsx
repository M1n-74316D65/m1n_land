import type { Metadata } from 'next'
import PageHeader from 'app/components/page-header'
import ProjectRow from 'app/components/project-row'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'
import { featuredProjects } from 'app/constants/links'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my open source projects including Miraviewer, Pastol, rusted-yadm, and RustedLessPass - built with Rust, Go, and modern web technologies.',
}

export default function Page() {
  const [featured, ...rest] = featuredProjects

  return (
    <section className={designSystem.spacing.page}>
      <PageHeader
        title="Projects"
        subtitle="Selected work and experiments."
        className={entranceClasses(0)}
      />
      <div className="space-y-4">
        <div className={entranceClasses(1, 'reveal')}>
          <ProjectRow
            href={featured.href}
            label={featured.label}
            description={featured.description}
            icon={featured.icon}
            tags={featured.tags}
            featured
          />
        </div>
        <ul className={cn(designSystem.surfaces.list, 'border-t-0')}>
          {rest.map((project, index) => (
            <li
              key={project.label}
              className={cn(
                index > 0 && 'border-t border-border/70',
                entranceClasses(index + 2, 'reveal')
              )}
            >
              <ProjectRow
                href={project.href}
                label={project.label}
                description={project.description}
                icon={project.icon}
                tags={project.tags}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
