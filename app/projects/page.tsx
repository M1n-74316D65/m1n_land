import type { Metadata } from 'next'
import ProjectRow from 'app/components/project-row'
import { entranceClasses } from 'app/lib/animation'
import { featuredProjects } from 'app/constants/links'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects by M1n. They use Rust, Go, and web technologies.',
}

export default function Page() {
  return (
    <section className="flex flex-1 flex-col">
      <header className={`border-y border-border py-4 ${entranceClasses(0)}`}>
        <h1 className="font-mono text-2xl font-semibold tracking-tight text-balance">Projects</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Selected work and experiments.
        </p>
      </header>

      <ul className="divide-y divide-border/70 border-b border-border">
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
  )
}
