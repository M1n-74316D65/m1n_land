import Link from 'next/link'
import React from 'react'
import ThemeToggle from 'app/components/ui/theme-toggle'

const SiteHeader: React.FC = () => {
  return (
    <header className="site-header">
      <Link href="/" className="site-brand">
        m1n<span> / land</span>
      </Link>
      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  )
}

export default SiteHeader
