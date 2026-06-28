'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { designSystem } from 'app/lib/design-system'
import { motionEnter, motionTransition } from 'app/lib/motion'

interface StationInfoProps {
  isPlaying: boolean
  className?: string
}

const StationInfo: React.FC<StationInfoProps> = ({ isPlaying, className }) => {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : motionTransition.quick

  return (
    <div className={`flex flex-col items-center gap-2 text-center ${className ?? ''}`}>
      <h2 className={`${designSystem.typography.pageTitle} text-xl`}>Deep Space One</h2>

      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.div
            key="live"
            {...motionEnter}
            transition={transition}
            className="flex items-center gap-1.5"
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-medium text-accent">Live</span>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            {...motionEnter}
            transition={transition}
            className={designSystem.typography.subtitle}
          >
            SomaFM
          </motion.span>
        )}
      </AnimatePresence>

      <p className={`max-w-xs ${designSystem.typography.subtitle}`}>
        Deep ambient electronic, experimental and space music.
      </p>
    </div>
  )
}

export default StationInfo
