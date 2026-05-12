import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#334155',
        cta: '#0369A1',
        background: '#F8FAFC',
        text: '#020617',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        300: '300ms',
      },
    },
  },
  plugins: [],
}

export default config
