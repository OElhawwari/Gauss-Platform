"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  BookOpen,
  Calculator,
  User,
  Globe,
  Moon,
  Sun,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  GraduationCap,
  Leaf,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/hooks/use-toast"

interface NavigationProps {
  language: "en" | "ar"
  setLanguage: (lang: "en" | "ar") => void
}

export function Navigation({ language, setLanguage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession()

  const isRTL = language === "ar"

  const navItems = [
    {
      href: "/",
      label: language === "en" ? "Home" : "الرئيسية",
      icon: BookOpen,
    },
    {
      href: "/lessons",
      label: language === "en" ? "Lessons" : "الدروس",
      icon: Calculator,
    },
    {
      href: "/about",
      label: language === "en" ? "About" : "حول",
      icon: User,
    },
    {
      href: "/contact",
      label: language === "en" ? "Contact" : "اتصل بنا",
      icon: User,
    },
  ]

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleAuthClick = () => {
    toast({
      title: "Authentication Under Construction",
      description: "We're working hard to bring you secure authentication. Please check back soon!",
      variant: "default",
    })
  }

  return (
    <nav
      className={`border-b border-primary-100/50 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 group-hover:shadow-lg group-hover:shadow-primary-200 transition-all duration-300">
              <Leaf className="h-7 w-7 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">
                {language === "en" ? "Gauss" : "جاوس"}
              </span>
              <span className="text-xs text-sage-600 font-medium -mt-1">{language === "en" ? "Platform" : "منصة"}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-200"
                      : "text-sage-700 hover:text-primary-700 hover:bg-primary-50/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="rounded-2xl hover:bg-primary-50 text-sage-700 hover:text-primary-700"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span className="font-medium">{language === "en" ? "العربية" : "English"}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-2xl hover:bg-primary-50 text-sage-700 hover:text-primary-700"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* User Authentication */}
            {status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-primary-100 animate-pulse" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-12 w-12 ring-2 ring-primary-200">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-primary-600 to-accent-500 text-white text-lg">
                        {session.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-3">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user.name && <p className="font-semibold text-sage-900">{session.user.name}</p>}
                      {session.user.email && (
                        <p className="w-[200px] truncate text-sm text-sage-600">{session.user.email}</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      <span>{language === "en" ? "Dashboard" : "لوحة التحكم"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{language === "en" ? "Settings" : "الإعدادات"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{language === "en" ? "Sign out" : "تسجيل الخروج"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthClick}
                  className="rounded-2xl opacity-75 cursor-not-allowed text-sage-600"
                  disabled
                >
                  <LogIn className="h-4 w-4 mr-2 opacity-50" />
                  {language === "en" ? "Login" : "تسجيل الدخول"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAuthClick}
                  disabled
                  className="rounded-2xl bg-sage-200 hover:bg-sage-200 text-sage-500 cursor-not-allowed"
                >
                  <UserPlus className="h-4 w-4 mr-2 opacity-50" />
                  {language === "en" ? "Register" : "التسجيل"}
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="rounded-2xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-80 bg-primary-50/50">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 text-sm font-medium p-4 rounded-2xl transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg"
                            : "hover:bg-primary-100 text-sage-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}

                  {!session && (
                    <div className="border-t border-primary-200 pt-4 space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent opacity-75 cursor-not-allowed border-sage-300"
                        onClick={handleAuthClick}
                        disabled
                      >
                        <LogIn className="h-4 w-4 mr-2 opacity-50" />
                        {language === "en" ? "Login (Coming Soon)" : "تسجيل الدخول (قريباً)"}
                      </Button>
                      <Button
                        className="w-full justify-start rounded-2xl bg-sage-200 hover:bg-sage-200 text-sage-500 cursor-not-allowed"
                        onClick={handleAuthClick}
                        disabled
                      >
                        <UserPlus className="h-4 w-4 mr-2 opacity-50" />
                        {language === "en" ? "Register (Coming Soon)" : "التسجيل (قريباً)"}
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
