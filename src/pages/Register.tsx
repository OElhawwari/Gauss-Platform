import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('auth.backToHome')}
            </Button>
          </Link>
          
          <Card className="modern-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">
                {t('auth.register')}
              </CardTitle>
              <CardDescription>
                {t('auth.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{t('auth.fullName')}</Label>
                <Input id="name" type="text" placeholder={t('auth.fullNamePlaceholder')} />
              </div>
              <div>
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input id="email" type="email" placeholder={t('auth.emailPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input id="password" type="password" placeholder={t('auth.passwordPlaceholder')} />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                {t('auth.createAccount')}
              </Button>
              <p className="text-center text-sm text-gray-600">
                {t('auth.alreadyHaveAccount')}
                <Link to="/login" className="text-primary hover:underline">
                  {t('auth.signIn')}
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Register 