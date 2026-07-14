/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gold: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
          800: '#92400e', 900: '#78350f',
        },
        casino: {
          bg: '#030309', surface: '#0a0a18', card: '#0f0f22',
          border: '#1a1a35', glow: '#7c3aed',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'gradient-gold-h': 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)',
        'gradient-purple': 'linear-gradient(135deg, #7c3aed, #4f46e5)',
        'gradient-green': 'linear-gradient(135deg, #059669, #047857)',
        'gradient-fire': 'linear-gradient(135deg, #ef4444, #f97316, #fbbf24)',
        'gradient-holo': 'linear-gradient(135deg, #f59e0b, #a855f7, #10b981, #3b82f6, #f59e0b)',
        'gradient-sport': 'linear-gradient(135deg, #1d4ed8, #7c3aed, #f59e0b)',
        'hero-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.15) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)',
        'grid-lines': 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        'odds-board': 'linear-gradient(180deg, #0a0a1a 0%, #060610 100%)',
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '40px 40px',
        'grid-lg': '60px 60px',
        'holo-size': '300% 300%',
      },
      boxShadow: {
        gold: '0 0 20px rgba(245,158,11,0.3), 0 0 60px rgba(245,158,11,0.1)',
        'gold-sm': '0 0 10px rgba(245,158,11,0.2)',
        'gold-lg': '0 0 40px rgba(245,158,11,0.5), 0 0 80px rgba(245,158,11,0.2)',
        'gold-neon': '0 0 5px rgba(245,158,11,1), 0 0 20px rgba(245,158,11,0.8), 0 0 40px rgba(245,158,11,0.4)',
        purple: '0 0 20px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.1)',
        'purple-sm': '0 0 10px rgba(124,58,237,0.25)',
        'purple-neon': '0 0 5px rgba(168,85,247,1), 0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4)',
        green: '0 0 20px rgba(5,150,105,0.3)',
        'green-neon': '0 0 5px rgba(16,185,129,1), 0 0 20px rgba(16,185,129,0.6)',
        red: '0 0 20px rgba(239,68,68,0.3)',
        glow: '0 0 40px rgba(124,58,237,0.2)',
        card: '0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-premium': '0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-3deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(245,158,11,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(245,158,11,0.6), 0 0 60px rgba(245,158,11,0.3)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-border': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        ticker: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'neon-breathe': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.7' },
          '99%': { opacity: '1' },
        },
        'bounce-sport': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '40%': { transform: 'translateY(-14px) scale(1.05)' },
          '60%': { transform: 'translateY(-10px) scale(0.97)' },
        },
        'odds-flip': {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sweep: {
          '0%': { left: '-100%' },
          '50%, 100%': { left: '100%' },
        },
        'rotate-hue': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        'particle-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-80px) scale(0)', opacity: '0' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        'gradient-border': 'gradient-border 3s ease infinite',
        ticker: 'ticker 20s linear infinite',
        'scroll-x': 'scroll-x 30s linear infinite',
        'neon-breathe': 'neon-breathe 2.5s ease-in-out infinite',
        flicker: 'flicker 6s ease-in-out infinite',
        'bounce-sport': 'bounce-sport 1.4s ease-in-out infinite',
        sweep: 'sweep 4s ease-in-out infinite',
        'rotate-hue': 'rotate-hue 6s linear infinite',
        ping: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
