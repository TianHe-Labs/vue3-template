import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import { createProxy } from './utils'

export default mergeConfig(
  {
    server: {
      proxy: createProxy(),
    },
  },
  baseConfig
)
