'use client'

import dynamic from 'next/dynamic'

const RadioPlayerClient = dynamic(() => import('./radio-player-client'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-64 items-center justify-center border-t border-border p-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-dim sm:min-h-72">
      Init RX…
    </div>
  ),
})

export default function RadioPlayerLoader() {
  return <RadioPlayerClient />
}
