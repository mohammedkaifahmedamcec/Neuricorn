import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, FileText, ScanLine, Users, ArrowRight, Zap, Shield, Cpu } from 'lucide-react'

const Products = () => {
  const products = [
    {
      title: "NeuraGrade",
      subtitle: "AI-Powered Evaluation System",
      description: "Automated question paper generation and intelligent grading using advanced machine learning algorithms and blockchain verification.",
      icon: GraduationCap,
      features: [
        "AI-powered automated grading",
        "Machine learning evaluation",
        "Blockchain verification",
        "Real-time analytics"
      ],
      tech: ["AI/ML", "Blockchain", "DevOps", "Cloud"]
    },
    {
      title: "NeuraScan",
      subtitle: "Intelligent Mark Processing",
      description: "Advanced computer vision and data extraction for mark sheet processing with intelligent pattern recognition and validation.",
      icon: ScanLine,
      features: [
        "Computer vision processing",
        "Intelligent data extraction",
        "Pattern recognition",
        "Automated validation"
      ],
      tech: ["Computer Vision", "OCR", "AI", "Analytics"]
    },
    {
      title: "WebChain",
      subtitle: "Blockchain Educational Platform",
      description: "Secure, immutable educational content management with blockchain-verified credentials and distributed assessment protocols.",
      icon: Shield,
      features: [
        "Blockchain security",
        "Immutable records",
        "Distributed protocols",
        "Credential verification"
      ],
      tech: ["Blockchain", "Web3", "Security", "DApps"]
    },
    {
      title: "Training & Placement",
      subtitle: "Comprehensive Career Platform",
      description: "End-to-end training and placement assistance with AI-driven skill assessment and career pathway optimization.",
      icon: Users,
      features: [
        "AI skill assessment",
        "Career optimization",
        "Industry partnerships",
        "Progress tracking"
      ],
      tech: ["AI", "Analytics", "CRM", "Integration"]
    }
  ]

  return (
    <section id="products" className="section-padding bg-neural-darker-bg">
      <div className="neural-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-neural-golden/10 border border-neural-golden/20 rounded-full text-neural-golden text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Cpu className="w-4 h-4" />
            <span>Our Neural AI Solutions</span>
          </motion.div>
          
          <h2 className="section-title gradient-text">
            Cutting-edge AI-powered tools transforming educational workflows
          </h2>
          
          <p className="section-subtitle text-neural-text-secondary">
            Discover our comprehensive suite of neural network-based solutions designed to revolutionize modern education through intelligent automation and blockchain security.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="neural-card p-8 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(255, 215, 0, 0.2)"
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-neural-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-neural-golden/10 rounded-2xl flex items-center justify-center group-hover:bg-neural-golden/20 transition-colors duration-300">
                  <product.icon className="w-8 h-8 text-neural-golden" />
                </div>
                <div className="absolute inset-0 bg-neural-golden rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-neural-golden mb-2">
                  {product.title}
                </h3>
                <p className="text-neural-text-secondary mb-4 font-medium">
                  {product.subtitle}
                </p>
                <p className="text-neural-text-secondary leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm text-neural-text-secondary">
                      <div className="w-1.5 h-1.5 bg-neural-golden rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-neural-golden/10 border border-neural-golden/20 rounded-full text-xs font-medium text-neural-deep-gold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  className="flex items-center gap-2 text-neural-golden font-medium group-hover:translate-x-1 transition-transform duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neural-golden/5 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:bg-neural-golden/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="neural-button text-lg px-8 py-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <span>Schedule a Demo</span>
            <Zap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </motion.button>
          <p className="text-neural-text-secondary text-sm mt-4">
            Experience the future of educational technology
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Products