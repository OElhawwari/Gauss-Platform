"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"

interface Point {
  x: number
  y: number
}

// Interactive Function Plotter
export function FunctionPlotter({ language }: { language: "en" | "ar" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [a, setA] = useState([1])
  const [b, setB] = useState([0])
  const [c, setC] = useState([0])
  const [isAnimating, setIsAnimating] = useState(false)

  const drawFunction = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const scale = 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    for (let i = -10; i <= 10; i++) {
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(centerX + i * scale, 0)
      ctx.lineTo(centerX + i * scale, height)
      ctx.stroke()

      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(0, centerY + i * scale)
      ctx.lineTo(width, centerY + i * scale)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 2
    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()
    // Y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Draw function y = ax² + bx + c
    ctx.strokeStyle = "#6B7C32"
    ctx.lineWidth = 3
    ctx.beginPath()

    let firstPoint = true
    for (let x = -10; x <= 10; x += 0.1) {
      const y = a[0] * x * x + b[0] * x + c[0]
      const canvasX = centerX + x * scale
      const canvasY = centerY - y * scale

      if (canvasY >= 0 && canvasY <= height) {
        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY)
          firstPoint = false
        } else {
          ctx.lineTo(canvasX, canvasY)
        }
      }
    }
    ctx.stroke()

    // Draw vertex point
    const vertexX = -b[0] / (2 * a[0])
    const vertexY = a[0] * vertexX * vertexX + b[0] * vertexX + c[0]
    const vertexCanvasX = centerX + vertexX * scale
    const vertexCanvasY = centerY - vertexY * scale

    ctx.fillStyle = "#9CAF5F"
    ctx.beginPath()
    ctx.arc(vertexCanvasX, vertexCanvasY, 6, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    drawFunction()
  }, [a, b, c])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setA([Math.sin(Date.now() / 1000) * 2 + 1])
        setB([Math.cos(Date.now() / 800) * 3])
        setC([Math.sin(Date.now() / 1200) * 2])
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <Card className="modern-card border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary-600" />
          {language === "en" ? "Interactive Quadratic Function" : "الدالة التربيعية التفاعلية"}
        </CardTitle>
        <p className="text-sage-600">
          {language === "en"
            ? "Explore how parameters affect the parabola shape"
            : "استكشف كيف تؤثر المعاملات على شكل القطع المكافئ"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="border border-primary-200 rounded-xl bg-white shadow-inner"
          />
          <Badge className="absolute top-2 left-2 bg-primary-600 text-white">
            y = {a[0].toFixed(1)}x² + {b[0].toFixed(1)}x + {c[0].toFixed(1)}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              a = {a[0].toFixed(1)} {language === "en" ? "(Shape)" : "(الشكل)"}
            </label>
            <Slider value={a} onValueChange={setA} max={3} min={-3} step={0.1} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              b = {b[0].toFixed(1)} {language === "en" ? "(Position)" : "(الموضع)"}
            </label>
            <Slider value={b} onValueChange={setB} max={5} min={-5} step={0.1} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              c = {c[0].toFixed(1)} {language === "en" ? "(Vertical Shift)" : "(الإزاحة العمودية)"}
            </label>
            <Slider value={c} onValueChange={setC} max={5} min={-5} step={0.1} className="w-full" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            className="flex-1 bg-gradient-to-r from-primary-600 to-accent-500"
          >
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating
              ? language === "en"
                ? "Pause Animation"
                : "إيقاف الحركة"
              : language === "en"
                ? "Animate"
                : "تحريك"}
          </Button>
          <Button
            onClick={() => {
              setA([1])
              setB([0])
              setC([0])
              setIsAnimating(false)
            }}
            variant="outline"
            className="bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {language === "en" ? "Reset" : "إعادة تعيين"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Geometric Shape Explorer
