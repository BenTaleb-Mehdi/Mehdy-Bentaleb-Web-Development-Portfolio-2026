/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'sans-serif'],
        display: ['Geist Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        brand: {
          green: '#FFFFFF', // Overriding green back to white for the pure minimalist aesthetic
          dark: '#000000',
          muted: '#a1a1aa', // zinc-400
        }
      },
    },
  },
  plugins: [],
}
