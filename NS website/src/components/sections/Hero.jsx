import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, Sparkles, Zap, Brain } from 'lucide-react'

const Hero = () => {
  const [currentText, setCurrentText] = useState(0)
  
  const heroTexts = [
    "Neural Networks Meet Education Innovation",
    "AI-Powered Solutions for Modern Learning",
    "Blockchain-Secured Educational Workflows",
    "Intelligent Automation for Institutions"
  ]

  // Typewriter effect for hero text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToProducts = () => {
    const element = document.querySelector('#products')
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleDemoRequest = () => {
    // Scroll to contact section
    const element = document.querySelector('#contact')
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Content Container */}
      <div className="neural-container text-center relative z-10">
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 text-neural-golden/30"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute top-32 right-32 text-neural-golden/30"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-32 text-neural-golden/30"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Sparkles className="w-7 h-7" />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-neural-golden/10 border border-neural-golden/20 rounded-full text-neural-golden text-sm font-medium mb-8"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Advanced SaaS solutions powered by AI and blockchain</span>
          </motion.div>

          {/* Dynamic Hero Title */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="gradient-text">
              {heroTexts[currentText]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-neural-text-secondary mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transforming educational institutions with cutting-edge AI-powered tools, 
            blockchain security, and intelligent automation for modern learning workflows.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              className="neural-button text-lg px-8 py-4 group"
              onClick={scrollToProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="neural-button-outline text-lg px-8 py-4 group"
              onClick={handleDemoRequest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 mr-2" />
              <span>Schedule Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { number: "1000+", label: "Institutions Served" },
              { number: "50K+", label: "Students Impacted" },
              { number: "99.9%", label: "Uptime Guaranteed" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-neural-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            onClick={scrollToProducts}
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-neural-text-secondary text-sm mb-2">Discover More</span>
            <ChevronDown className="w-6 h-6 text-neural-golden" />
          </motion.div>
        </motion.div>
      </div>

      {/* Additional Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neural-golden/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neural-teal-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default Hero