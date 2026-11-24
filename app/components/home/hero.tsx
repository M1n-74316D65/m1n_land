'use client'

import { useState } from 'react'
import { ArrowDown, MapPin, Pause, Play } from 'lucide-react'
import { cn } from 'app/lib/utils'

function HeroMarquee() {
  return (
    <span className="hero-marquee" aria-hidden="true">
      <span className="hero-track">
        <span className="hero-sequence">M1n M1n M1n&nbsp;</span>
        <span className="hero-sequence">M1n M1n M1n&nbsp;</span>
      </span>
    </span>
  )
}

export function Hero() {
  const [paused, setPaused] = useState(false)

  return (
    <section className={cn('hero', paused && 'motion-paused')} aria-labelledby="hero-title">
      <div className="hero-landmark">
        <h1 id="hero-title" className="hero-typography" aria-label="M1n">
          <span className="hero-monument" aria-hidden="true">
            <HeroMarquee />
          </span>
        </h1>
      </div>

      <div className="hero-support">
        <p className="hero-statement">
          I’m a developer in Galicia making small, useful open-source tools.
        </p>

        <div className="hero-details">
          <div className="hero-meta">
            <span>Rust / Go / TypeScript</span>
            <span className="hero-location">
              <MapPin className="size-4" aria-hidden="true" />
              Galicia, Spain
            </span>
          </div>

          <div className="hero-controls">
            <button
              type="button"
              className="motion-toggle"
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? (
                <Play className="size-4" aria-hidden="true" />
              ) : (
                <Pause className="size-4" aria-hidden="true" />
              )}
              {paused ? 'Play motion' : 'Pause motion'}
            </button>
          </div>

          <a href="#work" className="primary-action">
            See my projects
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
