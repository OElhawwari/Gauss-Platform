import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('about.backToHome')}
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            {t('about.title')}
          </h1>
          
          <div className="prose prose-lg max-w-4xl">
            <p className="text-xl text-gray-600 mb-8">
              {t('about.description')}
            </p>
            
            <p className="text-gray-600 mb-6 text-lg">
              {t('about.text1')}
              {t('about.text2')}
              {t('about.text3')}
            </p>
            
            <p className="text-gray-600">
              {t('about.text4')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About 