/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'sans-serif'],
        display: ['Geist Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        brand: {
          green: 'rgb(var(--brand-green) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          muted: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
