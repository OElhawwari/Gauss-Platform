'use client'

import * as React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Placeholder theme provider - can be implemented with your preferred theme solution
  return <>{children}</>
}
