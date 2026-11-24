import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import ErrorBoundary from 'app/components/ui/error-boundary'
import RadioPlayerLoader from 'app/components/radio/radio-player-loader'

export function RadioSection() {
  return (
    <section id="radio" className="radio-section" aria-labelledby="radio-title">
      <div className="section-heading" data-reveal>
        <h2 id="radio-title">Radio</h2>
        <p className="radio-heading-note">Deep Space One by SomaFM</p>
      </div>

      <div data-reveal>
        <ErrorBoundary>
          <RadioPlayerLoader />
        </ErrorBoundary>
      </div>

      <p className="radio-credit" data-reveal>
        <span>
          Streamed by{' '}
          <a href="https://somafm.com" target="_blank" rel="noopener noreferrer">
            SomaFM
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </span>
        <a href="https://somafm.com/support/" target="_blank" rel="noopener noreferrer">
          Support SomaFM
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </p>
    </section>
  )
}
