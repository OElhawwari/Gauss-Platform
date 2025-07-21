"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Award, Target, Heart, Lightbulb, Globe, BookOpen, Star, Quote } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const isRTL = language === "ar"

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: language === "en" ? "Active Students" : "طالب نشط",
    },
    {
      icon: BookOpen,
      value: "500+",
      label: language === "en" ? "Lessons" : "درس",
    },
    {
      icon: Award,
      value: "95%",
      label: language === "en" ? "Success Rate" : "معدل النجاح",
    },
    {
      icon: Globe,
      value: "50+",
      label: language === "en" ? "Countries" : "دولة",
    },
  ]

  const values = [
    {
      icon: Target,
      title: language === "en" ? "Excellence" : "التميز",
      description:
        language === "en"
          ? "We strive for excellence in every aspect of mathematical education, ensuring the highest quality learning experience."
          : "نسعى للتميز في كل جانب من جوانب التعليم الرياضي، مما يضمن أعلى جودة في تجربة التعلم.",
    },
    {
      icon: Heart,
      title: language === "en" ? "Passion" : "الشغف",
      description:
        language === "en"
          ? "Our passion for mathematics drives us to create engaging and inspiring educational content for all learners."
          : "شغفنا بالرياضيات يدفعنا لإنشاء محتوى تعليمي جذاب وملهم لجميع المتعلمين.",
    },
    {
      icon: Lightbulb,
      title: language === "en" ? "Innovation" : "الابتكار",
      description:
        language === "en"
          ? "We embrace innovative teaching methods and cutting-edge technology to revolutionize mathematical learning."
          : "نتبنى أساليب التدريس المبتكرة والتكنولوجيا المتطورة لثورة في تعلم الرياضيات.",
    },
  ]

  const team = [
    {
      name: language === "en" ? "Dr. Sarah Johnson" : "د. سارة جونسون",
      role: language === "en" ? "Lead Mathematics Educator" : "كبير المعلمين في الرياضيات",
      image: "/placeholder.svg?height=200&width=200&text=Dr.+Sarah",
      description:
        language === "en"
          ? "PhD in Mathematics Education with 15+ years of teaching experience."
          : "دكتوراه في تعليم الرياضيات مع أكثر من 15 عامًا من الخبرة التدريسية.",
    },
    {
      name: language === "en" ? "Prof. Ahmed Hassan" : "أ.د. أحمد حسن",
      role: language === "en" ? "Curriculum Director" : "مدير المناهج",
      image: "/placeholder.svg?height=200&width=200&text=Prof.+Ahmed",
      description:
        language === "en"
          ? "Expert in curriculum development and educational technology integration."
          : "خبير في تطوير المناهج ودمج التكنولوجيا التعليمية.",
    },
    {
      name: language === "en" ? "Dr. Maria Rodriguez" : "د. ماريا رودريغيز",
      role: language === "en" ? "Research Director" : "مدير الأبحاث",
      image: "/placeholder.svg?height=200&width=200&text=Dr.+Maria",
      description:
        language === "en"
          ? "Leading research in adaptive learning and personalized education methods."
          : "تقود البحث في التعلم التكيفي وأساليب التعليم المخصصة.",
    },
  ]

  const testimonials = [
    {
      name: language === "en" ? "Alex Chen" : "أليكس تشين",
      role: language === "en" ? "High School Student" : "طالب ثانوي",
      content:
        language === "en"
          ? "Gauss Platform transformed my understanding of calculus. The interactive lessons made complex concepts so much clearer!"
          : "منصة جاوس غيرت فهمي للتفاضل والتكامل. الدروس التفاعلية جعلت المفاهيم المعقدة أوضح بكثير!",
      rating: 5,
    },
    {
      name: language === "en" ? "Fatima Al-Zahra" : "فاطمة الزهراء",
      role: language === "en" ? "University Student" : "طالبة جامعية",
      content:
        language === "en"
          ? "The bilingual support helped me learn advanced mathematics in both Arabic and English. Excellent platform!"
          : "الدعم ثنائي اللغة ساعدني في تعلم الرياضيات المتقدمة بالعربية والإنجليزية. منصة ممتازة!",
      rating: 5,
    },
  ]

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section className="py-20 px-4 academic-gradient text-white">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            {language === "en" ? "About Us" : "من نحن"}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "en" ? "About Gauss Platform" : "حول منصة جاوس"}
            <br />
            <span className="text-blue-100">
              {language === "en" ? "Excellence in Mathematics Education" : "التميز في تعليم الرياضيات"}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {language === "en"
              ? "Gauss Platform is dedicated to making mathematics accessible, engaging, and enjoyable for learners of all ages and backgrounds. Our mission is to bridge the gap between traditional education and modern learning needs."
              : "منصة جاوس مكرسة لجعل الرياضيات متاحة وجذابة وممتعة للمتعلمين من جميع الأعمار والخلفيات. مهمتنا هي سد الفجوة بين التعليم التقليدي واحتياجات التعلم الحديثة."}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{language === "en" ? "Our Mission" : "مهمتنا"}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {language === "en"
                  ? "To democratize access to high-quality mathematical education through innovative technology and pedagogical excellence. We believe that every student deserves the opportunity to discover the beauty and power of mathematics."
                  : "إضفاء الطابع الديمقراطي على الوصول إلى التعليم الرياضي عالي الجودة من خلال التكنولوجيا المبتكرة والتميز التربوي. نؤمن أن كل طالب يستحق الفرصة لاكتشاف جمال وقوة الرياضيات."}
              </p>
              <Button asChild>
                <Link href="/lessons">{language === "en" ? "Start Learning" : "ابدأ التعلم"}</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=Mathematics+Education"
                alt="Students learning mathematics"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "en" ? "Our Core Values" : "قيمنا الأساسية"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "en"
                ? "These fundamental principles guide everything we do and shape our approach to mathematical education."
                : "هذه المبادئ الأساسية توجه كل ما نقوم به وتشكل نهجنا في التعليم الرياضي."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "en" ? "Meet Our Team" : "تعرف على فريقنا"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === "en"
                ? "Our dedicated team of educators and researchers work tirelessly to create the best learning experience."
                : "فريقنا المتفاني من المعلمين والباحثين يعمل بلا كلل لإنشاء أفضل تجربة تعليمية."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "en" ? "What Students Say" : "ماذا يقول الطلاب"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === "en"
                ? "Hear from our students about their learning journey with Gauss Platform."
                : "استمع إلى طلابنا حول رحلة تعلمهم مع منصة جاوس."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Join Our Community" : "انضم إلى مجتمعنا"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === "en"
              ? "Be part of a global community of learners who are passionate about mathematics and committed to excellence."
              : "كن جزءًا من مجتمع عالمي من المتعلمين المتحمسين للرياضيات والملتزمين بالتميز."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">{language === "en" ? "Get Started Today" : "ابدأ اليوم"}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/contact">{language === "en" ? "Contact Us" : "اتصل بنا"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
