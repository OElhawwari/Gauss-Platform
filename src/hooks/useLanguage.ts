import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export const useLanguage = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    
    // Update document direction for RTL support
    const isRTL = language === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Store language preference
    localStorage.setItem('language', language)
  }

  const getCurrentLanguage = () => {
    return i18n.language || 'en'
  }

  const isRTL = () => {
    return getCurrentLanguage() === 'ar'
  }

  // Set initial direction on mount
  useEffect(() => {
    const currentLang = getCurrentLanguage()
    const isRTL = currentLang === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLang
  }, [])

  return {
    changeLanguage,
    getCurrentLanguage,
    isRTL,
    currentLanguage: getCurrentLanguage()
  }
}

