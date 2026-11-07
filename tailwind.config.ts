import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Design-specific palette
        'surface': '#fbf5e9',
        'surface-container': '#f6ede0',
        'surface-container-low': '#fdfbf6',
        'surface-container-lowest': '#ffffff',
        'on-surface': '#2b2118',
        'on-surface-variant': '#7a6a5a',
        'primary-dark': '#6d1824',
        'tertiary': '#5e8b7e',
        'outline': '#d8c7ad',
        'outline-variant': '#efe3cc',
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'label-mono': ['12px', { lineHeight: '16px', letterSpacing: '0.06em', fontWeight: '600' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '500' }],
        'label-lg': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'title-sm': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'title-md': ['17px', { lineHeight: '24px', fontWeight: '600' }],
        'title-lg': ['21px', { lineHeight: '28px', fontWeight: '600' }],
        'body-sm': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'body-md': ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-sm': ['22px', { lineHeight: '30px', fontWeight: '600' }],
        'headline-md': ['26px', { lineHeight: '34px', fontWeight: '700' }],
        'headline-lg': ['36px', { lineHeight: '44px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-hero': ['52px', { lineHeight: '60px', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
