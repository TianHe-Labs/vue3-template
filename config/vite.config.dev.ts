import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import htmlPlugin from './plugins/html'
import { createProxy } from './utils'

export default mergeConfig(
  {
    plugins: [htmlPlugin()],
    server: {
      open: false,
      host: true,
      proxy: createProxy(),
    },
  },
  baseConfig
)
