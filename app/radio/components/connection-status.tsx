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
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          {...motionEnter}
          transition={transition}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3',
            className
          )}
        >
          <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className={designSystem.typography.subtitle}>Connecting to stream...</span>
        </motion.div>
      )}
      {error && (
        <motion.div
          key="error"
          {...motionEnter}
          transition={transition}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3',
            className
          )}
          role="alert"
          aria-live="assertive"
        >
          <WifiOff className="h-5 w-5 text-destructive" aria-hidden="true" />
          <span className="text-sm text-destructive" id="error-message">
            Unable to connect
          </span>
          <Button variant="outline" size="sm" onClick={onRetry} aria-describedby="error-message">
            Retry
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConnectionStatus
