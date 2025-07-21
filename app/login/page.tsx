"use client"

import { useState, useEffect } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Chrome, ArrowRight, Sparkles, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const isRTL = language === "ar"

  useEffect(() => {
    // Check if user is already logged in
    getSession().then((session) => {
      if (session) {
        router.push("/dashboard")
      }
    })
  }, [router])

  const handleGoogleLogin = async () => {
    toast({
      title: "Authentication Under Construction",
      description: "We're working hard to bring you secure authentication. Please check back soon!",
      variant: "default",
    })
  }

  const benefits = [
    {
      icon: Shield,
      text: language === "en" ? "Secure & Private" : "آمن وخاص",
    },
    {
      icon: Zap,
      text: language === "en" ? "Quick Access" : "وصول سريع",
    },
    {
      icon: Sparkles,
      text: language === "en" ? "Personalized" : "مخصص",
    },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg floating-animation">
                <Calculator className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {language === "en" ? "Welcome Back" : "مرحباً بعودتك"}
            </h1>
            <p className="text-gray-600">
              {language === "en" ? "Continue your mathematical journey with us" : "تابع رحلتك الرياضية معنا"}
            </p>
          </div>

          <Card className="modern-card border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                {language === "en" ? "Sign In" : "تسجيل الدخول"}
              </CardTitle>
              <CardDescription>
                {language === "en" ? "Sign in with your Google account to continue" : "سجل الدخول بحساب جوجل للمتابعة"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-600">{benefit.text}</p>
                    </div>
                  )
                })}
              </div>

              {/* Google Login */}
              <Button
                onClick={handleGoogleLogin}
                disabled={true}
                className="w-full h-14 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-500 border border-gray-200 shadow-sm cursor-not-allowed transition-all duration-200 text-base font-medium"
                variant="outline"
              >
                <Chrome className="h-6 w-6 mr-3 opacity-50" />
                {language === "en" ? "Continue with Google (Coming Soon)" : "المتابعة مع جوجل (قريباً)"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    {language === "en" ? "New to Gauss Platform?" : "جديد على منصة جاوس؟"}
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-transparent"
              >
                <Link href="/register">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {language === "en" ? "Create an account" : "إنشاء حساب جديد"}
                </Link>
              </Button>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                      {language === "en" ? "Secure Authentication" : "مصادقة آمنة"}
                    </h4>
                    <p className="text-xs text-blue-700">
                      {language === "en"
                        ? "We use Google's secure authentication system to protect your account and personal information."
                        : "نستخدم نظام المصادقة الآمن من جوجل لحماية حسابك ومعلوماتك الشخصية."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              {language === "en"
                ? "Join thousands of students learning mathematics"
                : "انضم إلى آلاف الطلاب الذين يتعلمون الرياضيات"}
            </p>
            <div className="flex justify-center space-x-6 text-xs text-gray-400">
              <span>✓ {language === "en" ? "Interactive Lessons" : "دروس تفاعلية"}</span>
              <span>✓ {language === "en" ? "Progress Tracking" : "تتبع التقدم"}</span>
              <span>✓ {language === "en" ? "Expert Support" : "دعم الخبراء"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
