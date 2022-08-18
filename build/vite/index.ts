import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'

// Vite Proxy
export function createProxy(proxyEnv: ProxyEnv = []) {
  const ret: ProxyTarget = {}

  for (const [prefix, target] of proxyEnv) {
    const httpsRe = /^https:\/\//
    const isHttps = httpsRe.test(target)
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    }
  }

  return ret
}

// Vite Plugins
export function createPlugins(metaEnv: ImportMetaEnv, isBuild: boolean) {
  const { VITE_APP_NAME } = metaEnv

  const plugins: (Plugin | Plugin[])[] = [
    vue(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      dts: 'types/components.d.ts',
      resolvers: [
        NaiveUiResolver(),
        // icon auto import: {prefix}-{collection}-{icon}
        IconsResolver({
          prefix: 'icon',
          // enabledCollections: ['ph'],
          // customCollections: ['custom'], custom icon: Icons/customCollections
        }),
      ],
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      eslintrc: {
        enabled: true,
      },
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
    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'prose prose-sm m-auto text-left',
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
    // https://github.com/vbenjs/vite-plugin-html
    createHtmlPlugin({
      minify: isBuild, // minify when build
      inject: {
        data: {
          title: VITE_APP_NAME,
        },
      },
    }),
    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'mock',
      localEnabled: !isBuild, // command === 'build'
      prodEnabled: isBuild,
      // dynamically control whether mock is enabled in the production environment
      // and mock.js will not be packaged when it is not enabled
      injectCode: `
        import { setupProdMockServer } from '../mock/createMockServer';

        setupProdMockServer();
      `,
    }),
  ]

  return plugins
}
