export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#0066cc',
        'primary': '#0066cc',
        'destructive': '#dc2626',
        'success': '#16a34a',
        'muted-foreground': '#64748b',
        'foreground': '#020617',
        'background': '#ffffff',
        'card': '#ffffff',
        'surface': '#f8fafc',
        'border': '#e2e8f0',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