export function GeometryExplorer({ language }: { language: "en" | "ar" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [sides, setSides] = useState([6])
  const [radius, setRadius] = useState([80])
  const [rotation, setRotation] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  const drawPolygon = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background circle
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius[0], 0, 2 * Math.PI)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw polygon
    const angleStep = (2 * Math.PI) / sides[0]
    ctx.strokeStyle = "#6B7C32"
    ctx.fillStyle = "rgba(107, 124, 50, 0.1)"
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let i = 0; i <= sides[0]; i++) {
      const angle = i * angleStep + rotation
      const x = centerX + radius[0] * Math.cos(angle)
      const y = centerY + radius[0] * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw vertices
    ctx.fillStyle = "#9CAF5F"
    for (let i = 0; i < sides[0]; i++) {
      const angle = i * angleStep + rotation
      const x = centerX + radius[0] * Math.cos(angle)
      const y = centerY + radius[0] * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Draw center point
    ctx.fillStyle = "#2D3319"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    drawPolygon()
  }, [sides, radius, rotation])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRotating) {
      interval = setInterval(() => {
        setRotation((prev) => prev + 0.02)
      }, 16)
    }
    return () => clearInterval(interval)
  }, [isRotating])

  const calculateArea = () => {
    const n = sides[0]
    const r = radius[0]
    return (n * r * r * Math.sin((2 * Math.PI) / n)) / 2
  }

  const calculatePerimeter = () => {
    const n = sides[0]
    const r = radius[0]
    return n * 2 * r * Math.sin(Math.PI / n)
  }

  return (
    <Card className="modern-card border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent-600" />
          {language === "en" ? "Regular Polygon Explorer" : "مستكشف المضلع المنتظم"}
        </CardTitle>
        <p className="text-sage-600">
          {language === "en" ? "Discover properties of regular polygons" : "اكتشف خصائص المضلعات المنتظمة"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border border-accent-200 rounded-xl bg-gradient-to-br from-accent-50 to-primary-50 shadow-inner mx-auto block"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-primary-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary-700">{calculateArea().toFixed(1)}</div>
            <div className="text-sm text-sage-600">{language === "en" ? "Area" : "المساحة"}</div>
          </div>
          <div className="bg-accent-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-accent-700">{calculatePerimeter().toFixed(1)}</div>
            <div className="text-sm text-sage-600">{language === "en" ? "Perimeter" : "المحيط"}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Number of Sides" : "عدد الأضلاع"}: {sides[0]}
            </label>
            <Slider value={sides} onValueChange={setSides} max={12} min={3} step={1} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Radius" : "نصف القطر"}: {radius[0]}
            </label>
            <Slider value={radius} onValueChange={setRadius} max={120} min={40} step={5} className="w-full" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsRotating(!isRotating)}
            className="flex-1 bg-gradient-to-r from-accent-600 to-sage-500"
          >
            {isRotating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRotating
              ? language === "en"
                ? "Stop Rotation"
                : "إيقاف الدوران"
              : language === "en"
                ? "Rotate"
                : "دوران"}
          </Button>
          <Button
            onClick={() => {
              setSides([6])
              setRadius([80])
              setRotation(0)
              setIsRotating(false)
            }}
            variant="outline"
            className="bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {language === "en" ? "Reset" : "إعادة تعيين"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Trigonometric Wave Visualizer
export function TrigWaveVisualizer({ language }: { language: "en" | "ar" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [amplitude, setAmplitude] = useState([50])
  const [frequency, setFrequency] = useState([1])
  const [phase, setPhase] = useState([0])
  const [waveType, setWaveType] = useState<"sin" | "cos">("sin")
  const [isAnimating, setIsAnimating] = useState(false)

  const drawWave = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#f3f4f6"
    ctx.lineWidth = 1
    for (let i = 0; i <= width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i <= height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "#9ca3af"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    // Draw wave
    ctx.strokeStyle = waveType === "sin" ? "#6B7C32" : "#9CAF5F"
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let x = 0; x < width; x++) {
      const angle = (x / width) * 4 * Math.PI * frequency[0] + phase[0]
      const y = waveType === "sin" ? centerY - amplitude[0] * Math.sin(angle) : centerY - amplitude[0] * Math.cos(angle)

      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw unit circle
    const circleX = width - 80
    const circleY = 80
    const circleRadius = 40

    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI)
    ctx.stroke()

    // Draw rotating point
    const currentAngle = phase[0]
    const pointX = circleX + circleRadius * Math.cos(currentAngle)
    const pointY = circleY - circleRadius * Math.sin(currentAngle)

    ctx.fillStyle = waveType === "sin" ? "#6B7C32" : "#9CAF5F"
    ctx.beginPath()
    ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI)
    ctx.fill()

    // Draw radius line
    ctx.strokeStyle = waveType === "sin" ? "#6B7C32" : "#9CAF5F"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(circleX, circleY)
    ctx.lineTo(pointX, pointY)
    ctx.stroke()
  }

  useEffect(() => {
    drawWave()
  }, [amplitude, frequency, phase, waveType])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setPhase((prev) => [prev[0] + 0.1])
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <Card className="modern-card border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-sage-600" />
          {language === "en" ? "Trigonometric Wave Explorer" : "مستكشف الموجة المثلثية"}
        </CardTitle>
        <p className="text-sage-600">
          {language === "en" ? "Visualize sine and cosine functions" : "تصور دوال الجيب وجيب التمام"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="border border-sage-200 rounded-xl bg-white shadow-inner w-full"
          />
          <Badge className="absolute top-2 left-2 bg-sage-600 text-white">
            y = {amplitude[0]}
            {waveType}({frequency[0]}x + {phase[0].toFixed(1)})
          </Badge>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => setWaveType("sin")}
            variant={waveType === "sin" ? "default" : "outline"}
            className={waveType === "sin" ? "bg-primary-600" : "bg-transparent"}
          >
            sin(x)
          </Button>
          <Button
            onClick={() => setWaveType("cos")}
            variant={waveType === "cos" ? "default" : "outline"}
            className={waveType === "cos" ? "bg-accent-600" : "bg-transparent"}
          >
            cos(x)
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Amplitude" : "السعة"}: {amplitude[0]}
            </label>
            <Slider value={amplitude} onValueChange={setAmplitude} max={80} min={10} step={5} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Frequency" : "التردد"}: {frequency[0]}
            </label>
            <Slider value={frequency} onValueChange={setFrequency} max={3} min={0.5} step={0.1} className="w-full" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            className="flex-1 bg-gradient-to-r from-sage-600 to-primary-500"
          >
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating
              ? language === "en"
                ? "Pause Wave"
                : "إيقاف الموجة"
              : language === "en"
                ? "Animate Wave"
                : "تحريك الموجة"}
          </Button>
          <Button
            onClick={() => {
              setAmplitude([50])
              setFrequency([1])
              setPhase([0])
              setIsAnimating(false)
            }}
            variant="outline"
            className="bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {language === "en" ? "Reset" : "إعادة تعيين"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
