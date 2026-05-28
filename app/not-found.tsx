import React from 'react'
import Link from 'next/link'

const NotFound: React.FC = () => (
  <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
    <h1 className="text-4xl font-bold tracking-tight mb-4">404</h1>
    <p className="font-mono text-sm text-muted-foreground mb-6">Page not found.</p>
    <Link
      href="/"
      className="px-4 py-2 bg-accent text-accent-foreground border-[3px] border-accent text-sm font-mono font-bold shadow-brutal-accent hover:-translate-y-1 hover:shadow-brutal-lg hover:-rotate-[0.5deg] transition-all duration-100 active:translate-y-0 active:shadow-brutal active:rotate-0"
    >
      Return Home
    </Link>
  </section>
)

export default NotFound
