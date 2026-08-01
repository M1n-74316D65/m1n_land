'use client'

import React from 'react'

import { Button } from 'app/components/ui/button'
import ZoneLabel from 'app/components/zone-label'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="flex flex-1 flex-col">
      <div className={cn('zone', entranceClasses(0))}>
        <ZoneLabel label="FAULT" unitId="ERR / SYS" />
        <div className="zone-body flex flex-col items-start py-10">
          <h2 className={designSystem.typography.pageTitle}>Fault detected</h2>
          <p className={cn('mt-3 max-w-sm', designSystem.typography.subtitle)}>
            An error occurred while loading this page. You can try again.
          </p>
          <Button className={cn('mt-6', entranceClasses(2, 'reveal'))} onClick={reset}>
            Retry {'>>>'}
          </Button>
          {error?.message && (
            <details className={cn('mt-8 w-full max-w-md', entranceClasses(3, 'reveal'))}>
              <summary className={`cursor-pointer ${designSystem.typography.caption}`}>
                Error details
              </summary>
              <pre className="mt-2 overflow-auto border border-border bg-card p-3 font-mono text-[0.7rem] text-muted-foreground">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </section>
  )
}
