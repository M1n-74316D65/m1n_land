'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { designSystem } from 'app/lib/design-system'
import { motionEnter, motionTransition } from 'app/lib/motion'

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
        <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          SomaFM
        </p>
        <h2 className={`${designSystem.typography.pageTitle} text-xl sm:text-2xl`}>
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
          className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em]"
          role="status"
          aria-live="polite"
        >
          <span
            className={`h-1.5 w-1.5 ${hasError ? 'bg-destructive' : isPlaying ? 'bg-accent' : 'bg-muted-foreground'}`}
            aria-hidden="true"
          />
          <span className={isPlaying ? 'text-accent' : 'text-muted-foreground'}>{status}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default StationInfo
