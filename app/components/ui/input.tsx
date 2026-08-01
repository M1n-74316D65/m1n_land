import * as React from 'react'

import { cn } from 'app/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-none border border-input bg-card px-3 py-1 font-mono text-[0.8rem] uppercase tracking-[0.04em] text-foreground transition-colors outline-none selection:bg-accent selection:text-accent-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-dim disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-accent focus-visible:shadow-[inset_0_0_0_1px_var(--accent)]',
        'aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }
