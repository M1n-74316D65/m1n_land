import dynamic from 'next/dynamic'
import ErrorBoundary from 'app/components/ui/error-boundary'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'
import type { Metadata } from 'next'

const RadioPlayerClient = dynamic(() => import('./radio-player-client'))

export const metadata: Metadata = {
  title: 'Radio',
  description: 'Deep Space One by SomaFM',
}

export default function RadioPage() {
  return (
    <section className={designSystem.spacing.page}>
      <div className={cn(entranceClasses(0, 'reveal'))}>
        <ErrorBoundary>
          <RadioPlayerClient />
        </ErrorBoundary>
      </div>
      <p
        className={cn(
          `text-center ${designSystem.typography.caption}`,
          entranceClasses(1, 'reveal')
        )}
      >
        Streamed by{' '}
        <a
          href="https://somafm.com"
          target="_blank"
          rel="noopener noreferrer"
          className={designSystem.colors.text.linkEmphasis}
        >
          SomaFM
        </a>
        {' / '}
        <a
          href="https://somafm.com/support/"
          target="_blank"
          rel="noopener noreferrer"
          className={designSystem.colors.text.linkEmphasis}
        >
          Support
        </a>
      </p>
    </section>
  )
}
