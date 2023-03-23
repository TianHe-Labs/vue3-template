import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
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
      resolvers: [
        NaiveUiResolver(),
        // icon auto import: {prefix}-{collection}-{icon}
        IconsResolver({
          prefix: 'icon',
          // enabledCollections: ['bx'],
          // customCollections: ['custom'], custom icon: Icons/customCollections
        }),
      ],
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      scale: 1.125,
      compiler: 'vue3',
      /* customCollections: {
          'custom': FileSystemIconLoader(
            join(__dirname, 'src', 'assets', 'svgs'),
          ),
        }, */
    }),
    // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    mockDevServerPlugin(),
  ],
  resolve: {
    alias: [
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