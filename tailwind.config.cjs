const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'media',
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],

  plugins: [require('daisyui')],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      textColors: {
        header: '#00171f'
      },
      colors: {
        primary: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87'
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c'
        },
        paragraph: '#718096',
        success: '#2e7d32',
        error: '#d32f2f',
        warning: '#ed6c02'
      },
      background: {
        'off-white': '#f6f9fa'
      },
      lineHeight: {
        hero: '4.5rem'
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#A855F7',
          secondary: '#5982d8',
          neutral: '#4a5568',
          info: '#4a5568',
          error: '#d32f2f',
          success: '#2e7d32'
        }
      }
    ],
    logs: false
  }
};
