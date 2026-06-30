import React from 'react'

import { cn } from 'app/lib/utils'
import { designSystem } from 'app/lib/design-system'

interface PageHeaderProps {
  title: string
  subtitle?: string
  underline?: boolean
  animate?: boolean
  className?: string
  srOnly?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  underline = false,
  animate = false,
  className,
  srOnly = false,
}) => {
  return (
    <header
      className={cn(
        designSystem.spacing.component.md,
        animate && designSystem.animations.entrance.enter,
        srOnly && 'sr-only',
        className
      )}
    >
      <h1
        className={cn(
          designSystem.typography.pageTitle,
          underline && 'underline decoration-accent/40 underline-offset-4'
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={cn('mt-2 max-w-prose', designSystem.typography.subtitle)}>{subtitle}</p>
      )}
    </header>
  )
}

export default PageHeader
