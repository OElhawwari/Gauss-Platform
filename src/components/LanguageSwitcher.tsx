import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import { Button } from './ui/button'
import { Languages } from 'lucide-react'
import saFlag from '../assets/sa-flag.svg'
import usFlag from '../assets/us-flag.svg'

const LanguageSwitcher = () => {
  const { t } = useTranslation()
  const { changeLanguage, currentLanguage } = useLanguage()

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'
    changeLanguage(newLanguage)
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="bg-transparent border-0 hover:bg-transparent hover:scale-110 transition-all duration-300"
      onClick={handleLanguageToggle}
    >
      <span className="hidden sm:inline">
        {currentLanguage === 'ar' ? <img src={saFlag} alt="sa-flag" className="w-6 h-6" /> : <img src={usFlag} alt="us-flag" className="w-6 h-6" />}
      </span>
      <span className="sm:hidden">
      {currentLanguage === 'ar' ? <img src={saFlag} alt="sa-flag" className="w-6 h-6" /> : <img src={usFlag} alt="us-flag" className="w-6 h-6" />}
      </span>
    </Button>
  )
}

export default LanguageSwitcher

