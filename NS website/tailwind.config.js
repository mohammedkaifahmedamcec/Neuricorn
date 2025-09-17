/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neural: {
          'dark-bg': '#0f0f0f',
          'darker-bg': '#1a1a1a',
          'card-bg': 'rgba(42, 42, 42, 0.8)',
          'golden': '#FFD700',
          'bright-gold': '#F4C430',
          'deep-gold': '#DAA520',
          'hover-gold': '#FFED4E',
          'text-primary': '#FFFFFF',
          'text-secondary': '#F4C430',
          'border': 'rgba(255, 215, 0, 0.2)',
          'teal': {
            300: '#32b8c6',
            400: '#2da6b2',
            500: '#21808d',
            600: '#1d7480',
            700: '#1a6873'
          }
        }
      },
      backgroundImage: {
        'neural-gradient-primary': 'linear-gradient(135deg, #FFD700, #DAA520)',
        'neural-gradient-secondary': 'linear-gradient(135deg, #F4C430, #FFD700)',
      },
      fontFamily: {
        'neural': ['FKGroteskNeue', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['Berkeley Mono', 'ui-monospace', 'Menlo', 'Monaco', 'monospace']
      },
      boxShadow: {
        'neural': '0 8px 32px rgba(255, 215, 0, 0.15)',
        'neural-hover': '0 12px 48px rgba(255, 215, 0, 0.25)',
        'neural-glow': '0 0 20px rgba(255, 215, 0, 0.3)'
      },
      animation: {
        'neural-pulse': 'neuralPulse 2s infinite ease-in-out',
        'connection-flow': 'connectionFlow 3s infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        neuralPulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 20px #FFD700' },
          '50%': { transform: 'scale(1.2)', boxShadow: '0 0 30px #FFD700' }
        },
        connectionFlow: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}