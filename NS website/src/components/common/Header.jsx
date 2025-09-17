import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Zap, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#hero', id: 'home' },
    { name: 'Products', href: '#products', id: 'products' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Features', href: '#features', id: 'features' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ]

  const handleNavClick = (href, id) => {
    setActiveSection(id)
    setIsOpen(false)
    
    // Smooth scroll to section
    const element = document.querySelector(href)
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neural-darker-bg/95 backdrop-blur-xl border-b border-neural-border shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="neural-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              {/* Neural Network Icon */}
              <div className="w-10 h-10 bg-neural-gradient-primary rounded-lg flex items-center justify-center neural-glow">
                <Zap className="w-6 h-6 text-neural-darker-bg" />
              </div>
              {/* Pulsing effect */}
              <div className="absolute inset-0 bg-neural-golden rounded-lg opacity-20 animate-ping" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">
                Neuricorn Syndicate
              </span>
              <span className="text-xs text-neural-text-secondary opacity-80">
                Neural AI for Education
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href, link.id)
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === link.id
                    ? 'text-neural-golden bg-neural-golden/10'
                    : 'text-neural-text-secondary hover:text-neural-golden hover:bg-neural-golden/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neural-golden"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="neural-button-outline text-sm px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#contact', 'contact')}
            >
              Schedule Demo
            </motion.button>
            <motion.button
              className="neural-button text-sm px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-neural-text-secondary hover:text-neural-golden transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden ${isOpen ? 'border-t border-neural-border' : ''}`}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href, link.id)
                }}
                className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === link.id
                    ? 'text-neural-golden bg-neural-golden/10'
                    : 'text-neural-text-secondary hover:text-neural-golden hover:bg-neural-golden/5'
                }`}
                whileHover={{ x: 5 }}
              >
                {link.name}
              </motion.a>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3">
              <button
                className="w-full neural-button-outline text-sm py-3"
                onClick={() => handleNavClick('#contact', 'contact')}
              >
                Schedule Demo
              </button>
              <button className="w-full neural-button text-sm py-3">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header