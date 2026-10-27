/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf7ff',
          100: '#d7ebff',
          200: '#b7ddff',
          300: '#87c1ff',
          400: '#4b9dff',
          500: '#1c7af0',
          600: '#145fd6',
          700: '#164ca7',
          800: '#183f87',
          900: '#1a356d',
        },
        slate: {
          950: '#020817',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.15)',
      },
    },
  },
  plugins: [],
};
