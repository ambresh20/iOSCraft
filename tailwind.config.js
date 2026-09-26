/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme
        dark: {
          bg: '#0B0D12',
          sidebar: '#10131B',
          card: '#151923',
          border: '#292E3A',
        },
        // Light theme
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        // Brand colors
        brand: {
          orange: '#F59E0B',
          'orange-dark': '#D97706',
          purple: '#8B5CF6',
          success: '#22C55E',
          error: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem,5vw,4rem)', { lineHeight: '1.1', fontWeight: '800' }],
        'page-heading': ['clamp(2rem,3vw,2.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'section-heading': ['clamp(1.5rem,2.5vw,1.875rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      maxWidth: {
        'article': '850px',
        'toc': '220px',
        'sidebar': '260px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
