"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Lightbulb, Target, Zap } from "lucide-react"

// Animated Fraction Visualizer
export function FractionVisualizer({ language }: { language: "en" | "ar" }) {
  const [numerator, setNumerator] = useState(3)
  const [denominator, setDenominator] = useState(8)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % numerator)
      }, 800)
    }
    return () => clearInterval(interval)
  }, [isAnimating, numerator])

  const renderCircleFraction = () => {
    const segments = []
    const anglePerSegment = 360 / denominator

    for (let i = 0; i < denominator; i++) {
      const startAngle = i * anglePerSegment - 90
      const isHighlighted = i < numerator && (!isAnimating || i <= animationStep)

      segments.push(
        <div
          key={i}
          className={`absolute w-full h-full transition-all duration-500 ${
            isHighlighted ? "opacity-100" : "opacity-30"
          }`}
          style={{
            transform: `rotate(${startAngle}deg)`,
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((anglePerSegment * Math.PI) / 180)}% ${50 - 50 * Math.sin((anglePerSegment * Math.PI) / 180)}%)`,
          }}
        >
          <div className={`w-full h-full rounded-full ${isHighlighted ? "bg-primary-500" : "bg-primary-200"}`} />
        </div>,
      )
    }

    return segments
  }

  return (
    <Card className="modern-card border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary-600" />
          {language === "en" ? "Interactive Fractions" : "الكسور التفاعلية"}
        </CardTitle>
        <p className="text-sage-600">
          {language === "en" ? "Visualize fractions with animated circles" : "تصور الكسور بالدوائر المتحركة"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary-700 mb-4">
            <span className="text-primary-600">{numerator}</span>
            <span className="text-sage-400">/</span>
            <span className="text-accent-600">{denominator}</span>
          </div>
          <Badge className="bg-primary-100 text-primary-800">
            {language === "en" ? "Decimal" : "عشري"}: {(numerator / denominator).toFixed(3)}
          </Badge>
        </div>

        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-4 border-sage-200 bg-sage-50" />
            {renderCircleFraction()}
            <div className="absolute inset-4 rounded-full bg-white border-2 border-sage-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Numerator" : "البسط"}
            </label>
            <div className="flex gap-2">
              <Button
                onClick={() => setNumerator(Math.max(0, numerator - 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                -
              </Button>
              <div className="flex-1 text-center py-2 bg-primary-50 rounded text-primary-700 font-semibold">
                {numerator}
              </div>
              <Button
                onClick={() => setNumerator(Math.min(denominator, numerator + 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +
              </Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Denominator" : "المقام"}
            </label>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const newDenom = Math.max(1, denominator - 1)
                  setDenominator(newDenom)
                  setNumerator(Math.min(numerator, newDenom))
                }}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                -
              </Button>
              <div className="flex-1 text-center py-2 bg-accent-50 rounded text-accent-700 font-semibold">
                {denominator}
              </div>
              <Button
                onClick={() => setDenominator(Math.min(12, denominator + 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +
              </Button>
            </div>
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
                ? "Animate Fill"
                : "تحريك التعبئة"}
          </Button>
          <Button
            onClick={() => {
              setNumerator(3)
              setDenominator(8)
              setIsAnimating(false)
              setAnimationStep(0)
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

// Animated Equation Solver
export function EquationSolver({ language }: { language: "en" | "ar" }) {
  const [step, setStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [equation] = useState({ a: 2, b: 5, c: 3 }) // 2x + 5 = 3

  const steps = [
    {
      equation: `${equation.a}x + ${equation.b} = ${equation.c}`,
      description: language === "en" ? "Original equation" : "المعادلة الأصلية",
      highlight: "none",
    },
    {
      equation: `${equation.a}x + ${equation.b} - ${equation.b} = ${equation.c} - ${equation.b}`,
      description: language === "en" ? `Subtract ${equation.b} from both sides` : `اطرح ${equation.b} من الطرفين`,
      highlight: "subtract",
    },
    {
      equation: `${equation.a}x = ${equation.c - equation.b}`,
      description: language === "en" ? "Simplify" : "بسط",
      highlight: "simplify",
    },
    {
      equation: `x = ${(equation.c - equation.b) / equation.a}`,
      description: language === "en" ? `Divide both sides by ${equation.a}` : `اقسم الطرفين على ${equation.a}`,
      highlight: "divide",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % steps.length)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isAnimating, steps.length])

  const getHighlightColor = (highlight: string) => {
    switch (highlight) {
      case "subtract":
        return "bg-red-100 text-red-700"
      case "simplify":
        return "bg-blue-100 text-blue-700"
      case "divide":
        return "bg-green-100 text-green-700"
      default:
        return "bg-primary-100 text-primary-700"
    }
  }

  return (
    <Card className="modern-card border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent-600" />
          {language === "en" ? "Step-by-Step Equation Solver" : "حلال المعادلات خطوة بخطوة"}
        </CardTitle>
        <p className="text-sage-600">
          {language === "en" ? "Watch how linear equations are solved" : "شاهد كيف يتم حل المعادلات الخطية"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold mb-4 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border-2 border-primary-200">
            <span
              className={`transition-all duration-500 px-2 py-1 rounded ${
                step === 0 ? getHighlightColor(steps[step].highlight) : ""
              }`}
            >
              {steps[step].equation}
            </span>
          </div>

          <Badge className="bg-sage-100 text-sage-800 text-base px-4 py-2">
            {language === "en" ? "Step" : "الخطوة"} {step + 1}: {steps[step].description}
          </Badge>
        </div>

        <div className="space-y-2">
          {steps.map((s, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg transition-all duration-300 ${
                index === step
                  ? "bg-primary-100 border-2 border-primary-300 scale-105"
                  : index < step
                    ? "bg-sage-50 border border-sage-200 opacity-60"
                    : "bg-gray-50 border border-gray-200 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">{s.equation}</span>
                <Badge variant={index === step ? "default" : "secondary"} className="text-xs">
                  {index + 1}
                </Badge>
              </div>
              <p className="text-sm text-sage-600 mt-1">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            className="flex-1 bg-gradient-to-r from-accent-600 to-sage-500"
          >
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating
              ? language === "en"
                ? "Pause Steps"
                : "إيقاف الخطوات"
              : language === "en"
                ? "Auto Solve"
                : "حل تلقائي"}
          </Button>
          <Button
            onClick={() => setStep(Math.max(0, step - 1))}
            variant="outline"
            disabled={step === 0}
            className="bg-transparent"
          >
            {language === "en" ? "Previous" : "السابق"}
          </Button>
          <Button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            variant="outline"
            disabled={step === steps.length - 1}
            className="bg-transparent"
          >
            {language === "en" ? "Next" : "التالي"}
          </Button>
          <Button
            onClick={() => {
              setStep(0)
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

// Animated Number Line
export function NumberLineVisualizer({ language }: { language: "en" | "ar" }) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [targetNumber, setTargetNumber] = useState(5)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operation, setOperation] = useState<"add" | "subtract">("add")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentNumber((prev) => {
          if (operation === "add" && prev < targetNumber) {
            return prev + 1
          } else if (operation === "subtract" && prev > targetNumber) {
            return prev - 1
          } else {
            setIsAnimating(false)
            return prev
          }
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isAnimating, targetNumber, operation])

  const renderNumberLine = () => {
    const numbers = []
    const start = -10
    const end = 10

    for (let i = start; i <= end; i++) {
      const isActive = i === currentNumber
      const isTarget = i === targetNumber && !isAnimating

      numbers.push(
        <div
          key={i}
          className={`flex flex-col items-center transition-all duration-300 ${isActive ? "scale-125" : "scale-100"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              isActive
                ? "bg-primary-600 text-white shadow-lg"
                : isTarget
                  ? "bg-accent-500 text-white"
                  : "bg-sage-100 text-sage-600 hover:bg-sage-200"
            }`}
          >
            {i}
          </div>
          <div className={`w-1 h-4 mt-1 ${i === 0 ? "bg-sage-400" : "bg-sage-200"}`} />
        </div>,
      )
    }

    return numbers
  }

  return (
    <Card className="modern-card border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-sage-600" />
          {language === "en" ? "Interactive Number Line" : "خط الأعداد التفاعلي"}
        </CardTitle>
        <p className="text-sage-600">
          {language === "en" ? "Visualize addition and subtraction" : "تصور الجمع والطرح"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">
            <span className="text-primary-600">{currentNumber}</span>
            <span className="text-sage-400 mx-2">{operation === "add" ? "+" : "-"}</span>
            <span className="text-accent-600">{Math.abs(targetNumber - currentNumber)}</span>
            <span className="text-sage-400 mx-2">=</span>
            <span className="text-sage-700">{targetNumber}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex justify-center items-end space-x-2 min-w-max px-4">{renderNumberLine()}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Start Number" : "الرقم البداية"}
            </label>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentNumber(Math.max(-10, currentNumber - 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                -
              </Button>
              <div className="flex-1 text-center py-2 bg-primary-50 rounded text-primary-700 font-semibold">
                {currentNumber}
              </div>
              <Button
                onClick={() => setCurrentNumber(Math.min(10, currentNumber + 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +
              </Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-sage-700 mb-2 block">
              {language === "en" ? "Target Number" : "الرقم المستهدف"}
            </label>
            <div className="flex gap-2">
              <Button
                onClick={() => setTargetNumber(Math.max(-10, targetNumber - 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                -
              </Button>
              <div className="flex-1 text-center py-2 bg-accent-50 rounded text-accent-700 font-semibold">
                {targetNumber}
              </div>
              <Button
                onClick={() => setTargetNumber(Math.min(10, targetNumber + 1))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              setOperation(currentNumber < targetNumber ? "add" : "subtract")
              setIsAnimating(true)
            }}
            disabled={currentNumber === targetNumber || isAnimating}
            className="flex-1 bg-gradient-to-r from-sage-600 to-primary-500"
          >
            <Play className="h-4 w-4 mr-2" />
            {language === "en" ? "Animate Solution" : "تحريك الحل"}
          </Button>
          <Button
            onClick={() => {
              setCurrentNumber(0)
              setTargetNumber(5)
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
