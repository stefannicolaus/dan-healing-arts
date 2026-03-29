/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  safelist: [
    'bg-canvas/95',
    'backdrop-blur-md',
    'border-b',
    'border-stone/20',
    'shadow-sm',
  ],
  theme: {
    extend: {
      colors: {
        'canvas':      '#F8F5F0',
        'parchment':   '#FDFBF7',
        'umber':       '#2C1F14',
        'stone':       '#8B7355',
        'sage':        '#4A6741',
        'forest':      '#334F2B',
        'linen':       'rgba(210,200,185,0.4)',
        'surface-lo':  '#F6F3EE',
        'surface-mid': '#F0EDE9',
        'surface-hi':  '#EBE8E3',
        'surface-dim': '#DCDAD5',
        'text-main':   '#2C1F14',
        'text-muted':  '#8B7355',
      },
      fontFamily: {
        serif:  ['Fraunces', 'Georgia', 'serif'],
        sans:   ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1.5rem',
        'btn':  '0.5rem',
      },
      maxWidth: {
        'page': '1320px',
      },
    },
  },
  plugins: [],
};
