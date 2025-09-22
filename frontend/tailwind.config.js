/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji']
      },
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#dbeaff',
          200: '#b8d4ff',
          300: '#8fbaff',
          400: '#5f97ff',
          500: '#2f74ff',
          600: '#2159db',
          700: '#1b47b1',
          800: '#173d91',
          900: '#142f6b'
        }
      }
    }
  },
  plugins: []
}


