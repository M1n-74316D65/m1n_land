'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { featuredProjects } from 'app/constants/links'
import { cn } from 'app/lib/utils'

type FeaturedProject = (typeof featuredProjects)[number]

interface ProjectPreviewProps {
  project: FeaturedProject
  mobile?: boolean
}

function ProjectPreview({ project, mobile = false }: ProjectPreviewProps) {
  const Icon = project.icon

  return (
    <div
      className="project-preview"
      data-ui="terminal"
      data-project-preview={mobile ? undefined : project.label}
      aria-label={`${project.label} project preview`}
    >
      <div className="preview-bar">
        <span className="preview-title">
          <Icon className="size-5" aria-hidden="true" />
          {project.label}
        </span>
        <span>{project.category}</span>
      </div>
      <div className="preview-body">
        <p>{project.description}</p>
        <ul className="preview-tags" aria-label="Project technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ProjectIndex() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = featuredProjects[activeIndex]

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="section-heading" data-reveal>
        <h2 id="work-title">Selected work</h2>
      </div>

      <div className="work-layout">
        <ul className="project-list">
          {featuredProjects.map((project, index) => (
            <li key={project.href} data-reveal>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('project-link', activeIndex === index && 'is-active')}
                aria-label={`${project.label}: ${project.description} (opens in new tab)`}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <project.icon className="project-row-icon" aria-hidden="true" />
                <span className="project-name">{project.label}</span>
                <ArrowUpRight className="project-arrow" aria-hidden="true" />
              </a>
              <div className="mobile-project-preview">
                <ProjectPreview project={project} mobile />
              </div>
            </li>
          ))}
        </ul>

        <div className="desktop-project-preview" data-reveal>
          <ProjectPreview key={activeProject.href} project={activeProject} />
        </div>
      </div>
    </section>
  )
}
