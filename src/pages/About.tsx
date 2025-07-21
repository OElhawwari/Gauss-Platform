import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const About = () => {
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
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Gauss Platform
          </h1>
          
          <div className="prose prose-lg max-w-4xl">
            <p className="text-xl text-gray-600 mb-8">
              Gauss Platform is revolutionizing mathematics education through intelligent learning technology.
              We believe that every student can master math when provided with personalized, interactive, and adaptive learning experiences.
            </p>
            
            <p className="text-gray-600 mb-6">
              Our platform combines cutting-edge AI technology with proven pedagogical methods to create
              a learning environment that adapts to each student's unique needs, pace, and learning style.
            </p>
            
            <p className="text-gray-600">
              More content coming soon...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About 