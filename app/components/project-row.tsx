import Link from 'next/link'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

import { Card, CardContent } from 'app/components/ui/card'
import { cn } from 'app/lib/utils'
import { designSystem } from 'app/lib/design-system'

interface ProjectRowProps {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  tags?: readonly string[]
  featured?: boolean
  className?: string
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  href,
  label,
  icon: Icon,
  description,
  tags,
  featured = false,
  className,
}) => {
  const content = (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group -mx-2 flex items-start gap-3 px-2 py-3',
        !featured && designSystem.interactions.row,
        featured && 'py-1',
        className
      )}
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 transition-colors duration-200 ease-out group-hover:border-accent/30">
        <Icon className={cn('h-4 w-4 text-muted-foreground', designSystem.interactions.icon)} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn('text-sm font-medium text-foreground', designSystem.interactions.link)}
          >
            {label}
          </span>
          <ArrowUpRight
            className={cn(
              'h-3.5 w-3.5 shrink-0 text-muted-foreground/40',
              designSystem.interactions.icon
            )}
          />
        </div>
        {description && <p className={`mt-1 ${designSystem.typography.subtitle}`}>{description}</p>}
        {tags && tags.length > 0 && (
          <p className={`mt-2 ${designSystem.typography.mono}`}>{tags.join(' · ')}</p>
        )}
      </div>
    </Link>
  )

  if (featured) {
    return (
      <Card className={cn('gap-0 py-4 shadow-sm', designSystem.interactions.card)}>
        <CardContent className="px-4 pt-0 pb-0">{content}</CardContent>
      </Card>
    )
  }

  return content
}

export default ProjectRow
