'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LoaderCircle, WifiOff } from 'lucide-react'

import { Button } from 'app/components/ui/button'
import { motionEnter, motionTransition } from 'app/lib/motion'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

interface ConnectionStatusProps {
  isLoading: boolean
  error: string | null
  onRetry: () => void
  className?: string
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isLoading,
  error,
  onRetry,
  className,
}) => {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : motionTransition.standard

  return (
    <div className={cn('flex min-h-8 items-center', className)}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            {...motionEnter}
            transition={transition}
            className="flex items-center gap-2 text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <LoaderCircle
              className={cn('h-4 w-4 text-muted-foreground', !reduceMotion && 'animate-spin')}
            />
            <span className={designSystem.typography.subtitle}>Connecting to stream...</span>
          </motion.div>
        )}
        {error && (
          <motion.div
            key="error"
            {...motionEnter}
            transition={transition}
            className="flex w-full items-center justify-between gap-4"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-destructive" aria-hidden="true" />
              <span className="text-sm text-destructive" id="error-message">
                Unable to connect
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={onRetry} aria-describedby="error-message">
              Retry
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ConnectionStatus
