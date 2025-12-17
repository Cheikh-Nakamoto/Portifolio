import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neo-Brutalist Palette 2025 - Flat Colors Only
        neutral: {
          darkest: '#000000',  // Pure black
          dark: '#1A1A1A',     // Dark gray for cards
          medium: '#2D2D2D',   // Medium gray
          light: '#404040',    // Light gray
        },
        primary: {
          DEFAULT: '#0099FF',  // Electric blue - bold & visible
          glow: '#0099FF',
          dark: '#0077CC',
        },
        secondary: {
          DEFAULT: '#FF6B35',  // Burnt orange - 2025 trend
          glow: '#FF6B35',
          dark: '#E55A2B',
        },
        accent: {
          DEFAULT: '#FFFFFF',  // Pure white for maximum contrast
          glow: '#FFFFFF',
          dark: '#F0F0F0',
        },
        glass: {
          bg: 'rgba(26, 26, 26, 0.6)',
          border: 'rgba(255, 255, 255, 0.15)',
        },
        // Keep compatibility with existing theme toggle
        dark: {
          bg: '#000000',
          surface: '#1A1A1A',
          surfaceLight: '#2D2D2D',
          border: 'rgba(255, 255, 255, 0.15)',
        },
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          surfaceLight: '#e0e0e0',
          border: '#e0e0e0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 245, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 245, 0.6)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 245, 0.4), 0 0 40px rgba(176, 38, 255, 0.2)',
            opacity: '1',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 255, 245, 0.6), 0 0 80px rgba(176, 38, 255, 0.4)',
            opacity: '0.8',
          },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
