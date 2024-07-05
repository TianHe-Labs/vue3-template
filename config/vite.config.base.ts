import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/unocss/unocss
    UnoCSS(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        // 'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: 'types/auto-imports.d.ts',
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      dts: 'types/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: resolve(__dirname, '../'),
      },
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: '#',
        replacement: resolve(__dirname, '../types'),
      },
    ],
  },
})
