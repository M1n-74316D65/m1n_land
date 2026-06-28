'use client'

import React from 'react'

import { Button } from 'app/components/ui/button'
import { designSystem } from 'app/lib/design-system'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Radio Player Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <h3 className={designSystem.typography.pageTitle}>Radio player error</h3>
            <p className={`mt-2 ${designSystem.typography.subtitle}`}>
              Something went wrong with the radio player. Please try refreshing the page.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              Try again
            </Button>
            {this.state.error && (
              <details className="mt-6 w-full max-w-md text-left">
                <summary className={designSystem.typography.caption}>Error details</summary>
                <pre
                  className={`mt-2 overflow-auto rounded-lg border border-border bg-muted p-3 text-xs ${designSystem.typography.mono}`}
                >
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
