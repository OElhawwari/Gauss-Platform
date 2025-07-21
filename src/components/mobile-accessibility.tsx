"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, Eye, EyeOff, Smartphone, Settings, Accessibility } from "lucide-react"

interface AccessibilitySettings {
  voiceAnnouncements: boolean
  hapticFeedback: boolean
  highContrast: boolean
  reducedMotion: boolean
  largeText: boolean
  gestureGuides: boolean
}

export function MobileAccessibilityPanel({ language }: { language: "en" | "ar" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    voiceAnnouncements: false,
    hapticFeedback: true,
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    gestureGuides: true,
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("gauss-accessibility-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches

    if (prefersReducedMotion || prefersHighContrast) {
      setSettings((prev) => ({
        ...prev,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      }))
    }
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("gauss-accessibility-settings", JSON.stringify(settings))

    // Apply settings to document
    document.documentElement.classList.toggle("high-contrast", settings.highContrast)
    document.documentElement.classList.toggle("large-text", settings.largeText)
    document.documentElement.classList.toggle("reduced-motion", settings.reducedMotion)
  }, [settings])

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const announceText = (text: string) => {
    if (settings.voiceAnnouncements && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "ar" ? "ar-SA" : "en-US"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 rounded-full w-12 h-12 bg-primary-600 hover:bg-primary-700 shadow-lg md:hidden"
        aria-label={language === "en" ? "Open accessibility settings" : "فتح إعدادات إمكانية الوصول"}
      >
        <Accessibility className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-80 bg-white border-primary-200 shadow-2xl md:hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-primary-600" />
            <span className="font-semibold text-sage-900">
              {language === "en" ? "Accessibility" : "إمكانية الوصول"}
            </span>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
            ×
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.voiceAnnouncements ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span className="text-sm">{language === "en" ? "Voice Announcements" : "الإعلانات الصوتية"}</span>
            </div>
            <Button
              size="sm"
              variant={settings.voiceAnnouncements ? "default" : "outline"}
              onClick={() => {
                toggleSetting("voiceAnnouncements")
                announceText(language === "en" ? "Voice announcements toggled" : "تم تبديل الإعلانات الصوتية")
              }}
              className="h-6 text-xs"
            >
              {settings.voiceAnnouncements ? (language === "en" ? "On" : "تشغيل") : language === "en" ? "Off" : "إيقاف"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="text-sm">{language === "en" ? "Haptic Feedback" : "ردود الفعل اللمسية"}</span>
            </div>
            <Button
              size="sm"
              variant={settings.hapticFeedback ? "default" : "outline"}
              onClick={() => toggleSetting("hapticFeedback")}
              className="h-6 text-xs"
            >
              {settings.hapticFeedback ? (language === "en" ? "On" : "تشغيل") : language === "en" ? "Off" : "إيقاف"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.highContrast ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span className="text-sm">{language === "en" ? "High Contrast" : "تباين عالي"}</span>
            </div>
            <Button
              size="sm"
              variant={settings.highContrast ? "default" : "outline"}
              onClick={() => toggleSetting("highContrast")}
              className="h-6 text-xs"
            >
              {settings.highContrast ? (language === "en" ? "On" : "تشغيل") : language === "en" ? "Off" : "إيقاف"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">{language === "en" ? "Reduced Motion" : "حركة مقللة"}</span>
            </div>
            <Button
              size="sm"
              variant={settings.reducedMotion ? "default" : "outline"}
              onClick={() => toggleSetting("reducedMotion")}
              className="h-6 text-xs"
            >
              {settings.reducedMotion ? (language === "en" ? "On" : "تشغيل") : language === "en" ? "Off" : "إيقاف"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">Aa</span>
              <span className="text-sm">{language === "en" ? "Large Text" : "نص كبير"}</span>
            </div>
            <Button
              size="sm"
              variant={settings.largeText ? "default" : "outline"}
              onClick={() => toggleSetting("largeText")}
              className="h-6 text-xs"
            >
              {settings.largeText ? (language === "en" ? "On" : "تشغيل") : language === "en" ? "Off" : "إيقاف"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">👆</span>
              <span className="text-sm">{language === "en" ? "Gesture Guides" : "أدلة الإيماءات"}</span>
            </div>
            <Button
              size="sm"
              variant={settings.gestureGuides ? "default" : "outline"}
              onClick={() => toggleSetting("gestureGuides")}
              className="h-6 text-xs"
            >
              {settings.gestureGuides ? (language === "en" ? "On" : "تشغيل") : language === "en" ? "Off" : "إيقاف"}
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-sage-200">
          <Badge className="w-full justify-center bg-primary-100 text-primary-800 text-xs">
            {language === "en" ? "Settings saved automatically" : "تم حفظ الإعدادات تلقائياً"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Hook to access accessibility settings
export function useAccessibilitySettings() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    voiceAnnouncements: false,
    hapticFeedback: true,
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    gestureGuides: true,
  })

  useEffect(() => {
    const savedSettings = localStorage.getItem("gauss-accessibility-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  return settings
}
