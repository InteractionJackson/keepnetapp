/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kn-primary-neon': '#CCFF00',
        'kn-primary-muted': '#9BC200',
        'kn-bg-dark': '#0F0F10',
        'kn-bg-secondary': '#161618',
        'kn-bg-card': '#1A1A1C',
        'kn-text-primary': '#FFFFFF',
        'kn-text-secondary': '#C7C7C8',
        'kn-text-muted': '#88888A',
        'kn-text-on-light': '#0F0F10',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '2rem',        // 32px
        '4xl': '2.5rem',      // 40px
        '5xl': '3rem',        // 48px
        '6xl': '3.5rem',      // 56px
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'neutral-tile': '0px 2px 0px 0px rgba(0, 0, 0, 0.3)',
        'neon-tile': '0px 2px 0px 0px #9BC200',
        'purple-tile': '0px 2px 0px 0px #7C5DC7',
        'teal-tile': '0px 2px 0px 0px #2AA1B1',
        'glow-neon': '0px 0px 20px 0px rgba(204, 255, 0, 0.3)',
        'glow-purple': '0px 0px 20px 0px rgba(199, 183, 255, 0.2)',
        'glow-teal': '0px 0px 20px 0px rgba(42, 161, 177, 0.2)',
      },
      letterSpacing: {
        'slight': '0.2px',
        'normal': '0.3px',
        'wide': '0.4px',
      },
    },
  },
  plugins: [],
}
