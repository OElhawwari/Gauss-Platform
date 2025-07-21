import type React from "react"
import "./globals.css"
import { Inter, Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" })

export const metadata = {
  title: "Gauss Platform - Modern Math Learning",
  description: "A comprehensive platform for learning mathematics with interactive lessons and bilingual support.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
