import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

// Import components (we'll create these next)
import Header from './components/common/Header'
import NeuralBackground from './components/animations/NeuralBackground'
import Hero from './components/sections/Hero'
import Products from './components/sections/Products'
import About from './components/sections/About'
import Features from './components/sections/Features'
import Metrics from './components/sections/Metrics'
import Contact from './components/sections/Contact'
import Footer from './components/common/Footer'

function App() {
  useEffect(() => {
    // Add any app-level initialization here
    console.log('🧠 Neuricorn Syndicate Official Website Initialized')
  }, [])

  return (
    <div className="App min-h-screen bg-neural-dark-bg text-neural-text-primary overflow-x-hidden">
      {/* Fixed Header */}
      <Header />
      
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Products Section */}
        <Products />
        
        {/* About Section */}
        <About />
        
        {/* Features Section */}
        <Features />
        
        {/* Metrics Section */}
        <Metrics />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App