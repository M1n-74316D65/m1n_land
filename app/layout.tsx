import { FC, ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import './global.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/800.css'
import SiteHeader from 'app/components/site-header'
import { baseUrl } from 'app/constants/baseUrl'

const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'M1n',
    template: '%s | M1n',
  },
  description: 'My personal site — I’m a developer who uses Linux and makes open-source projects.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'M1n',
    description:
      'My personal site — I’m a developer who uses Linux and makes open-source projects.',
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
    description:
      'My personal site — I’m a developer who uses Linux and makes open-source projects.',
  },
}

export const metadata = siteMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

interface RootLayoutProps {
  children: ReactNode
}

const appearanceScript = `
(() => {
  const root = document.documentElement
  root.classList.add('js')

  try {
    const saved = localStorage.getItem('theme')
    const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  } catch (error) {
    console.error('Theme bootstrap error', error)
  }
})()
`

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="bg-background text-foreground" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
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
              knowsAbout: ['Go', 'TypeScript', 'Neovim', 'MacOS', 'Next.js'],
              jobTitle: 'Developer',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
