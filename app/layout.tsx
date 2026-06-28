import { FC, ReactNode } from 'react'
import './global.css'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from 'app/components/nav'
import DarkModeDetector from 'app/components/ui/dark-mode-detector'
import { baseUrl } from 'app/constants/baseUrl'
import { cn } from 'app/lib/utils'

const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'M1n',
    template: '%s | M1n',
  },
  description: 'M1n portfolio - Developer, Linux enthusiast, and creator of open source projects.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'M1n',
    description:
      'M1n portfolio - Developer, Linux enthusiast, and creator of open source projects.',
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
      'M1n portfolio - Developer, Linux enthusiast, and creator of open source projects.',
  },
}

export const metadata = siteMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

interface RootLayoutProps {
  children: ReactNode
}

const themeScript = `
(() => {
  try {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', prefersDark)
  } catch (error) {
    console.error('Theme detection error', error)
  }
})()
`

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const htmlClassName = cn('bg-background text-foreground', GeistSans.variable, GeistMono.variable)

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
              description: 'Developer, Linux enthusiast, and creator of open source projects',
              knowsAbout: ['Rust', 'Go', 'Next.js', 'Linux', 'Neovim', 'Zed'],
              jobTitle: 'Developer',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <div className="mx-auto min-h-screen w-full max-w-2xl px-6 py-10 sm:px-8 sm:py-14 lg:py-16">
          <main id="main-content" className="flex flex-col">
            <DarkModeDetector />
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
