"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Leaf,
  Target,
  Award,
  Clock,
  TrendingUp,
  Shield,
  Sparkles,
  Brain,
  Lightbulb,
  Infinity,
  Calculator,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TrigWaveVisualizer } from "@/components/math-visualizations"
import { EquationSolver, NumberLineVisualizer } from "@/components/animated-math-concepts"
import {
  MobileFunctionPlotter,
  MobileGeometryExplorer,
  MobileFractionVisualizer,
} from "@/components/mobile-math-visualizations"
import { MobileAccessibilityPanel } from "@/components/mobile-accessibility"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const isRTL = language === "ar"

  const features = [
    {
      icon: Brain,
      title: language === "en" ? "Adaptive Learning" : "تعلم تكيفي",
      description:
        language === "en"
          ? "AI-powered lessons that adapt to your unique learning style and pace for optimal understanding."
          : "دروس مدعومة بالذكاء الاصطناعي تتكيف مع أسلوب التعلم الفريد الخاص بك.",
      color: "from-primary-500 to-accent-500",
    },
    {
      icon: Lightbulb,
      title: language === "en" ? "Interactive Problem Solving" : "حل المشاكل التفاعلي",
      description:
        language === "en"
          ? "Engage with dynamic problems that provide instant feedback and step-by-step guidance."
          : "تفاعل مع المشاكل الديناميكية التي توفر ردود فعل فورية وإرشادات خطوة بخطوة.",
      color: "from-accent-500 to-sage-500",
    },
    {
      icon: Target,
      title: language === "en" ? "Personalized Pathways" : "مسارات مخصصة",
      description:
        language === "en"
          ? "Custom learning paths designed around your goals, strengths, and areas for improvement."
          : "مسارات تعلم مخصصة مصممة حول أهدافك ونقاط قوتك ومجالات التحسين.",
      color: "from-sage-500 to-primary-500",
    },
    {
      icon: Globe,
      title: language === "en" ? "Global Excellence" : "التميز العالمي",
      description:
        language === "en"
          ? "Join a worldwide community of learners and access internationally recognized curriculum."
          : "انضم إلى مجتمع عالمي من المتعلمين واحصل على منهج معترف به دولياً.",
      color: "from-primary-600 to-accent-600",
    },
  ]

  const lessons = [
    {
      id: 1,
      title: language === "en" ? "Algebraic Foundations" : "أسس الجبر",
      description:
        language === "en"
          ? "Build strong algebraic thinking with interactive equations and real-world applications"
          : "بناء تفكير جبري قوي مع معادلات تفاعلية وتطبيقات من العالم الحقيقي",
      level: language === "en" ? "Beginner" : "مبتدئ",
      duration: language === "en" ? "6 weeks" : "6 أسابيع",
      lessons: 24,
      students: 2847,
      rating: 4.9,
      completed: false,
      image: `/placeholder.svg?height=280&width=400&text=Algebraic+Foundations&query=mathematical+equations+algebra+chalkboard+formulas`,
      progress: 0,
    },
    {
      id: 2,
      title: language === "en" ? "Geometric Mastery" : "إتقان الهندسة",
      description:
        language === "en"
          ? "Explore spatial relationships and geometric proofs through visual and interactive methods"
          : "استكشف العلاقات المكانية والبراهين الهندسية من خلال الطرق البصرية والتفاعلية",
      level: language === "en" ? "Intermediate" : "متوسط",
      duration: language === "en" ? "8 weeks" : "8 أسابيع",
      lessons: 32,
      students: 1923,
      rating: 4.8,
      completed: true,
      image: `/placeholder.svg?height=280&width=400&text=Geometric+Mastery&query=geometric+shapes+triangles+circles+compass+protractor`,
      progress: 100,
    },
    {
      id: 3,
      title: language === "en" ? "Calculus Excellence" : "تميز التفاضل والتكامل",
      description:
        language === "en"
          ? "Master limits, derivatives, and integrals with comprehensive theory and practical applications"
          : "أتقن النهايات والمشتقات والتكاملات مع النظرية الشاملة والتطبيقات العملية",
      level: language === "en" ? "Advanced" : "متقدم",
      duration: language === "en" ? "12 weeks" : "12 أسبوع",
      lessons: 48,
      students: 1456,
      rating: 4.9,
      completed: false,
      image: `/placeholder.svg?height=280&width=400&text=Calculus+Excellence&query=calculus+derivative+graphs+mathematical+functions+curves`,
      progress: 35,
    },
  ]

  const stats = [
    {
      icon: Users,
      number: "25K+",
      label: language === "en" ? "Active Learners" : "متعلم نشط",
      description: language === "en" ? "Growing daily" : "ينمو يومياً",
    },
    {
      icon: BookOpen,
      number: "800+",
      label: language === "en" ? "Expert Lessons" : "درس متخصص",
      description: language === "en" ? "Comprehensive curriculum" : "منهج شامل",
    },
    {
      icon: Award,
      number: "98%",
      label: language === "en" ? "Success Rate" : "معدل النجاح",
      description: language === "en" ? "Proven results" : "نتائج مثبتة",
    },
    {
      icon: Globe,
      number: "75+",
      label: language === "en" ? "Countries" : "دولة",
      description: language === "en" ? "Global reach" : "وصول عالمي",
    },
  ]

  const testimonials = [
    {
      name: language === "en" ? "Sarah Chen" : "سارة تشين",
      role: language === "en" ? "University Student" : "طالبة جامعية",
      content:
        language === "en"
          ? "Gauss Platform transformed my understanding of calculus. The interactive approach made complex concepts crystal clear!"
          : "منصة جاوس غيرت فهمي للتفاضل والتكامل. النهج التفاعلي جعل المفاهيم المعقدة واضحة تماماً!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=SC",
    },
    {
      name: language === "en" ? "Ahmed Hassan" : "أحمد حسن",
      role: language === "en" ? "High School Teacher" : "مدرس ثانوي",
      content:
        language === "en"
          ? "I use Gauss Platform with my students. The bilingual support and adaptive learning features are exceptional."
          : "أستخدم منصة جاوس مع طلابي. الدعم ثنائي اللغة وميزات التعلم التكيفي استثنائية.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=AH",
    },
    {
      name: language === "en" ? "Maria Rodriguez" : "ماريا رودريغيز",
      role: language === "en" ? "Engineering Student" : "طالبة هندسة",
      content:
        language === "en"
          ? "The personalized learning paths helped me master linear algebra in half the time I expected!"
          : "المسارات التعليمية المخصصة ساعدتني في إتقان الجبر الخطي في نصف الوقت المتوقع!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=MR",
    },
  ]

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Hero Section - Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="absolute inset-0 bg-hero-pattern"></div>
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-xl floating-animation"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-accent-200/30 to-sage-200/30 rounded-full blur-xl floating-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-sage-200/30 to-primary-200/30 rounded-full blur-xl floating-animation"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-6 py-3 mb-8 shadow-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-primary-700 font-medium">
                {language === "en"
                  ? "🌟 Trusted by 25,000+ learners worldwide"
                  : "🌟 موثوق من قبل 25,000+ متعلم عالمياً"}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-primary-700 via-accent-600 to-primary-600 bg-clip-text text-transparent">
                {language === "en" ? "Mathematics" : "الرياضيات"}
              </span>
              <span className="block text-sage-800 text-5xl md:text-6xl mt-2">
                {language === "en" ? "Made Beautiful" : "أصبحت جميلة"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-sage-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              {language === "en"
                ? "Transform your mathematical journey with AI-powered learning, interactive experiences, and personalized guidance."
                : "حول رحلتك الرياضية مع التعلم المدعوم بالذكاء الاصطناعي والتجارب التفاعلية والإرشاد المخصص."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                asChild
                className="rounded-full bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white shadow-2xl shadow-primary-200 hover:shadow-3xl hover:shadow-primary-300 transition-all duration-500 px-12 py-6 text-xl font-semibold group"
              >
                <Link href="/lessons">
                  <Sparkles className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  {language === "en" ? "Start Your Journey" : "ابدأ رحلتك"}
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full border-2 border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 px-12 py-6 text-xl bg-white/80 backdrop-blur-sm shadow-lg"
              >
                <Link href="/about">
                  <Play className="h-6 w-6 mr-3" />
                  {language === "en" ? "Watch Demo" : "شاهد العرض"}
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sage-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="font-medium">{language === "en" ? "Secure & Private" : "آمن وخاص"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-medium">4.9/5 {language === "en" ? "Rating" : "تقييم"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Infinity className="h-5 w-5 text-accent-600" />
                <span className="font-medium">{language === "en" ? "Unlimited Access" : "وصول غير محدود"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Math Visualizations Section - NEW */}
      <section className="py-32 px-4 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-accent-100 text-accent-800 border-accent-200 px-4 py-2 text-sm font-medium">
              {language === "en" ? "Interactive Learning" : "التعلم التفاعلي"}
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-sage-900">
              {language === "en" ? "Mathematics in Motion" : "الرياضيات في الحركة"}
            </h2>
            <p className="text-2xl text-sage-600 max-w-4xl mx-auto">
              {language === "en"
                ? "Experience mathematics like never before with our interactive visualizations and animated demonstrations."
                : "اختبر الرياضيات كما لم تفعل من قبل مع تصوراتنا التفاعلية والعروض المتحركة."}
            </p>
          </div>

          {/* Interactive Visualizations Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <MobileFunctionPlotter language={language} />
            <MobileGeometryExplorer language={language} />
          </div>

          <div className="grid lg:grid-cols-1 gap-12 mb-16">
            <TrigWaveVisualizer language={language} />
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-gradient-to-r from-accent-600 to-sage-500 hover:from-accent-700 hover:to-sage-600 text-white shadow-lg px-12 py-6 text-xl"
            >
              <Link href="/lessons">
                <Zap className="h-6 w-6 mr-3" />
                {language === "en" ? "Explore More Visualizations" : "استكشف المزيد من التصورات"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Math Concepts Section - NEW */}
      <section className="py-32 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-800 border-primary-200 px-4 py-2 text-sm font-medium">
              {language === "en" ? "Step-by-Step Learning" : "التعلم خطوة بخطوة"}
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-sage-900">
              {language === "en" ? "Concepts Come Alive" : "المفاهيم تنبض بالحياة"}
            </h2>
            <p className="text-2xl text-sage-600 max-w-4xl mx-auto">
              {language === "en"
                ? "Watch mathematical concepts unfold through animated demonstrations that make learning intuitive and engaging."
                : "شاهد المفاهيم الرياضية تتكشف من خلال العروض المتحركة التي تجعل التعلم بديهياً وجذاباً."}
            </p>
          </div>

          {/* Animated Concepts Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <MobileFractionVisualizer language={language} />
            <EquationSolver language={language} />
          </div>

          <div className="grid lg:grid-cols-1 gap-12 mb-16">
            <NumberLineVisualizer language={language} />
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white shadow-lg px-12 py-6 text-xl"
            >
              <Link href="/lessons">
                <Brain className="h-6 w-6 mr-3" />
                {language === "en" ? "Start Interactive Learning" : "ابدأ التعلم التفاعلي"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section className="py-24 px-4 bg-gradient-to-r from-sage-900 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "en" ? "Trusted Globally" : "موثوق عالمياً"}
            </h2>
            <p className="text-xl text-white/80">
              {language === "en"
                ? "Join our growing community of mathematical excellence"
                : "انضم إلى مجتمعنا المتنامي من التميز الرياضي"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-accent-300" />
                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-white/70">{stat.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-32 px-4 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-800 border-primary-200 px-4 py-2 text-sm font-medium">
              {language === "en" ? "Why Choose Us" : "لماذا تختارنا"}
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-sage-900">
              {language === "en" ? "Learning Reimagined" : "التعلم المعاد تصوره"}
            </h2>
            <p className="text-2xl text-sage-600 max-w-4xl mx-auto leading-relaxed">
              {language === "en"
                ? "Experience the future of mathematical education with our cutting-edge platform designed for the modern learner."
                : "اختبر مستقبل التعليم الرياضي مع منصتنا المتطورة المصممة للمتعلم الحديث."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`flex items-start gap-6 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} group`}
                >
                  <div
                    className={`flex-shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className={`flex-1 ${isEven ? "text-left" : "lg:text-right"}`}>
                    <h3 className="text-2xl font-bold text-sage-900 mb-4">{feature.title}</h3>
                    <p className="text-lg text-sage-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Lessons - Redesigned */}
      <section className="py-32 px-4 bg-gradient-to-br from-primary-50 via-accent-50 to-sage-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-accent-100 text-accent-800 border-accent-200 px-4 py-2 text-sm font-medium">
              {language === "en" ? "Featured Courses" : "الدورات المميزة"}
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-sage-900">
              {language === "en" ? "Master Every Concept" : "أتقن كل مفهوم"}
            </h2>
            <p className="text-2xl text-sage-600 max-w-4xl mx-auto">
              {language === "en"
                ? "Comprehensive learning paths designed by experts to take you from beginner to advanced mastery."
                : "مسارات تعلم شاملة مصممة من قبل الخبراء لتأخذك من المبتدئ إلى الإتقان المتقدم."}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className="modern-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={lesson.image || "/placeholder.svg"}
                    alt={lesson.title}
                    width={400}
                    height={280}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Progress indicator */}
                  {lesson.progress > 0 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-primary-700">{lesson.progress}% Complete</span>
                    </div>
                  )}

                  {lesson.completed && (
                    <div className="absolute top-4 right-4 bg-primary-600 text-white p-2 rounded-full shadow-lg">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <Badge
                      className={`${
                        lesson.level === "Advanced" || lesson.level === "متقدم"
                          ? "bg-accent-600 text-white"
                          : lesson.level === "Intermediate" || lesson.level === "متوسط"
                            ? "bg-sage-600 text-white"
                            : "bg-primary-600 text-white"
                      } shadow-lg`}
                    >
                      {lesson.level}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-sage-900 mb-2">{lesson.title}</CardTitle>
                  <CardDescription className="text-sage-600 text-base leading-relaxed">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-sage-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{lesson.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{lesson.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>

                  <Button
                    className={`w-full rounded-2xl transition-all duration-300 h-12 text-base font-semibold ${
                      lesson.completed
                        ? "bg-sage-100 text-sage-700 hover:bg-sage-200"
                        : "bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {lesson.completed
                      ? language === "en"
                        ? "Review Course"
                        : "مراجعة الدورة"
                      : language === "en"
                        ? "Start Learning"
                        : "ابدأ التعلم"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full border-2 border-primary-300 text-primary-700 hover:bg-primary-50 px-12 py-6 text-xl bg-white/80 backdrop-blur-sm shadow-lg"
            >
              <Link href="/lessons">
                {language === "en" ? "Explore All Courses" : "استكشف جميع الدورات"}
                <ArrowRight className="h-6 w-6 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-32 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-sage-100 text-sage-800 border-sage-200 px-4 py-2 text-sm font-medium">
              {language === "en" ? "Student Success" : "نجاح الطلاب"}
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-sage-900">
              {language === "en" ? "Transforming Lives" : "تغيير الحياة"}
            </h2>
            <p className="text-2xl text-sage-600 max-w-4xl mx-auto">
              {language === "en"
                ? "Hear from our community of learners who have achieved mathematical excellence."
                : "استمع من مجتمع المتعلمين لدينا الذين حققوا التميز الرياضي."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="modern-card border-0 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-primary-50/30"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full bg-gradient-to-br from-primary-200 to-accent-200"
                    />
                    <div>
                      <h4 className="font-semibold text-sage-900">{testimonial.name}</h4>
                      <p className="text-sm text-sage-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700 italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-32 px-4 bg-gradient-to-br from-primary-600 via-accent-500 to-sage-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              {language === "en" ? "Your Mathematical" : "رحلتك الرياضية"}
              <br />
              <span className="text-accent-200">{language === "en" ? "Journey Starts Here" : "تبدأ هنا"}</span>
            </h2>
            <p className="text-2xl mb-16 opacity-90 leading-relaxed">
              {language === "en"
                ? "Join thousands of learners who have discovered the joy and power of mathematics. Transform your understanding today."
                : "انضم إلى آلاف المتعلمين الذين اكتشفوا متعة وقوة الرياضيات. حول فهمك اليوم."}
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="rounded-full bg-white text-primary-700 hover:bg-primary-50 px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Link href="/register">
                  <Sparkles className="h-6 w-6 mr-3" />
                  {language === "en" ? "Start Free Today" : "ابدأ مجاناً اليوم"}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 bg-transparent px-12 py-6 text-xl backdrop-blur-sm"
                asChild
              >
                <Link href="/contact">
                  <Calculator className="h-6 w-6 mr-3" />
                  {language === "en" ? "Get Expert Help" : "احصل على مساعدة خبير"}
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>{language === "en" ? "100% Secure" : "آمن 100%"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>{language === "en" ? "Instant Access" : "وصول فوري"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>{language === "en" ? "Certified Learning" : "تعلم معتمد"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="py-20 px-4 bg-sage-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-900 via-primary-900 to-sage-900"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold">{language === "en" ? "Gauss Platform" : "منصة جاوس"}</span>
                  <p className="text-sage-300 text-sm">
                    {language === "en" ? "Mathematical Excellence" : "التميز الرياضي"}
                  </p>
                </div>
              </div>
              <p className="text-sage-300 leading-relaxed max-w-md text-lg mb-8">
                {language === "en"
                  ? "Empowering learners worldwide to discover the beauty and power of mathematics through innovative, personalized education."
                  : "تمكين المتعلمين في جميع أنحاء العالم لاكتشاف جمال وقوة الرياضيات من خلال التعليم المبتكر والمخصص."}
              </p>

              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <div className="w-px h-6 bg-sage-700"></div>
                <span className="text-sage-300">
                  {language === "en" ? "25,000+ Happy Learners" : "25,000+ متعلم سعيد"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-8 text-xl">{language === "en" ? "Quick Links" : "روابط سريعة"}</h3>
              <ul className="space-y-4 text-sage-300">
                <li>
                  <Link href="/lessons" className="hover:text-white transition-colors flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {language === "en" ? "Lessons" : "الدروس"}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {language === "en" ? "About" : "حول"}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {language === "en" ? "Contact" : "اتصل بنا"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-8 text-xl">{language === "en" ? "Learning" : "التعلم"}</h3>
              <ul className="space-y-4 text-sage-300">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary-400" />
                  <span>{language === "en" ? "Adaptive Learning" : "تعلم تكيفي"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent-400" />
                  <span>{language === "en" ? "Personalized Paths" : "مسارات مخصصة"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-sage-400" />
                  <span>{language === "en" ? "Certified Courses" : "دورات معتمدة"}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sage-400">
              &copy; 2024{" "}
              {language === "en" ? "Gauss Platform. All rights reserved." : "منصة جاوس. جميع الحقوق محفوظة."}
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-sage-400 text-sm">{language === "en" ? "Made with" : "صنع بـ"}</span>
              <Leaf className="h-4 w-4 text-primary-400" />
              <span className="text-sage-400 text-sm">{language === "en" ? "for learners" : "للمتعلمين"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Accessibility Panel */}
      <MobileAccessibilityPanel language={language} />
    </div>
  )
}
