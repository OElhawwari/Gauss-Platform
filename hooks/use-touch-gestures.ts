"use client"

import { useRef, useCallback, useEffect } from "react"

interface TouchPoint {
  x: number
  y: number
  id: number
}

interface GestureCallbacks {
  onTap?: (point: TouchPoint) => void
  onDoubleTap?: (point: TouchPoint) => void
  onPinch?: (scale: number, center: TouchPoint) => void
  onPan?: (delta: { x: number; y: number }, point: TouchPoint) => void
  onSwipe?: (direction: "left" | "right" | "up" | "down", velocity: number) => void
  onLongPress?: (point: TouchPoint) => void
  onRotate?: (angle: number, center: TouchPoint) => void
}

export function useTouchGestures(callbacks: GestureCallbacks) {
  const elementRef = useRef<HTMLElement>(null)
  const touchesRef = useRef<Map<number, TouchPoint>>(new Map())
  const lastTapRef = useRef<{ time: number; point: TouchPoint } | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const initialDistanceRef = useRef<number>(0)
  const initialAngleRef = useRef<number>(0)
  const lastPanPointRef = useRef<TouchPoint | null>(null)

  const getTouchPoint = useCallback((touch: Touch): TouchPoint => {
    const rect = elementRef.current?.getBoundingClientRect()
    return {
      x: touch.clientX - (rect?.left || 0),
      y: touch.clientY - (rect?.top || 0),
      id: touch.identifier,
    }
  }, [])

  const getDistance = useCallback((p1: TouchPoint, p2: TouchPoint): number => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }, [])

  const getAngle = useCallback((p1: TouchPoint, p2: TouchPoint): number => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
  }, [])

  const getCenter = useCallback((p1: TouchPoint, p2: TouchPoint): TouchPoint => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
      id: -1,
    }
  }, [])

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        const point = getTouchPoint(touch)
        touchesRef.current.set(touch.identifier, point)
      }

      const touches = Array.from(touchesRef.current.values())

      if (touches.length === 1) {
        const point = touches[0]
        lastPanPointRef.current = point

        // Start long press timer
        longPressTimerRef.current = setTimeout(() => {
          callbacks.onLongPress?.(point)
        }, 500)

        // Check for double tap
        const now = Date.now()
        if (lastTapRef.current && now - lastTapRef.current.time < 300) {
          const distance = getDistance(lastTapRef.current.point, point)
          if (distance < 50) {
            callbacks.onDoubleTap?.(point)
            lastTapRef.current = null
            return
          }
        }
      } else if (touches.length === 2) {
        // Clear long press timer for multi-touch
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current)
          longPressTimerRef.current = null
        }

        const [p1, p2] = touches
        initialDistanceRef.current = getDistance(p1, p2)
        initialAngleRef.current = getAngle(p1, p2)
      }
    },
    [callbacks, getTouchPoint, getDistance, getAngle],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()

      // Update touch positions
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        const point = getTouchPoint(touch)
        touchesRef.current.set(touch.identifier, point)
      }

      const touches = Array.from(touchesRef.current.values())

      // Clear long press timer on move
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }

      if (touches.length === 1) {
        // Pan gesture
        const currentPoint = touches[0]
        if (lastPanPointRef.current) {
          const delta = {
            x: currentPoint.x - lastPanPointRef.current.x,
            y: currentPoint.y - lastPanPointRef.current.y,
          }
          callbacks.onPan?.(delta, currentPoint)
        }
        lastPanPointRef.current = currentPoint
      } else if (touches.length === 2) {
        // Pinch and rotate gestures
        const [p1, p2] = touches
        const currentDistance = getDistance(p1, p2)
        const currentAngle = getAngle(p1, p2)
        const center = getCenter(p1, p2)

        if (initialDistanceRef.current > 0) {
          const scale = currentDistance / initialDistanceRef.current
          callbacks.onPinch?.(scale, center)
        }

        if (initialAngleRef.current !== undefined) {
          const angleDiff = currentAngle - initialAngleRef.current
          callbacks.onRotate?.(angleDiff, center)
        }
      }
    },
    [callbacks, getTouchPoint, getDistance, getAngle, getCenter],
  )

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()

      // Clear long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }

      const touchesBeforeRemoval = Array.from(touchesRef.current.values())

      // Remove ended touches
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        touchesRef.current.delete(touch.identifier)
      }

      const remainingTouches = Array.from(touchesRef.current.values())

      // Handle tap if it was a single touch that just ended
      if (touchesBeforeRemoval.length === 1 && remainingTouches.length === 0) {
        const point = touchesBeforeRemoval[0]

        // Check for swipe gesture
        if (lastPanPointRef.current) {
          const startPoint = lastPanPointRef.current
          const endPoint = point
          const distance = getDistance(startPoint, endPoint)
          const deltaTime = 200 // Assume quick swipe

          if (distance > 50) {
            const velocity = distance / deltaTime
            const angle = getAngle(startPoint, endPoint)
            const degrees = (angle * 180) / Math.PI

            let direction: "left" | "right" | "up" | "down"
            if (degrees >= -45 && degrees <= 45) direction = "right"
            else if (degrees >= 45 && degrees <= 135) direction = "down"
            else if (degrees >= 135 || degrees <= -135) direction = "left"
            else direction = "up"

            callbacks.onSwipe?.(direction, velocity)
          } else {
            // Regular tap
            callbacks.onTap?.(point)
            lastTapRef.current = { time: Date.now(), point }
          }
        }
      }

      lastPanPointRef.current = null
      initialDistanceRef.current = 0
      initialAngleRef.current = 0
    },
    [callbacks, getTouchPoint, getDistance, getAngle],
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener("touchstart", handleTouchStart, { passive: false })
    element.addEventListener("touchmove", handleTouchMove, { passive: false })
    element.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return elementRef
}
