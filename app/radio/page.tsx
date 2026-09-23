import ErrorBoundary from 'app/components/ui/error-boundary'
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
      <header className={cn('pb-8 pt-4 sm:pb-10 sm:pt-6', entranceClasses(0))}>
        <h1 className="display-type !text-[clamp(3rem,10vw,4.5rem)]">Radio</h1>
        <p className="prose-desc mt-5">A little space to listen. Ambient and experimental music.</p>
      </header>

      <div className={entranceClasses(1, 'reveal')}>
        <ErrorBoundary>
          <RadioPlayerLoader />
        </ErrorBoundary>
      </div>

      <p
        className={cn(
          'mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[0.6875rem] text-muted-foreground',
          entranceClasses(2, 'reveal')
        )}
      >
        <span>
          Streamed by{' '}
          <a
            href="https://somafm.com"
            target="_blank"
            rel="noopener noreferrer"
            className={designSystem.colors.text.linkEmphasis}
          >
            SomaFM
          </a>
        </span>
        <a
          href="https://somafm.com/support/"
          target="_blank"
          rel="noopener noreferrer"
          className={designSystem.colors.text.linkEmphasis}
        >
          Support SomaFM ↗
        </a>
      </p>
    </section>
  )
}
