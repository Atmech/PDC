/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Futura PT', 'Poppins', 'Manrope', 'sans-serif'],
        display: ['Orpheus Pro', 'Canela', 'Cormorant Garamond', 'serif'],
        accent: ['Poppins', 'sans-serif'],
      },
      colors: {
        ink: '#F5ECE1',
        'ink-muted': '#B3A194',
        'cream-ice': '#190E0B',
        'brand-cream': '#0C0605',
        'brand-gold': '#D4AF37',
        'brand-lemon': '#B38C4F',
        'brand-coral': '#BF5D35',
        'brand-sky': '#3B2922',
        'brand-mint': '#423D38',
        'brand-chocolate': '#060302',
        'brand-mocha': '#291812',
        'brand-ink': '#F5ECE1',
        'copper-soft': '#B05933',
        'copper-glow': '#CC7A52',
        surface: '#120A08',
      },
      boxShadow: {
        'premium-sm': '0 12px 30px -20px rgba(45, 24, 16, 0.22)',
        'premium-lg': '0 22px 52px -22px rgba(45, 24, 16, 0.28)',
        'premium-xl': '0 40px 90px -36px rgba(45, 24, 16, 0.36)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        drift: 'drift 12s var(--ease-premium-float) infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
