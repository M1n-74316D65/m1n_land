import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'

import ExternalLinkRow from 'app/components/external-link-row'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

interface LinkSectionItem {
  href: string
  label: string
  icon: LucideIcon
  description?: string
}

interface LinkSectionProps {
  title: string
  links: readonly LinkSectionItem[]
  viewAllHref?: string
  viewAllLabel?: string
  className?: string
  staggerOffset?: number
}

const LinkSection: React.FC<LinkSectionProps> = ({
  title,
  links,
  viewAllHref,
  viewAllLabel = 'View all',
  className,
  staggerOffset = 0,
}) => {
  return (
    <section className={className}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className={designSystem.typography.sectionTitle}>{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className={cn(
              'inline-flex items-center gap-1 text-sm',
              designSystem.colors.text.link,
              'group/view'
            )}
          >
            {viewAllLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/view:translate-x-0.5" />
          </Link>
        )}
      </div>
      <ul>
        {links.map((link, index) => (
          <li
            key={link.href}
            className={cn(
              index > 0 && 'border-t border-border',
              entranceClasses(staggerOffset + index + 1, 'reveal')
            )}
          >
            <ExternalLinkRow
              href={link.href}
              label={link.label}
              icon={link.icon}
              description={link.description}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LinkSection
