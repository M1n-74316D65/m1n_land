import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export function GET() {
  return new ImageResponse(
    <div
      tw="flex flex-col w-full h-full items-stretch justify-between"
      style={{ backgroundColor: '#0a0a0a', color: '#eaeaea' }}
    >
      <div
        tw="flex items-center justify-between px-10 py-4"
        style={{ backgroundColor: '#121212', borderBottom: '1px solid #2a2a2a' }}
      >
        <span tw="text-sm font-mono tracking-widest uppercase" style={{ color: '#8a8a8a' }}>
          [ IDENTITY ]
        </span>
        <span tw="text-sm font-mono tracking-widest uppercase" style={{ color: '#5c5c5c' }}>
          <span style={{ color: '#e61919' }}>/// </span>UNIT / ID-01
        </span>
      </div>

      <div tw="flex flex-col flex-1 justify-center px-10 py-12">
        <h1
          tw="text-8xl font-extrabold uppercase m-0"
          style={{ letterSpacing: '-0.05em', lineHeight: 0.9 }}
        >
          M1n
        </h1>
        <p tw="text-xl font-mono mt-6 uppercase tracking-widest m-0" style={{ color: '#8a8a8a' }}>
          Developer / Open Source / Galicia
        </p>
      </div>

      <div
        tw="flex items-center justify-between px-10 py-4"
        style={{ borderTop: '1px solid #2a2a2a' }}
      >
        <span tw="text-sm font-mono tracking-widest uppercase" style={{ color: '#5c5c5c' }}>
          m1n.land
        </span>
        <span tw="text-sm font-mono tracking-widest uppercase" style={{ color: '#e61919' }}>
          {'>>>'} SYS
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
