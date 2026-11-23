import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#10243D',
          hover: '#1B3659',
        },
        teal: {
          DEFAULT: '#087F75',
          hover: '#066860',
        },
        gold: {
          DEFAULT: '#C5A15B',
          light: 'rgba(197,161,91,0.12)',
          border: 'rgba(197,161,91,0.3)',
        },
        offwhite: '#F5F7FA',
        'slate-900': '#0F172A',
        'slate-600': '#475569',
        border: '#E2E8F0',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
      },
      boxShadow: {
        'card-1': '0px 1px 3px rgba(16,36,61,0.04), 0px 4px 8px rgba(16,36,61,0.02)',
        'card-2': '0px 4px 12px rgba(16,36,61,0.06), 0px 1px 2px rgba(16,36,61,0.04)',
        'card-3': '0px 16px 32px -4px rgba(16,36,61,0.12), 0px 4px 8px -2px rgba(16,36,61,0.06)',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'gutter': '1.5rem',
        'margin-desktop': '3rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
        'space-2xl': '3rem',
        'space-3xl': '4.5rem',
        '18': '4.5rem',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
