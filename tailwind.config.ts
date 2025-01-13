import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },

      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // sky-500
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#10b981', // emerald-500
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444', // red-500
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f3f4f6', // gray-100
          foreground: '#6b7280', // gray-500
        },
        accent: {
          DEFAULT: '#f3f4f6', // gray-100
          foreground: '#111827', // gray-900
        },
        background: '#ffffff',
        foreground: '#111827', // gray-900
      },
    },
  },
  plugins: [],
} satisfies Config;
