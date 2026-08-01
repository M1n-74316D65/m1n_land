'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { designSystem } from 'app/lib/design-system'
import { motionEnter, motionTransition } from 'app/lib/motion'
import { cn } from 'app/lib/utils'

interface StationInfoProps {
  isPlaying: boolean
  isLoading: boolean
  hasError: boolean
  className?: string
}

const StationInfo: React.FC<StationInfoProps> = ({ isPlaying, isLoading, hasError, className }) => {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : motionTransition.quick
  const status = hasError ? 'Offline' : isLoading ? 'Tuning' : isPlaying ? 'On air' : 'Ready'

  return (
    <div className={`flex items-start justify-between gap-6 ${className ?? ''}`}>
      <div>
        <p className={designSystem.typography.meta}>SomaFM</p>
        <h2 className="mt-1 font-sans text-xl font-extrabold uppercase tracking-[-0.04em] text-foreground sm:text-2xl">
          Deep Space One
        </h2>
        <p className={`mt-2 max-w-sm ${designSystem.typography.subtitle}`}>
          Deep ambient, experimental and space music.
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={status}
          {...motionEnter}
          transition={transition}
          className="flex shrink-0 items-center gap-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em]"
          role="status"
          aria-live="polite"
        >
          <span
            className={cn(
              'h-1.5 w-1.5',
              hasError ? 'bg-destructive' : isPlaying ? 'bg-phosphor' : 'bg-text-dim'
            )}
            aria-hidden="true"
          />
          <span className={isPlaying ? 'text-phosphor' : 'text-muted-foreground'}>{status}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default StationInfo
