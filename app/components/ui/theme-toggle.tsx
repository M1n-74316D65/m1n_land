'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

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
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle text-muted-foreground opacity-50"
        aria-label="Toggle color theme"
        disabled
      >
        <Sun className="size-4" aria-hidden="true" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle text-muted-foreground transition-colors duration-[var(--duration-normal)] ease-out hover:bg-focus hover:text-foreground active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
