/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cream: {
          50: '#fffdfa',
          100: '#faf6ee',
          200: '#f5efe6',
          300: '#ebdccb',
          400: '#dfcbb5',
          500: '#ceb49b',
        },
        saffron: {
          50: '#fff8f3',
          100: '#feeddc',
          200: '#fed9b9',
          300: '#fdbd8a',
          400: '#fb9753',
          500: '#e5631b',
          600: '#c44d18',
          700: '#9e390c',
          800: '#7f2e0c',
          900: '#67280e',
        },
        kothmir: {
          50: '#f1f8f3',
          100: '#def0e3',
          200: '#bfe2ca',
          300: '#92cfa7',
          400: '#5fb37e',
          500: '#38965c',
          600: '#277a47',
          700: '#18633b',
          800: '#154f30',
          900: '#114128',
        },
        gold: {
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', '"Rasa"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        gujarati: ['"Anek Gujarati"', '"Hind Vadodara"', 'system-ui', 'sans-serif'],
        gujaratiHeading: ['"Rasa"', '"Anek Gujarati"', 'serif'],
        gujaratiModern: ['"Anek Gujarati"', '"Hind Vadodara"', 'sans-serif'],
        gujaratiBody: ['"Hind Vadodara"', '"Anek Gujarati"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px rgba(0, 0, 0, 0.05)',
        card: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        hover: '0 20px 40px -10px rgba(229, 99, 27, 0.12)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
        saffron: '0 10px 20px -5px rgba(229, 99, 27, 0.2)',
        kothmir: '0 10px 20px -5px rgba(56, 150, 92, 0.2)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
