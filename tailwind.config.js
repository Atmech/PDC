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
        ink: '#2D1810',
        'ink-muted': '#5C4A42',
        'cream-ice': '#F4E9DD',
        'brand-cream': '#FFFCF7',
        'brand-gold': '#D4AF37',
        'brand-lemon': '#F5A962',
        'brand-coral': '#E17544',
        'brand-sky': '#E8B4AB',
        'brand-mint': '#A8C5A5',
        'brand-chocolate': '#2D1810',
        'brand-mocha': '#B89F91',
        'brand-ink': '#2D1810',
        'copper-soft': '#E17544',
        'copper-glow': '#F5A962',
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
