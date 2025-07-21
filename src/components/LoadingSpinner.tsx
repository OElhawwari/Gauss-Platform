import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="text-center">
        <motion.div
          className="inline-block"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg font-semibold text-gray-600"
        >
          Loading Gauss Platform...
        </motion.p>
      </div>
    </div>
  )
}

export default LoadingSpinner 