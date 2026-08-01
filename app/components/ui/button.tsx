import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'app/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-[0.75rem] font-medium uppercase tracking-[0.08em] transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-normal)] ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--accent)]",
  {
    variants: {
      variant: {
        default:
          'border border-accent bg-accent text-accent-foreground hover:bg-accent-hover hover:border-accent-hover',
        destructive:
          'border border-destructive bg-destructive text-destructive-foreground hover:bg-accent-hover',
        outline:
          'border border-border bg-transparent text-foreground hover:border-accent hover:bg-focus hover:text-foreground',
        secondary:
          'border border-border bg-card text-foreground hover:bg-focus hover:border-muted-foreground',
        ghost:
          'border border-transparent text-muted-foreground hover:bg-focus hover:text-foreground',
        link: 'text-foreground underline-offset-4 hover:text-accent hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
