/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
        soft: '0 4px 20px -2px rgba(196, 77, 24, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        card: '0 8px 30px rgba(0, 0, 0, 0.05)',
        hover: '0 14px 35px -4px rgba(196, 77, 24, 0.15), 0 8px 12px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
