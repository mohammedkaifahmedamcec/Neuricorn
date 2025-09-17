import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-neural-darker-bg">
      <div className="neural-container">
        <div className="text-center mb-16">
          <h2 className="section-title gradient-text">Get in Touch</h2>
          <p className="section-subtitle text-neural-text-secondary">
            Ready to revolutionize your educational workflows with neural intelligence?
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neural-golden/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-neural-golden" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neural-text-primary">Email</h3>
                  <p className="text-neural-text-secondary">hello@neuricornsyndicate.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neural-golden/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-neural-golden" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neural-text-primary">Phone</h3>
                  <p className="text-neural-text-secondary">+91 (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neural-golden/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-neural-golden" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neural-text-primary">Location</h3>
                  <p className="text-neural-text-secondary">India</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="neural-card p-8">
              <h3 className="text-xl font-bold text-neural-golden mb-6">Schedule a Demo</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-neural-dark-bg border border-neural-border rounded-lg text-neural-text-primary placeholder:text-neural-text-secondary/60 focus:border-neural-golden focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-neural-dark-bg border border-neural-border rounded-lg text-neural-text-primary placeholder:text-neural-text-secondary/60 focus:border-neural-golden focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 bg-neural-dark-bg border border-neural-border rounded-lg text-neural-text-primary placeholder:text-neural-text-secondary/60 focus:border-neural-golden focus:outline-none resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full neural-button py-3 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact