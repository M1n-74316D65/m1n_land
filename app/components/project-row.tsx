import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { designSystem } from 'app/lib/design-system'

interface ProjectRowProps {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  tags?: readonly string[]
  className?: string
  index?: number
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  href,
  label,
  description,
  tags,
  className,
  index = 0,
}) => {
  const unit = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-start gap-3 px-4 py-4 transition-colors duration-[var(--duration-normal)] ease-out hover:bg-focus focus-visible:outline-none sm:gap-4 sm:px-5 sm:py-5',
        className
      )}
    >
      <span
        className="mt-0.5 shrink-0 font-mono text-[0.7rem] font-medium tracking-[0.1em] text-accent"
        aria-hidden="true"
      >
        {'>>>'}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className={cn(
              'font-mono text-[0.85rem] font-medium uppercase tracking-[0.06em] text-foreground',
              designSystem.interactions.link
            )}
          >
            {label}
          </span>
          <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-dim">
            D-{unit}
          </span>
        </div>
        {description && (
          <p className="prose-desc mt-1.5 text-[0.9rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-dim">
            {tags.join(' / ')}
          </p>
        )}
      </div>
    </Link>
  )
}

export default ProjectRow
