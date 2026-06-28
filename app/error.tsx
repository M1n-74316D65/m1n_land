'use client'

import React from 'react'

import { Button } from 'app/components/ui/button'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="flex flex-col items-center justify-center py-12 text-center">
      <h2 className={cn(designSystem.typography.pageTitle, entranceClasses(0))}>
        Something went wrong
      </h2>
      <p
        className={cn(
          `mt-2 max-w-sm ${designSystem.typography.subtitle}`,
          entranceClasses(1, 'reveal')
        )}
      >
        An error occurred while loading this page. You can try again.
      </p>
      <Button className={cn('mt-6', entranceClasses(2, 'reveal'))} onClick={reset}>
        Try again
      </Button>
      {error?.message && (
        <details className={cn('mt-8 w-full max-w-md text-left', entranceClasses(3, 'reveal'))}>
          <summary className={`cursor-pointer ${designSystem.typography.caption}`}>
            Error details
          </summary>
          <pre
            className={`mt-2 overflow-auto rounded-lg border border-border bg-muted p-3 text-xs ${designSystem.typography.mono}`}
          >
            {error.message}
          </pre>
        </details>
      )}
    </section>
  )
}
