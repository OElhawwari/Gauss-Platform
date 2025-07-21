"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, Clock, TrendingUp, Play, CheckCircle, Star, Calendar, Target, Award } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const { data: session, status } = useSession()
  const router = useRouter()
  const isRTL = language === "ar"

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const stats = [
    {
      icon: BookOpen,
      title: language === "en" ? "Lessons Completed" : "الدروس المكتملة",
      value: "12",
      total: "50",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Trophy,
      title: language === "en" ? "Achievements" : "الإنجازات",
      value: "8",
      total: "20",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Clock,
      title: language === "en" ? "Study Time" : "وقت الدراسة",
      value: "24h",
      total: "100h",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: language === "en" ? "Progress" : "التقدم",
      value: "78%",
      total: "100%",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const recentLessons = [
    {
      id: 1,
      title: language === "en" ? "Quadratic Equations" : "المعادلات التربيعية",
      progress: 85,
      completed: false,
      difficulty: language === "en" ? "Intermediate" : "متوسط",
    },
    {
      id: 2,
      title: language === "en" ? "Trigonometry Basics" : "أساسيات علم المثلثات",
      progress: 100,
      completed: true,
      difficulty: language === "en" ? "Beginner" : "مبتدئ",
    },
    {
      id: 3,
      title: language === "en" ? "Calculus Introduction" : "مقدمة في التفاضل والتكامل",
      progress: 45,
      completed: false,
      difficulty: language === "en" ? "Advanced" : "متقدم",
    },
  ]

  const achievements = [
    {
      icon: Star,
      title: language === "en" ? "First Lesson" : "الدرس الأول",
      description: language === "en" ? "Completed your first lesson" : "أكملت درسك الأول",
      earned: true,
    },
    {
      icon: Target,
      title: language === "en" ? "Week Streak" : "أسبوع متتالي",
      description: language === "en" ? "Studied for 7 days straight" : "درست لمدة 7 أيام متتالية",
      earned: true,
    },
    {
      icon: Award,
      title: language === "en" ? "Math Master" : "أستاذ الرياضيات",
      description: language === "en" ? "Complete 50 lessons" : "أكمل 50 درساً",
      earned: false,
    },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {language === "en"
              ? `Welcome back, ${session.user?.name?.split(" ")[0]}!`
              : `مرحباً بعودتك، ${session.user?.name?.split(" ")[0]}!`}
          </h1>
          <p className="text-gray-600">
            {language === "en" ? "Continue your mathematical journey" : "تابع رحلتك الرياضية"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="modern-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-500">/ {stat.total}</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-700">{stat.title}</h3>
                  <Progress
                    value={
                      (Number.parseInt(stat.value.replace(/\D/g, "")) /
                        Number.parseInt(stat.total.replace(/\D/g, ""))) *
                      100
                    }
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Lessons */}
          <div className="lg:col-span-2">
            <Card className="modern-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  {language === "en" ? "Continue Learning" : "تابع التعلم"}
                </CardTitle>
                <CardDescription>
                  {language === "en" ? "Pick up where you left off" : "تابع من حيث توقفت"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${lesson.completed ? "bg-green-100" : "bg-blue-100"}`}>
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Play className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500">{lesson.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant={lesson.completed ? "secondary" : "default"} className="rounded-lg">
                      {lesson.completed
                        ? language === "en"
                          ? "Review"
                          : "مراجعة"
                        : language === "en"
                          ? "Continue"
                          : "متابعة"}
                    </Button>
                  </div>
                ))}
                <Button asChild className="w-full mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <Link href="/lessons">{language === "en" ? "Browse All Lessons" : "تصفح جميع الدروس"}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card className="modern-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {language === "en" ? "Achievements" : "الإنجازات"}
                </CardTitle>
                <CardDescription>
                  {language === "en" ? "Your learning milestones" : "معالم التعلم الخاصة بك"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-xl ${achievement.earned ? "bg-yellow-50" : "bg-gray-50"}`}
                    >
                      <div
                        className={`p-2 rounded-lg ${achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-gray-200 text-gray-400"}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-sm ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}
                        >
                          {achievement.title}
                        </h4>
                        <p className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="modern-card border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  {language === "en" ? "Quick Actions" : "إجراءات سريعة"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                  <Link href="/lessons">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {language === "en" ? "Browse Lessons" : "تصفح الدروس"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                  <Link href="/progress">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {language === "en" ? "View Progress" : "عرض التقدم"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                  <Link href="/settings">
                    <Target className="h-4 w-4 mr-2" />
                    {language === "en" ? "Settings" : "الإعدادات"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
