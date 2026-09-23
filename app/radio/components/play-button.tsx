'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LoaderCircle, Pause, Play } from 'lucide-react'

import { Button } from 'app/components/ui/button'
import { motionFade, motionTransition } from 'app/lib/motion'
import { cn } from 'app/lib/utils'

interface PlayButtonProps {
  isPlaying: boolean
  isLoading: boolean
  disabled?: boolean
  onToggle: () => void
  className?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  isLoading,
  disabled = false,
  onToggle,
  className,
}) => {
  const reduceMotion = useReducedMotion()
  const ariaLabel = isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'
  const iconTransition = reduceMotion ? { duration: 0 } : motionTransition.quick

  return (
    <motion.div
      className="w-full shrink-0 sm:w-auto"
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.98 }}
    >
      <Button
        type="button"
        variant="default"
        onClick={onToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={isPlaying}
        className={cn(
          'h-12 w-full rounded-md px-5 font-sans text-sm font-medium normal-case tracking-normal sm:w-36',
          className
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.span key="loading" {...motionFade} transition={iconTransition}>
              <LoaderCircle className={cn('h-6 w-6', !reduceMotion && 'animate-spin')} />
            </motion.span>
          ) : isPlaying ? (
            <motion.span key="pause" {...motionFade} transition={iconTransition}>
              <Pause className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="play" {...motionFade} transition={iconTransition}>
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </motion.span>
          )}
        </AnimatePresence>
        <span>{isLoading ? 'Connecting…' : isPlaying ? 'Pause radio' : 'Play radio'}</span>
      </Button>
    </motion.div>
  )
}

export default PlayButton
