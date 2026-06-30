import Link from 'next/link'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { designSystem } from 'app/lib/design-system'

interface ExternalLinkRowProps {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  className?: string
}

const ExternalLinkRow: React.FC<ExternalLinkRowProps> = ({
  href,
  label,
  icon: Icon,
  description,
  className,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-center gap-3 px-3 py-3 sm:px-4',
        designSystem.interactions.row,
        className
      )}
    >
      <Icon
        className={cn('h-4 w-4 shrink-0 text-muted-foreground', designSystem.interactions.icon)}
      />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-sm font-medium text-foreground',
            designSystem.interactions.link
          )}
        >
          {label}
        </span>
        {description && (
          <span className={`mt-0.5 block ${designSystem.typography.subtitle}`}>{description}</span>
        )}
      </span>
      <ArrowUpRight
        className={cn(
          'h-3.5 w-3.5 shrink-0 text-muted-foreground/40 opacity-100',
          designSystem.interactions.icon
        )}
      />
    </Link>
  )
}

export default ExternalLinkRow
