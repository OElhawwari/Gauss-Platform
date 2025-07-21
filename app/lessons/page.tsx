"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  BookOpen,
  Calculator,
  TrendingUp,
  Award,
} from "lucide-react"

export default function LessonsPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [searchQuery, setSearchQuery] = useState("")
  const isRTL = language === "ar"

  const lessons = [
    {
      id: 1,
      title: language === "en" ? "Introduction to Algebra" : "مقدمة في الجبر",
      description:
        language === "en"
          ? "Learn the fundamentals of algebraic expressions and equations"
          : "تعلم أساسيات التعبيرات والمعادلات الجبرية",
      level: language === "en" ? "Beginner" : "مبتدئ",
      duration: "45 min",
      students: 1250,
      rating: 4.8,
      category: "algebra",
      completed: false,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Algebra",
    },
    {
      id: 2,
      title: language === "en" ? "Geometry Fundamentals" : "أساسيات الهندسة",
      description:
        language === "en"
          ? "Explore shapes, angles, and spatial relationships"
          : "استكشف الأشكال والزوايا والعلاقات المكانية",
      level: language === "en" ? "Beginner" : "مبتدئ",
      duration: "60 min",
      students: 980,
      rating: 4.9,
      category: "geometry",
      completed: true,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Geometry",
    },
    {
      id: 3,
      title: language === "en" ? "Calculus I: Limits and Derivatives" : "التفاضل والتكامل الأول: النهايات والمشتقات",
      description:
        language === "en" ? "Master the concepts of limits and differentiation" : "أتقن مفاهيم النهايات والتفاضل",
      level: language === "en" ? "Advanced" : "متقدم",
      duration: "90 min",
      students: 750,
      rating: 4.7,
      category: "calculus",
      completed: false,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Calculus",
    },
    {
      id: 4,
      title: language === "en" ? "Statistics and Probability" : "الإحصاء والاحتمالات",
      description:
        language === "en" ? "Understand data analysis and probability theory" : "فهم تحليل البيانات ونظرية الاحتمالات",
      level: language === "en" ? "Intermediate" : "متوسط",
      duration: "75 min",
      students: 1100,
      rating: 4.6,
      category: "statistics",
      completed: false,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Statistics",
    },
    {
      id: 5,
      title: language === "en" ? "Linear Algebra" : "الجبر الخطي",
      description:
        language === "en" ? "Vectors, matrices, and linear transformations" : "المتجهات والمصفوفات والتحويلات الخطية",
      level: language === "en" ? "Advanced" : "متقدم",
      duration: "120 min",
      students: 650,
      rating: 4.8,
      category: "algebra",
      completed: false,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Linear+Algebra",
    },
    {
      id: 6,
      title: language === "en" ? "Trigonometry Essentials" : "أساسيات علم المثلثات",
      description:
        language === "en" ? "Sine, cosine, tangent and their applications" : "الجيب وجيب التمام والظل وتطبيقاتها",
      level: language === "en" ? "Intermediate" : "متوسط",
      duration: "55 min",
      students: 890,
      rating: 4.7,
      category: "geometry",
      completed: true,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Trigonometry",
    },
  ]

  const categories = [
    { id: "all", name: language === "en" ? "All Lessons" : "جميع الدروس", icon: BookOpen },
    { id: "algebra", name: language === "en" ? "Algebra" : "الجبر", icon: Calculator },
    { id: "geometry", name: language === "en" ? "Geometry" : "الهندسة", icon: TrendingUp },
    { id: "calculus", name: language === "en" ? "Calculus" : "التفاضل والتكامل", icon: TrendingUp },
    { id: "statistics", name: language === "en" ? "Statistics" : "الإحصاء", icon: Award },
  ]

  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || lesson.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getLevelColor = (level: string) => {
    if (level === "Beginner" || level === "مبتدئ")
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (level === "Intermediate" || level === "متوسط")
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Header */}
      <section className="py-12 px-4 academic-gradient text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Mathematics Lessons" : "دروس الرياضيات"}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            {language === "en"
              ? "Explore our comprehensive collection of mathematics lessons designed to help you master every concept."
              : "استكشف مجموعتنا الشاملة من دروس الرياضيات المصممة لمساعدتك على إتقان كل مفهوم."}
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search lessons..." : "البحث في الدروس..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              {language === "en" ? "Filter" : "تصفية"}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="academic-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{filteredLessons.length}</p>
                        <p className="text-sm text-muted-foreground">{language === "en" ? "Lessons" : "درس"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="academic-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">5.8K</p>
                        <p className="text-sm text-muted-foreground">{language === "en" ? "Students" : "طالب"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="academic-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Clock className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">7.5</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Avg Hours" : "ساعات متوسط"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="academic-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Star className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">4.8</p>
                        <p className="text-sm text-muted-foreground">{language === "en" ? "Rating" : "تقييم"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lessons Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLessons.map((lesson) => (
                  <Card key={lesson.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img
                        src={lesson.thumbnail || "/placeholder.svg"}
                        alt={lesson.title}
                        className="w-full h-48 object-cover"
                      />
                      {lesson.completed && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <Badge className={getLevelColor(lesson.level)}>{lesson.level}</Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-2">{lesson.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{lesson.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{lesson.rating}</span>
                        </div>
                      </div>

                      <Button className="w-full" variant={lesson.completed ? "secondary" : "default"}>
                        <Play className="h-4 w-4 mr-2" />
                        {lesson.completed
                          ? language === "en"
                            ? "Review Lesson"
                            : "مراجعة الدرس"
                          : language === "en"
                            ? "Start Lesson"
                            : "بدء الدرس"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredLessons.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "en" ? "No lessons found" : "لم يتم العثور على دروس"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "en"
                      ? "Try adjusting your search or filter criteria."
                      : "حاول تعديل معايير البحث أو التصفية."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
