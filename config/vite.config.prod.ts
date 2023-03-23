import { mergeConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import baseConfig from './vite.config.base'
import visualizerPlugin from './plugins/visualizer'
import htmlPlugin from './plugins/html'

export default mergeConfig(
  {
    plugins: [
      // https://github.com/vbenjs/vite-plugin-compression
      viteCompression({
        deleteOriginFile: false,
      }),
      visualizerPlugin(),
      htmlPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
)
