// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      /* preset options */
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        number: ['impact'],
      },
    }),
    // ...
  ],
  // ...UnoCSS options
  theme: {
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
      // link = primary
      // success
      // warning
      // error
      // info = gray 中性色
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

      // 中性色

      // 浅色主题下
      // black: 'black',
      // dark [100~900]

      // 深色主题下
      // white: 'white',
      // light [100~900]

      // title 900
      // primary text // p 800
      // secondary text // meta、caption 700
      // placeholder 600
      // readonly/disabled 500
      // border 400
      // divider 300
      // background/overlay 200
      // table header 100

      // shadow
    },
  },
})
