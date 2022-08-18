import { defineConfig } from 'vite-plugin-windicss'

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
  attributify: true,
  safelist: [
    'text-primary text-success text-warning text-danger',
    'bg-primary bg-success bg-warning bg-danger',
    range(9).map((i) => `grid-cols-${i} grid-rows-${i} cols-${i} rows-${i}`),
    range(9).map(
      (i) =>
        ` text-primary-${i * 100}
        text-success-${i * 100}
        text-warning-${i * 100}
        text-danger-${i * 100}
        bg-primary-${i * 100}
        bg-success-${i * 100}
        bg-warning-${i * 100}
        bg-danger-${i * 100}
      `
    ),
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      number: ['impact'],
    },
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          md: '1.25rem',
          lg: '1.5rem',
          xl: '1.75rem',
          '2xl': '2rem',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1', // 600
          900: '#363885',
          800: '#4547a9',
          700: '#5457cd',
          600: '#6366f1',
          500: '#8183f4',
          400: '#9ea0f6',
          300: '#bcbdf9',
          200: '#dadafc',
          100: '#f7f7fe',
        },

        // link = primary
        // success
        // warning
        // error
        // info = dark/light

        success: {
          DEFAULT: '#22c55e', // 600
          900: '#025227',
          800: '#15803d',
          700: '#16a34a',
          600: '#22c55e',
          500: '#45d174',
          400: '#6dde8f',
          300: '#98ebae',
          200: '#c8f7d3',
          100: '#faf1d8',
        },

        warning: {
          DEFAULT: '#f59e0b', // 600
          900: '#824500',
          800: '#b45309',
          700: '#d97706',
          600: '#f59e0b',
          500: '#ffbb33',
          400: '#ffce5c',
          300: '#ffde85',
          200: '#ffecad',
          100: '#fffae6',
        },

        error: {
          // danger
          DEFAULT: '#ef4444', // 600
          900: '#7d101b',
          800: '#b91c1c',
          700: '#dc2626',
          600: '#ef4444',
          500: '#fc746f',
          400: '#ffa099',
          300: '#ffc8c2',
          200: '#ffedeb',
          100: '#fff2f0',
        },

        // title
        // primary text // p
        // secondary text // meta、caption
        // readonly/disabled
        // border
        // divider
        // background
        // table header

        // black: 'black',
        dark: {
          900: '#212121',
          800: '#495057',
          700: '#6c757d',
          600: '#9e9e9e',
          500: '#bdbdbd',
          400: '#ced4ea',
          300: '#dee2e6',
          200: '#f5f5f5',
          100: '#f8f9fa',
        },

        // white: 'white',
        light: {
          900: '#d9d9d9',
          800: '#cccccc',
          700: '#8f8f8f',
          600: '#666666',
          500: '#474747',
          400: '#2e2e2e',
          300: '#1f1f1f',
          200: '#141414',
          100: '#0a0a0a',
        },

        // transparent: 'transparent',

        // shadow
      },
    },
  },
})
