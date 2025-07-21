"use client"

import type React from "react"

import { useCallback } from "react"

// Haptic feedback patterns for different interactions
export const HapticPatterns = {
  LIGHT: [10],
  MEDIUM: [20],
  HEAVY: [30],
  SUCCESS: [10, 50, 10],
  ERROR: [50, 100, 50],
  SELECTION: [5],
  IMPACT: [15],
  NOTIFICATION: [10, 50, 10, 50, 10],
} as const

type HapticPattern = keyof typeof HapticPatterns

export function useHapticFeedback() {
  const triggerHaptic = useCallback((pattern: HapticPattern = "LIGHT") => {
    // Check if device supports vibration
    if (!navigator.vibrate) return

    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const vibrationPattern = HapticPatterns[pattern]
    navigator.vibrate(vibrationPattern)
  }, [])

  const tapFeedback = useCallback(() => triggerHaptic("LIGHT"), [triggerHaptic])
  const selectFeedback = useCallback(() => triggerHaptic("SELECTION"), [triggerHaptic])
  const successFeedback = useCallback(() => triggerHaptic("SUCCESS"), [triggerHaptic])
  const errorFeedback = useCallback(() => triggerHaptic("ERROR"), [triggerHaptic])
  const impactFeedback = useCallback(() => triggerHaptic("IMPACT"), [triggerHaptic])
  const notificationFeedback = useCallback(() => triggerHaptic("NOTIFICATION"), [triggerHaptic])

  return {
    triggerHaptic,
    tapFeedback,
    selectFeedback,
    successFeedback,
    errorFeedback,
    impactFeedback,
    notificationFeedback,
  }
}

// Component to provide haptic feedback context
export function HapticFeedbackProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
