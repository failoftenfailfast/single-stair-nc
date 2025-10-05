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
        // Design System Colors
        brutal: {
          black: '#000000',
          white: '#ffffff',
          gray: {
            50: '#fafafa',
            100: '#f5f5f5', 
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          }
        },
        
        // Brand palette (Carolina Blue)
        brand: {
          50: '#f1f7fd',
          100: '#e3effb',
          200: '#c2def7',
          300: '#9ecaf0',
          400: '#79b6e7',
          500: '#4b9cd3', // Carolina blue
          600: '#3f8fc8',
          700: '#337db4',
          800: '#2a6694',
          900: '#234f73',
        },
        
        // Earth tones
        earth: {
          sand: {
            50: '#faf7f0',
            100: '#f4f1ea',
            200: '#e7dfcf',
            300: '#d8cdb6',
            400: '#c5b59a',
          },
          sage: {
            50: '#f2f7f3',
            100: '#e8f0ea',
            200: '#cddfd1',
            300: '#b2cfb8',
            400: '#93b39a',
            500: '#789d81',
            600: '#5f8b65',
          },
          soil: {
            100: '#e8d9c7',
            300: '#c8a97e',
            600: '#8b5e34',
            800: '#5a3b1e',
          },
        },
        
        // Semantic Colors (friendly/approachable)
        surface: {
          primary: '#ffffff',        // Main background (clean)
          secondary: '#f4f1ea',      // Warm secondary (earth.sand.100)
          tertiary: '#faf7f0',       // Subtle warm (earth.sand.50)
          inverse: '#0f172a',        // Dark/inverted background (slate-900)
        },
        
        content: {
          primary: '#0f172a',      // Main text (slate-900)
          secondary: '#334155',    // Secondary text (slate-700)
          tertiary: '#64748b',     // Subtle text (slate-500)
          inverse: '#ffffff',      // Light text on dark
          disabled: '#94a3b8',     // Disabled text (slate-400)
        },
        
        border: {
          primary: '#334155',      // Main borders (slate-700)
          secondary: '#e2e8f0',    // Subtle borders (slate-200)
          focus: '#4b9cd3',        // Focus rings (brand.500)
        },
        
        feedback: {
          success: '#16a34a',
          warning: '#ea580c', 
          error: '#dc2626',
          info: '#2563eb',
        },
        
        // Legacy colors for backward compatibility
        primary: {
          50: '#ffffff',
          100: '#f8f9fa',
          200: '#f1f3f4',
          300: '#e8eaed',
          400: '#dadce0',
          500: '#9aa0a6',
          600: '#5f6368',
          700: '#3c4043',
          800: '#202124',
          900: '#000000',
        },
        black: '#000000',
        white: '#ffffff',
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',    // 2px
        DEFAULT: '0.5rem',   // 8px
        'md': '0.375rem',    // 6px
        'lg': '0.75rem',     // 12px
        'xl': '1rem',        // 16px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        'full': '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      fontSize: {
        // Design System Typography
        'display-xl': ['4.5rem', { lineHeight: '1', fontWeight: '900' }],      // Hero headlines
        'display-lg': ['3.75rem', { lineHeight: '1', fontWeight: '900' }],     // Page headlines
        'display-md': ['3rem', { lineHeight: '1.1', fontWeight: '900' }],      // Section headlines
        'display-sm': ['2.25rem', { lineHeight: '1.2', fontWeight: '900' }],   // Sub-headlines
        
        'heading-xl': ['1.875rem', { lineHeight: '1.3', fontWeight: '900' }],  // Card titles
        'heading-lg': ['1.5rem', { lineHeight: '1.4', fontWeight: '900' }],    // Content titles
        'heading-md': ['1.25rem', { lineHeight: '1.5', fontWeight: '900' }],   // Sub-titles
        'heading-sm': ['1.125rem', { lineHeight: '1.5', fontWeight: '700' }],  // Small headings
        
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],     // Large body text
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],            // Default body text
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],     // Small body text
        
        'label': ['0.875rem', { lineHeight: '1.25', fontWeight: '700' }],      // Form labels
        'caption': ['0.75rem', { lineHeight: '1.25', fontWeight: '500' }],     // Captions, meta text
        
        // Legacy sizes for backward compatibility
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        // Design System Spacing
        'section': '4rem',      // 64px - Section spacing mobile
        'section-lg': '6rem',   // 96px - Section spacing desktop
        'content': '1.5rem',    // 24px - Content spacing
        'element': '1rem',      // 16px - Element spacing
        'tight': '0.5rem',      // 8px - Tight spacing
        
        // Layout spacing
        '18': '4.5rem',
        '88': '22rem', 
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
