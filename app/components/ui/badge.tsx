import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'app/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-none border-[3px] border-border px-2.5 py-1 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow,transform] duration-100 overflow-hidden shadow-brutal',
  {
    variants: {
      variant: {
        default:
          'border-[3px] border-border bg-foreground text-background shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
        secondary:
          'border-[3px] border-border bg-muted text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-1 hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
        destructive:
          'border-[3px] border-destructive bg-destructive text-white shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
        outline:
          'border-[3px] border-border bg-muted text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:-translate-y-1 hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
