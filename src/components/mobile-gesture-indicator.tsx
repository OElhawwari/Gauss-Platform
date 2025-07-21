"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hand, Move, RotateCw, ZoomIn, MousePointer2, Smartphone, X } from "lucide-react"

interface GestureIndicatorProps {
  language: "en" | "ar"
  gestures: Array<{
    icon: React.ComponentType<{ className?: string }>
    name: string
    description: string
    demo?: string
  }>
  onClose?: () => void
}

export function MobileGestureIndicator({ language, gestures, onClose }: GestureIndicatorProps) {
  const [currentGesture, setCurrentGesture] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGesture((prev) => (prev + 1) % gestures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [gestures.length])

  if (!isVisible) return null

  const gesture = gestures[currentGesture]
  const Icon = gesture.icon

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 bg-black/90 text-white border-primary-500 shadow-2xl md:hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium">{language === "en" ? "Touch Gestures" : "إيماءات اللمس"}</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary-600/20">
            <Icon className="h-6 w-6 text-primary-400" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{gesture.name}</h4>
            <p className="text-xs text-gray-300">{gesture.description}</p>
          </div>
        </div>

        {gesture.demo && (
          <div className="text-xs text-primary-300 mb-3 font-mono bg-primary-900/30 p-2 rounded">{gesture.demo}</div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {gestures.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentGesture ? "bg-primary-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <Badge variant="secondary" className="text-xs bg-primary-600/20 text-primary-300">
            {currentGesture + 1}/{gestures.length}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Predefined gesture sets for different components
export const functionPlotterGestures = (language: "en" | "ar") => [
  {
    icon: Hand,
    name: language === "en" ? "Tap to Adjust" : "انقر للتعديل",
    description:
      language === "en" ? "Tap on the graph to change parameters" : "انقر على الرسم البياني لتغيير المعاملات",
    demo: language === "en" ? "Tap → Change c value" : "انقر ← تغيير قيمة ج",
  },
  {
    icon: ZoomIn,
    name: language === "en" ? "Pinch to Zoom" : "اقرص للتكبير",
    description: language === "en" ? "Use two fingers to zoom in/out" : "استخدم إصبعين للتكبير/التصغير",
    demo: language === "en" ? "🤏 Pinch → Zoom" : "🤏 اقرص ← تكبير",
  },
  {
    icon: Move,
    name: language === "en" ? "Pan to Move" : "اسحب للتحريك",
    description: language === "en" ? "Drag to move the view around" : "اسحب لتحريك العرض",
    demo: language === "en" ? "👆 Drag → Move view" : "👆 اسحب ← تحريك العرض",
  },
  {
    icon: RotateCw,
    name: language === "en" ? "Swipe to Change" : "مرر للتغيير",
    description:
      language === "en"
        ? "Swipe up/down to change 'a', left/right for 'b'"
        : "مرر لأعلى/أسفل لتغيير 'أ'، يسار/يمين لـ'ب'",
    demo: language === "en" ? "⬆️⬇️ → Change a, ⬅️➡️ → Change b" : "⬆️⬇️ ← تغيير أ، ⬅️➡️ ← تغيير ب",
  },
]

export const geometryExplorerGestures = (language: "en" | "ar") => [
  {
    icon: MousePointer2,
    name: language === "en" ? "Tap Inside" : "انقر بالداخل",
    description: language === "en" ? "Tap inside the polygon to add sides" : "انقر داخل المضلع لإضافة أضلاع",
    demo: language === "en" ? "Tap center → Add sides" : "انقر الوسط ← إضافة أضلاع",
  },
  {
    icon: ZoomIn,
    name: language === "en" ? "Pinch to Resize" : "اقرص لتغيير الحجم",
    description: language === "en" ? "Pinch to make the polygon bigger/smaller" : "اقرص لجعل المضلع أكبر/أصغر",
    demo: language === "en" ? "🤏 Pinch → Resize" : "🤏 اقرص ← تغيير الحجم",
  },
  {
    icon: RotateCw,
    name: language === "en" ? "Rotate Shape" : "دوران الشكل",
    description: language === "en" ? "Use two fingers to rotate the polygon" : "استخدم إصبعين لتدوير المضلع",
    demo: language === "en" ? "🔄 Two fingers → Rotate" : "🔄 إصبعان ← دوران",
  },
]

export const fractionVisualizerGestures = (language: "en" | "ar") => [
  {
    icon: Hand,
    name: language === "en" ? "Tap Segments" : "انقر على الأجزاء",
    description: language === "en" ? "Tap on circle segments to toggle them" : "انقر على أجزاء الدائرة لتبديلها",
    demo: language === "en" ? "Tap segment → Toggle on/off" : "انقر الجزء ← تشغيل/إيقاف",
  },
  {
    icon: Move,
    name: language === "en" ? "Swipe to Change" : "مرر للتغيير",
    description:
      language === "en"
        ? "Swipe up/down for numerator, left/right for denominator"
        : "مرر لأعلى/أسفل للبسط، يسار/يمين للمقام",
    demo: language === "en" ? "⬆️⬇️ → Numerator, ⬅️➡️ → Denominator" : "⬆️⬇️ ← البسط، ⬅️➡️ ← المقام",
  },
]
