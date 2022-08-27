import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import { resolve } from 'pathe'

import { envWrapper } from './build/utils'
import { createProxy, createPlugins } from './build/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const metaEnv = envWrapper(env)
  const { VITE_APP_PORT, VITE_APP_BASE, VITE_APP_PROXY } = metaEnv
  const isBuild = command === 'build'
  return {
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: false,
      proxy: createProxy(VITE_APP_PROXY),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '#': resolve(__dirname, './types'),
      },
    },
    plugins: createPlugins(metaEnv, isBuild),
    // optimizeDeps: {
    //   include: ['vue', 'vue-router'/* , '@vueuse/core' */],
    //   exclude: [],
    // },
    base: VITE_APP_BASE || '/',
    build: {
      target: 'esnext',
      // reportCompressedSize: false,
      // chunkSizeWarningLimit: 800,
    },
  }
})
