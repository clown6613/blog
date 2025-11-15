/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#047857', // 深緑（emerald-700）
          light: '#059669',   // emerald-600
          dark: '#065f46',    // emerald-800
        },
        secondary: {
          DEFAULT: '#0d9488', // teal-600
          light: '#14b8a6',   // teal-500
          dark: '#0f766e',    // teal-700
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
