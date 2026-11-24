'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
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
    <div className={className}>
      <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-medium leading-tight tracking-[-0.035em] text-foreground">
        Deep Space One
      </h2>
      <div className="mt-3 flex max-w-2xl flex-wrap items-center justify-between gap-3">
        <p className="text-base leading-relaxed text-muted-foreground">
          Deep ambient, experimental and space music, streamed by SomaFM.
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={status}
            {...motionEnter}
            transition={transition}
            className="flex shrink-0 items-center gap-2 text-[0.8125rem]"
            role="status"
            aria-live="polite"
          >
            <span
              className={cn(
                'size-1.5',
                hasError ? 'bg-destructive' : isPlaying ? 'bg-accent' : 'bg-text-dim'
              )}
              aria-hidden="true"
            />
            <span className={isPlaying ? 'text-accent' : 'text-muted-foreground'}>{status}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default StationInfo
