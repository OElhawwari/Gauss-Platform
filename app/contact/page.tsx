"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Bug, Lightbulb } from "lucide-react"

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const isRTL = language === "ar"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const categories = [
    { value: "general", label: language === "en" ? "General Inquiry" : "استفسار عام", icon: MessageSquare },
    { value: "support", label: language === "en" ? "Technical Support" : "الدعم التقني", icon: HelpCircle },
    { value: "bug", label: language === "en" ? "Bug Report" : "تقرير خطأ", icon: Bug },
    { value: "feature", label: language === "en" ? "Feature Request" : "طلب ميزة", icon: Lightbulb },
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: language === "en" ? "Email" : "البريد الإلكتروني",
      content: "support@gaussplatform.com",
      description: language === "en" ? "Send us an email anytime" : "أرسل لنا بريدًا إلكترونيًا في أي وقت",
    },
    {
      icon: Phone,
      title: language === "en" ? "Phone" : "الهاتف",
      content: "+1 (555) 123-4567",
      description: language === "en" ? "Call us during business hours" : "اتصل بنا خلال ساعات العمل",
    },
    {
      icon: MapPin,
      title: language === "en" ? "Address" : "العنوان",
      content:
        language === "en" ? "123 Education St, Learning City, LC 12345" : "123 شارع التعليم، مدينة التعلم، LC 12345",
      description: language === "en" ? "Visit our headquarters" : "زر مقرنا الرئيسي",
    },
    {
      icon: Clock,
      title: language === "en" ? "Business Hours" : "ساعات العمل",
      content: language === "en" ? "Mon-Fri: 9AM-6PM EST" : "الإثنين-الجمعة: 9ص-6م بتوقيت شرق أمريكا",
      description: language === "en" ? "We're here to help" : "نحن هنا للمساعدة",
    },
  ]

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Header */}
      <section className="py-16 px-4 academic-gradient text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === "en" ? "Get in Touch" : "تواصل معنا"}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Have questions about Gauss Platform? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
              : "لديك أسئلة حول منصة جاوس؟ نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن."}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">
                {language === "en" ? "Contact Information" : "معلومات الاتصال"}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-muted-foreground mb-1">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* FAQ Link */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    {language === "en" ? "Need Quick Help?" : "تحتاج مساعدة سريعة؟"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Check out our frequently asked questions for instant answers."
                      : "تحقق من الأسئلة الشائعة للحصول على إجابات فورية."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    {language === "en" ? "View FAQ" : "عرض الأسئلة الشائعة"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="academic-card">
                <CardHeader>
                  <CardTitle>{language === "en" ? "Send us a Message" : "أرسل لنا رسالة"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Fill out the form below and we'll get back to you as soon as possible."
                      : "املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن."}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{language === "en" ? "Full Name" : "الاسم الكامل"}</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder={language === "en" ? "Enter your full name" : "أدخل اسمك الكامل"}
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">{language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={language === "en" ? "Enter your email" : "أدخل بريدك الإلكتروني"}
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">{language === "en" ? "Category" : "الفئة"}</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={language === "en" ? "Select a category" : "اختر فئة"} />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => {
                              const Icon = category.icon
                              return (
                                <SelectItem key={category.value} value={category.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {category.label}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">{language === "en" ? "Subject" : "الموضوع"}</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder={language === "en" ? "Enter subject" : "أدخل الموضوع"}
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{language === "en" ? "Message" : "الرسالة"}</Label>
                      <Textarea
                        id="message"
                        placeholder={language === "en" ? "Enter your message here..." : "أدخل رسالتك هنا..."}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      {language === "en" ? "Send Message" : "إرسال الرسالة"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{language === "en" ? "Visit Our Office" : "زر مكتبنا"}</h2>
            <p className="text-muted-foreground">
              {language === "en"
                ? "We welcome visitors to our headquarters. Schedule an appointment to meet our team."
                : "نرحب بالزوار في مقرنا الرئيسي. حدد موعدًا لمقابلة فريقنا."}
            </p>
          </div>

          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {language === "en" ? "Interactive map would be displayed here" : "ستظهر الخريطة التفاعلية هنا"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
