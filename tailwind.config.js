/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#0a0e27',
        'game-blue': '#1a1f4d',
        'game-purple': '#2d1b69',
        'game-gold': '#ffd700',
      },
      fontFamily: {
        'game': ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
