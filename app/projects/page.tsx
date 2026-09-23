import type { Metadata } from 'next'
import ProjectRow from 'app/components/project-row'
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
      <header
        className={cn('border-b border-border pb-8 pt-4 sm:pb-10 sm:pt-6', entranceClasses(0))}
      >
        <h1 className="display-type !text-[clamp(3rem,10vw,4.5rem)]">Projects</h1>
        <p className="prose-desc mt-5 max-w-md">
          Open-source tools and experiments. Small things built to be useful.
        </p>
      </header>

      <section className="pt-6 sm:pt-8" aria-labelledby="selected-work-title">
        <div className="flex items-baseline justify-between gap-4 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
          <h2 id="selected-work-title">Selected work</h2>
          <span>{String(featuredProjects.length).padStart(2, '0')} projects</span>
        </div>
        <ul className="divide-y divide-border-subtle">
          {featuredProjects.map((project, index) => (
            <li key={project.label} className={entranceClasses(index + 1, 'reveal')}>
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
      </section>
    </section>
  )
}
