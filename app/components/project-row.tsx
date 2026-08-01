import Link from 'next/link'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { designSystem } from 'app/lib/design-system'

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
      className={cn(
        'group grid grid-cols-[2rem_1fr_auto] items-start gap-3 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-4 sm:py-5',
        designSystem.interactions.row,
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center" aria-hidden="true">
        <Icon className={cn('h-4 w-4 text-muted-foreground', designSystem.interactions.icon)} />
      </div>
      <div className="min-w-0 flex-1">
        <span className={cn('text-sm font-medium text-foreground', designSystem.interactions.link)}>
          {label}
        </span>
        {description && <p className={`mt-1 ${designSystem.typography.subtitle}`}>{description}</p>}
        {tags && tags.length > 0 && (
          <p className={`mt-2 ${designSystem.typography.mono}`}>{tags.join(' / ')}</p>
        )}
      </div>
      <ArrowUpRight
        className={cn(
          'mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/60',
          designSystem.interactions.icon
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

export default ProjectRow
