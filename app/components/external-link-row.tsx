import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

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
      className={cn('group flex items-start gap-3 py-2', designSystem.interactions.row, className)}
    >
      <Icon
        className={cn('mt-0.5 h-4 w-4 shrink-0 text-foreground', designSystem.interactions.icon)}
      />
      <span className="min-w-0 flex-1">
        <span className="inline border-b border-dotted border-current text-sm font-normal text-foreground transition-colors duration-[var(--duration-normal)] ease-out group-hover:text-accent">
          {label}
        </span>
        {description && (
          <span className={`mt-0.5 block ${designSystem.typography.subtitle}`}>{description}</span>
        )}
      </span>
    </Link>
  )
}

export default ExternalLinkRow
