import * as React from 'react'

import { cn } from 'app/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-none border border-input bg-card px-3 py-2 font-mono text-[0.8rem] tracking-[0.02em] text-foreground transition-colors outline-none placeholder:text-text-dim placeholder:uppercase disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-accent focus-visible:shadow-[inset_0_0_0_1px_var(--accent)]',
        'aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
