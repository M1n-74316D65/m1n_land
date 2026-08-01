import type { Metadata } from 'next'
import ProjectRow from 'app/components/project-row'
import ZoneLabel from 'app/components/zone-label'
import { entranceClasses } from 'app/lib/animation'
import { featuredProjects } from 'app/constants/links'
import { cn } from 'app/lib/utils'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects by M1n. They use Rust, Go, and web technologies.',
}

export default function Page() {
  return (
    <section className="flex flex-1 flex-col">
      <div className={cn('zone', entranceClasses(0))}>
        <ZoneLabel label="PROJECTS" unitId="OPS / SEL" />
        <div className="zone-body">
          <h1 className="display-type !text-[clamp(2.25rem,9vw,3.75rem)]">Work</h1>
          <p className="mt-3 font-mono text-[0.8rem] leading-relaxed text-muted-foreground">
            Selected open-source tools and experiments.
          </p>
        </div>
      </div>

      <div className="zone flex-1">
        <ZoneLabel label="MANIFEST" unitId={`N=${featuredProjects.length}`} />
        <ul>
          {featuredProjects.map((project, index) => (
            <li
              key={project.label}
              className={cn(
                'border-b border-border last:border-b-0',
                entranceClasses(index + 1, 'reveal')
              )}
            >
              <ProjectRow
                href={project.href}
                label={project.label}
                description={project.description}
                icon={project.icon}
                tags={project.tags}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
