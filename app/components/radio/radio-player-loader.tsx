'use client'

import dynamic from 'next/dynamic'

const RadioPlayerClient = dynamic(() => import('./radio-player-client'), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="flex min-h-96 flex-col items-start justify-center bg-card p-6 sm:p-7"
    >
      <p className="text-[0.8125rem] uppercase tracking-[0.08em] text-muted-foreground">SomaFM</p>
      <p className="mt-4 text-xl font-medium tracking-[-0.02em]">Deep Space One</p>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
        Deep ambient, experimental and space music.{' '}
        <a
          href="https://somafm.com/deepspaceone/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:text-accent"
        >
          Open the live stream on SomaFM
        </a>
      </p>
    </div>
  ),
})

export default function RadioPlayerLoader() {
  return <RadioPlayerClient />
}
