// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    // https://unocss.dev/presets/mini#dark-mode
    // unocss dark mode 与naiveui协同注入，
    // unocss 默认使用class="dark"，因此可以利用naiveui的接口动态改变class，
    // 也可以在unocss.config.ts中改变默认配置，使用naiveui的选择器（naiveui未提供）
    presetUno({
      // dark: {
      //   // light: '.light',
      //   dark: '.dark',
      // },
    }),
    presetAttributify(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        number: ['impact'],
      },
    }),
  ],
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
      // 与naiveui主题实现协同
      // 但是naiveui的黑暗和明亮模式下的颜色不是统一通过
      // 全局的css变量控制，而是通过js写入
      // 因此这里需要分别做light和dark的协同
      // hooks/theme
      // https://www.naiveui.com/zh-CN/os-theme/docs/theme
      light: {
        // naiveui/es/_styles/common/light.mjs
        primary: {
          pressed: '#0c7a43',
          default: '#18a058',
          hover: '#36ad6a',
          suppl: '#36ad6a',
        },

        info: {
          pressed: '#1060c9',
          default: '#2080f0',
          hover: '#4098fc',
          suppl: '#4098fc',
        },

        success: {
          pressed: '#0c7a43',
          default: '#18a058',
          hover: '#36ad6a',
          suppl: '#36ad6a',
        },

        warning: {
          pressed: '#c97c10',
          default: '#f0a020',
          hover: '#fcb040',
          suppl: '#fcb040',
        },

        error: {
          pressed: '#ab1f3f',
          default: '#d03050',
          hover: '#de576d',
          suppl: '#de576d',
        },
      },
      dark: {
        // naiveui/es/_styles/common/dark.mjs
        primary: {
          pressed: '#5acea7',
          default: '#63e2b7',
          hover: '#7fe7c4',
          suppl: 'rgb(42, 148, 125)',
        },

        info: {
          pressed: '#66afd3',
          default: '#70c0e8',
          hover: '#8acbec',
          suppl: 'rgb(56, 137, 197)',
        },

        success: {
          pressed: '#5acea7',
          default: '#63e2b7',
          hover: '#7fe7c4',
          suppl: 'rgb(42, 148, 125)',
        },

        warning: {
          pressed: '#e6c260',
          default: '#f2c97d',
          hover: '#f5d599',
          suppl: 'rgb(240, 138, 0)',
        },

        error: {
          pressed: '#e6c260',
          default: '#f2c97d',
          hover: '#f5d599',
          suppl: 'rgb(208, 58, 82)',
        },
      },
    },
  },
})
