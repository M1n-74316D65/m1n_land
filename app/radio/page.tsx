import ErrorBoundary from 'app/components/ui/error-boundary'
import ZoneLabel from 'app/components/zone-label'
import RadioPlayerLoader from 'app/radio/radio-player-loader'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radio',
  description: 'Deep Space One by SomaFM',
}

export default function RadioPage() {
  return (
    <section className="flex flex-1 flex-col">
      <div className={cn('zone', entranceClasses(0))}>
        <ZoneLabel label="RADIO / RX" unitId="STREAM" />
        <div className="zone-body pb-0">
          <h1 className="display-type !text-[clamp(2.25rem,9vw,3.75rem)]">RX</h1>
          <p className="prose-desc mt-3 text-muted-foreground">
            Deep Space One — ambient / experimental.
          </p>
        </div>
      </div>

      <div className={cn('zone flex-1', entranceClasses(1, 'reveal'))}>
        <ZoneLabel label="PLAYER" unitId="AUD / 01" />
        <ErrorBoundary>
          <RadioPlayerLoader />
        </ErrorBoundary>
      </div>

      <p
        className={cn(
          'border-t border-border px-4 py-2.5 text-center sm:px-5',
          designSystem.typography.caption,
          entranceClasses(2, 'reveal')
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
