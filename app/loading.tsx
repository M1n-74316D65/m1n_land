import { Skeleton } from 'app/components/ui/skeleton'
import { entranceClasses } from 'app/lib/animation'
import { cn } from 'app/lib/utils'

export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading content" className="space-y-4">
      <Skeleton className={cn('h-8 w-48', entranceClasses(0, 'reveal'))} />
      <div className="space-y-2">
        <Skeleton className={cn('h-4 w-full', entranceClasses(1, 'reveal'))} />
        <Skeleton className={cn('h-4 w-4/5', entranceClasses(2, 'reveal'))} />
      </div>
      <Skeleton className={cn('h-24 w-full rounded-lg', entranceClasses(3, 'reveal'))} />
    </section>
  )
}
