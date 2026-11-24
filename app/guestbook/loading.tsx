import { Skeleton } from 'app/components/ui/skeleton'
import ZoneLabel from 'app/components/zone-label'
import { entranceClasses } from 'app/lib/animation'
import { cn } from 'app/lib/utils'

export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading content" className="flex flex-1 flex-col">
      <div className="zone">
        <ZoneLabel label="LOADING" unitId="WAIT" />
        <div className="zone-body space-y-4">
          <Skeleton className={cn('h-10 w-40', entranceClasses(0, 'reveal'))} />
          <Skeleton className={cn('h-3 w-full', entranceClasses(1, 'reveal'))} />
          <Skeleton className={cn('h-3 w-4/5', entranceClasses(2, 'reveal'))} />
          <Skeleton className={cn('h-24 w-full', entranceClasses(3, 'reveal'))} />
        </div>
      </div>
    </section>
  )
}
