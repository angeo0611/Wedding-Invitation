/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#87A96B',
        champagne: '#F7E7CE',
        rosegold: '#B76E79',
        luxury: {
          gold: '#D4AF37',
          dark: '#1A1A1A',
          cream: '#FFFDD0'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        script: ['Great Vibes', 'cursive']
      }
    },
  },
  plugins: [],
}
