/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base:     '#000000',
          DEFAULT:  '#0d0d0d',
          elevated: '#1a1a1a',
          card:     '#242424',
          hover:    '#2b2b2b',
        },
        border: {
          DEFAULT: '#242424',
          focus:   '#38bdf8',
          subtle:  '#1a1a1a',
        },
        content: {
          primary:   '#ffffff',
          secondary: '#8a8f98',
          muted:     '#5e6772',
        },
        brand: {
          sky:          '#38bdf8',
          'sky-hover':  '#75d0fc',
          orange:       '#ea580c',
          'orange-hover': '#c74b0a',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
