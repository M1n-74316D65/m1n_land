'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowDown, MapPin, Pause, Play } from 'lucide-react'
import { cn } from 'app/lib/utils'

const seasons = [
  { id: 'winter', name: 'Winter', src: '/meadow-winter.webp' },
  { id: 'spring', name: 'Spring', src: '/meadow-spring.webp' },
  { id: 'summer', name: 'Summer', src: '/meadow.webp' },
  { id: 'autumn', name: 'Autumn', src: '/meadow-autumn.webp' },
] as const

export type Season = (typeof seasons)[number]['id']

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

interface SeasonalHeroProps {
  initialSeason: Season
}

export function SeasonalHero({ initialSeason }: SeasonalHeroProps) {
  const [activeSeason, setActiveSeason] = useState<Season>(initialSeason)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const browserSeason = document.documentElement.dataset.season
    if (seasons.some((season) => season.id === browserSeason)) {
      setActiveSeason(browserSeason as Season)
    }
  }, [])

  const selectSeason = (season: Season) => {
    setActiveSeason(season)
    document.documentElement.dataset.season = season
  }

  return (
    <section
      className={cn('seasonal-hero', paused && 'motion-paused')}
      aria-labelledby="hero-title"
    >
      <div className="hero-landmark">
        <div className="season-frame">
          {seasons.map((season) => (
            <Image
              key={season.id}
              src={season.src}
              alt={`${season.name} meadow landscape`}
              fill
              priority={season.id === initialSeason}
              sizes="(max-width: 640px) 52vw, 272px"
              className={cn('season-image', activeSeason === season.id && 'is-active')}
              data-season-image={season.id}
              aria-hidden={activeSeason !== season.id}
            />
          ))}
        </div>

        <h1 id="hero-title" className="hero-typography" aria-label="M1n">
          <span className="hero-monument" aria-hidden="true">
            <HeroMarquee />
          </span>
          <span className="hero-monument hero-monument-clipped" aria-hidden="true">
            <HeroMarquee />
          </span>
        </h1>
      </div>

      <div className="hero-support">
        <p className="hero-statement">
          David is a developer in Galicia making small, useful open-source tools.
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
            <div className="season-switcher" role="group" aria-label="Choose a landscape season">
              {seasons.map((season) => (
                <button
                  key={season.id}
                  type="button"
                  className="season-button"
                  data-season-button={season.id}
                  aria-pressed={activeSeason === season.id}
                  onClick={() => selectSeason(season.id)}
                >
                  {season.name}
                </button>
              ))}
            </div>
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

      <p className="sr-only" role="status" aria-live="polite">
        {activeSeason} landscape selected.
      </p>
    </section>
  )
}
