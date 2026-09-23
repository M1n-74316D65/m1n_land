'use client'

import dynamic from 'next/dynamic'

const RadioPlayerClient = dynamic(() => import('./radio-player-client'), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="flex min-h-96 items-center justify-center rounded-lg border border-border-subtle bg-card p-6 text-sm text-muted-foreground"
    >
      Loading the player…
    </div>
  ),
})

export default function RadioPlayerLoader() {
  return <RadioPlayerClient />
}
