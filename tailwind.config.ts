import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6B7C32", // Olive Green
          foreground: "#ffffff",
          50: "#F7F8F3",
          100: "#EEF1E6",
          200: "#DCE3CD",
          300: "#C1D0A4",
          400: "#A3BC7A",
          500: "#8BA85C",
          600: "#6B7C32",
          700: "#556329",
          800: "#465024",
          900: "#3C4420",
        },
        secondary: {
          DEFAULT: "#2D3319", // Dark Olive
          foreground: "#ffffff",
          50: "#F6F7F2",
          100: "#ECEEE4",
          200: "#D8DCC9",
          300: "#BFC5A8",
          400: "#A1A982",
          500: "#878F65",
          600: "#6B7350",
          700: "#565C42",
          800: "#474C37",
          900: "#3D4130",
        },
        accent: {
          DEFAULT: "#9CAF5F", // Light Olive
          foreground: "#ffffff",
          50: "#F8F9F4",
          100: "#F0F3E8",
          200: "#E1E7D1",
          300: "#CDD6B4",
          400: "#B5C393",
          500: "#9CAF5F",
          600: "#829856",
          700: "#6B7C47",
          800: "#58653C",
          900: "#4A5533",
        },
        sage: {
          50: "#F6F7F2",
          100: "#ECEEE4",
          200: "#D8DCC9",
          300: "#BFC5A8",
          400: "#A1A982",
          500: "#878F65",
          600: "#6B7350",
          700: "#565C42",
          800: "#474C37",
          900: "#3D4130",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { 
            opacity: "0", 
            transform: "translateY(20px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "slide-in": {
          from: { 
            opacity: "0", 
            transform: "translateX(-20px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateX(0)" 
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "olive-gradient": "linear-gradient(135deg, #6B7C32 0%, #8BA85C 50%, #9CAF5F 100%)",
        "sage-gradient": "linear-gradient(135deg, #878F65 0%, #A1A982 50%, #BFC5A8 100%)",
        "hero-pattern": "radial-gradient(circle at 20% 80%, rgba(107, 124, 50, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156, 175, 95, 0.1) 0%, transparent 50%)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
