/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarHide
  ],
  safelist: [
    'bg-white/15',
    'bg-white/5',
    'bg-white/10',
    'bg-black/90',
    'bg-black/60',
    'backdrop-blur-md',
    'pt-[60px]',
    'lg:pt-0',
    'lg:hidden',
    'lg:flex',
  ]
}