'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    setIsDark(isCurrentlyDark)
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDark
    setIsDark(nextTheme)
    if (nextTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1 border-l border-border px-3 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-muted-foreground opacity-50 sm:px-4"
        aria-label="Toggle visual mode"
        disabled
      >
        <span>MODE: ---</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex shrink-0 items-center gap-1 border-l border-border px-3 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-[var(--duration-normal)] ease-out hover:text-foreground focus-visible:outline-none sm:px-4"
      aria-label={`Switch to ${isDark ? 'Light (Print)' : 'Dark (CRT)'} mode`}
      title={`Current substrate: ${isDark ? 'Tactical CRT' : 'Swiss Print'}`}
    >
      <span>SUBSTRATE:</span>
      <span className="text-accent">{isDark ? 'CRT' : 'PRINT'}</span>
    </button>
  )
}
