import { FC, ReactNode } from 'react'
import './global.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/outfit/800.css'
import type { Metadata, Viewport } from 'next'
import Navbar from 'app/components/nav'
import { baseUrl } from 'app/constants/baseUrl'
import { cn } from 'app/lib/utils'

const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'M1n',
    template: '%s | M1n',
  },
  description: 'Personal site of M1n, a developer who uses Linux and makes open-source projects.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'M1n',
    description: 'Personal site of M1n, a developer who uses Linux and makes open-source projects.',
    url: baseUrl,
    siteName: 'M1n',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M1n',
    description: 'Personal site of M1n, a developer who uses Linux and makes open-source projects.',
  },
}

export const metadata = siteMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

interface RootLayoutProps {
  children: ReactNode
}

const themeScript = `
(() => {
  try {
    document.documentElement.classList.add('dark')
  } catch (error) {
    console.error('Theme bootstrap error', error)
  }
})()
`

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const htmlClassName = cn('dark bg-background text-foreground')

  return (
    <html lang="en" className={htmlClassName}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'M1n',
              url: baseUrl,
              sameAs: ['https://m1n.omg.lol'],
              description: 'Developer who uses Linux and makes open-source projects',
              knowsAbout: ['Rust', 'Go', 'Next.js', 'Linux', 'Neovim', 'Zed'],
              jobTitle: 'Developer',
            }),
          }}
        />
      </head>
      <body className="crt-shell font-mono antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:border focus:border-accent focus:bg-card focus:px-3 focus:py-2 focus:font-mono focus:text-[0.7rem] focus:uppercase focus:tracking-[0.1em] focus:text-foreground"
        >
          Skip to main content
        </a>
        <div className="flex min-h-[100dvh] w-full flex-col px-3 py-[clamp(1.25rem,5vw,3.5rem)] sm:px-6">
          <div className="crt-frame crt-frame-footer flex min-h-0 flex-1 flex-col">
            <main id="main-content" className="flex flex-1 flex-col">
              <Navbar />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
