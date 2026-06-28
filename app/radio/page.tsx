import dynamic from 'next/dynamic'
import ErrorBoundary from 'app/components/ui/error-boundary'
import PageHeader from 'app/components/page-header'
import { Card, CardContent } from 'app/components/ui/card'
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
      <PageHeader
        title="Radio"
        subtitle="Deep Space One by SomaFM"
        className={entranceClasses(0)}
      />
      <Card className={cn(designSystem.interactions.card, entranceClasses(1, 'reveal'))}>
        <CardContent className="pt-6">
          <ErrorBoundary>
            <RadioPlayerClient />
          </ErrorBoundary>
        </CardContent>
      </Card>
      <p
        className={cn(
          `text-center ${designSystem.typography.caption}`,
          entranceClasses(2, 'reveal')
        )}
      >
        Powered by{' '}
        <a
          href="https://somafm.com"
          target="_blank"
          rel="noopener noreferrer"
          className={designSystem.colors.text.linkEmphasis}
        >
          SomaFM
        </a>
        {' · '}
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
