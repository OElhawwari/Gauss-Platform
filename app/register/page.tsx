"use client"

import { useState, useEffect } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Chrome, ArrowRight, Sparkles, Users, Award, BookOpen, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function RegisterPage() {
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
      icon: BookOpen,
      title: language === "en" ? "500+ Lessons" : "500+ درس",
      description: language === "en" ? "Comprehensive math curriculum" : "منهج رياضي شامل",
    },
    {
      icon: Users,
      title: language === "en" ? "Expert Teachers" : "معلمون خبراء",
      description: language === "en" ? "Learn from the best educators" : "تعلم من أفضل المعلمين",
    },
    {
      icon: Award,
      title: language === "en" ? "Certificates" : "شهادات",
      description: language === "en" ? "Earn recognized certificates" : "احصل على شهادات معترف بها",
    },
  ]

  const features = [
    {
      icon: Shield,
      text: language === "en" ? "Secure & Private" : "آمن وخاص",
    },
    {
      icon: Zap,
      text: language === "en" ? "Quick Setup" : "إعداد سريع",
    },
    {
      icon: Globe,
      text: language === "en" ? "Global Access" : "وصول عالمي",
    },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {language === "en" ? "Start Your Mathematical Journey" : "ابدأ رحلتك الرياضية"}
                </h1>
                <p className="text-xl text-gray-600">
                  {language === "en"
                    ? "Join thousands of students mastering mathematics with our interactive platform"
                    : "انضم إلى آلاف الطلاب الذين يتقنون الرياضيات مع منصتنا التفاعلية"}
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{language === "en" ? "Free to Start" : "مجاني للبدء"}</h3>
                    <p className="opacity-90">
                      {language === "en" ? "Begin your learning journey at no cost" : "ابدأ رحلة التعلم بدون تكلفة"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Registration */}
            <div>
              <Card className="modern-card border-0 shadow-2xl">
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
                      <Calculator className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{language === "en" ? "Create Your Account" : "أنشئ حسابك"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Get started in seconds with your Google account"
                      : "ابدأ في ثوانٍ باستخدام حساب جوجل"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="text-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <Icon className="h-5 w-5 text-purple-600" />
                          </div>
                          <p className="text-xs text-gray-600">{feature.text}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Google Registration */}
                  <Button
                    onClick={handleGoogleLogin}
                    disabled={true}
                    className="w-full h-16 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-500 border border-gray-200 shadow-sm cursor-not-allowed transition-all duration-200 text-lg font-medium"
                    variant="outline"
                  >
                    <Chrome className="h-7 w-7 mr-3 opacity-50" />
                    {language === "en" ? "Continue with Google (Coming Soon)" : "المتابعة مع جوجل (قريباً)"}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        {language === "en" ? "Already have an account?" : "لديك حساب بالفعل؟"}
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 bg-transparent"
                  >
                    <Link href="/login">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {language === "en" ? "Sign in instead" : "سجل الدخول بدلاً من ذلك"}
                    </Link>
                  </Button>

                  {/* Security & Privacy Note */}
                  <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-purple-900 mb-1">
                          {language === "en" ? "Privacy & Security" : "الخصوصية والأمان"}
                        </h4>
                        <p className="text-xs text-purple-700">
                          {language === "en"
                            ? "Your data is protected with Google's enterprise-grade security. We never share your personal information."
                            : "بياناتك محمية بأمان جوجل على مستوى المؤسسات. نحن لا نشارك معلوماتك الشخصية أبداً."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    {language === "en"
                      ? "By continuing, you agree to our Terms of Service and Privacy Policy"
                      : "بالمتابعة، فإنك توافق على شروط الخدمة وسياسة الخصوصية"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
