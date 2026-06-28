import React from 'react'
import Link from 'next/link'

import { Button } from 'app/components/ui/button'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'

const NotFound: React.FC = () => (
  <section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
    <h1 className={cn(designSystem.typography.display, entranceClasses(0))}>404</h1>
    <p className={cn(`mt-2 ${designSystem.typography.subtitle}`, entranceClasses(1, 'reveal'))}>
      Page not found.
    </p>
    <Button asChild className={cn('mt-6', entranceClasses(2, 'reveal'))}>
      <Link href="/">Return home</Link>
    </Button>
  </section>
)

export default NotFound
