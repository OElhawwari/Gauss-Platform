"use client"

import { useRef, useState } from "react"
import { useTouchGestures } from "@/hooks/use-touch-gestures"
import { useHapticFeedback } from "@/components/mobile-haptic-feedback"

export function MobileFunctionPlotter({ language }: { language: "en" | "ar" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [showInstructions, setShowInstructions] = useState(true)

  const { tapFeedback, impactFeedback, successFeedback } = useHapticFeedback()

  const gestureRef = useTouchGestures({
    onTap: (point) => {
      tapFeedback()
      setShowInstructions(false)
      // Convert canvas coordinates to function coordinates
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const baseScale = 20

      const funcX = (point.x - centerX - offset.x) / (baseScale * scale)
      const funcY = -(point.y - centerY - offset.y) / (baseScale * scale)

      // Adjust parameters based on tap location
      if (Math.abs(funcX) < 5) {
        setC(Math.round(funcY))
        impactFeedback()
      }
    },
    onPinch: (pinchScale, center) => {
      setScale((prev) => Math.max(0.5, Math.min(3, prev * pinchScale)))
    },
    onPan: (delta) => {
      setOffset((prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
      }))
    },
    onSwipe: (direction) => {
      impactFeedback()
      switch (direction) {
        case "up":
          setA((prev) => Math.min(3, prev + 0.5))
          break
        case "down":
          setA((prev) => Math.max(-3, prev - 0.5))
          break
        case "left":
          setB((prev) => Math.max(-5, prev - 0.5))
          break
        case "right":
          setB((prev) => Math.min(5, prev + 0.5))
          break
      }
    },
    onDoubleTap: () => {
      successFeedback()
      setScale(1)
      setOffset({ x: 0, y: 0 })
      setA(1)
      setB(0)
      setC(0)
    },
    onLongPress: () => {
      impactFeedback()
      setIsAnimating(!isAnimating)
    },
  })

  return <div>Mobile Function Plotter</div>
}

export function MobileGeometryExplorer({ language }: { language: "en" | "ar" }) {
  const { tapFeedback, impactFeedback, successFeedback } = useHapticFeedback()
  return <div>Mobile Geometry Explorer</div>
}

export function MobileFractionVisualizer({ language }: { language: "en" | "ar" }) {
  const { tapFeedback, impactFeedback, successFeedback } = useHapticFeedback()
  return <div>Mobile Fraction Visualizer</div>
}
