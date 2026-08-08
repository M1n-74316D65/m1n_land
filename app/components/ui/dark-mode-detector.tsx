'use client'

import { useEffect } from 'react'

export default function DarkModeDetector() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches)
      }
    }

    // Set initial state if no explicit preference saved
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', mediaQuery.matches)
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return null
}
