import Link from 'next/link'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

import { cn } from 'app/lib/utils'

interface ProjectRowProps {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  tags?: readonly string[]
  className?: string
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  href,
  label,
  icon: Icon,
  description,
  tags,
  className,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      className={cn(
        'group flex items-start gap-4 rounded-md px-2 py-6 transition-colors duration-[var(--duration-normal)] ease-out hover:bg-card focus-visible:bg-card sm:gap-5 sm:px-3 sm:py-7',
        className
      )}
    >
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-card text-muted-foreground transition-colors group-hover:text-accent"
        aria-hidden="true"
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="break-words font-sans text-xl font-medium tracking-[-0.025em] text-foreground sm:text-2xl">
            {label}
          </h3>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-normal)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
        {description && <p className="prose-desc mt-2 max-w-md">{description}</p>}
        {tags && tags.length > 0 && (
          <p className="mt-3 font-mono text-[0.6875rem] text-text-dim">{tags.join(' · ')}</p>
        )}
      </div>
    </Link>
  )
}

export default ProjectRow
