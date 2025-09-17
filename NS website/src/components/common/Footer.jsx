import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Github, Linkedin, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neural-dark-bg border-t border-neural-border">
      <div className="neural-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-neural-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-neural-darker-bg" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">
                  Neuricorn Syndicate
                </span>
              </div>
            </div>
            <p className="text-neural-text-secondary text-sm mb-4">
              Neural AI solutions for the future of education technology.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Mail, href: "mailto:hello@neuricornsyndicate.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-neural-golden/10 rounded-lg flex items-center justify-center text-neural-golden hover:bg-neural-golden hover:text-neural-darker-bg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-neural-golden font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {["NeuraGrade", "NeuraScan", "WebChain", "Training & Placement"].map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-neural-text-secondary hover:text-neural-golden transition-colors text-sm"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-neural-golden font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "News", "Partners"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neural-text-secondary hover:text-neural-golden transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-neural-golden font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {["Documentation", "Contact", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neural-text-secondary hover:text-neural-golden transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neural-border pt-8 mt-8 text-center">
          <p className="text-neural-text-secondary text-sm">
            © 2025 Neuricorn Syndicate Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer