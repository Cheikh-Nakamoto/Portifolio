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
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          surfaceLight: '#2a2a2a',
          border: '#333333',
        },
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          surfaceLight: '#e0e0e0',
          border: '#e0e0e0',
        },
        primary: {
          DEFAULT: '#00ff87',
          light: '#00cc6a',
        },
        secondary: {
          DEFAULT: '#00d9ff',
          light: '#0088cc',
        },
        accent: {
          DEFAULT: '#ff0080',
          light: '#cc0066',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 135, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 135, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
