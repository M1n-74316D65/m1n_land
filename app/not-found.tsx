import React from 'react'
import Link from 'next/link'

import { Button } from 'app/components/ui/button'
import ZoneLabel from 'app/components/zone-label'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

const NotFound: React.FC = () => (
  <section className="flex flex-1 flex-col">
    <div className={cn('zone', entranceClasses(0))}>
      <ZoneLabel label="NOT FOUND" unitId="404" />
      <div className="zone-body flex flex-col items-start py-10">
        <h1 className={cn(designSystem.typography.display, entranceClasses(0))}>404</h1>
        <p className={cn(`mt-3 ${designSystem.typography.subtitle}`, entranceClasses(1, 'reveal'))}>
          Route not found. Coordinates invalid.
        </p>
        <Button asChild className={cn('mt-6', entranceClasses(2, 'reveal'))}>
          <Link href="/">Return home {'>>>'}</Link>
        </Button>
      </div>
    </div>
  </section>
)

export default NotFound
