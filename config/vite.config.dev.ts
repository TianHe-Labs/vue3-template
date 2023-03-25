import { mergeConfig } from 'vite'
import basConfig from './vite.config.base'
import htmlPlugin from './plugins/html'

export default mergeConfig(
  {
    plugins: [htmlPlugin()],
    server: {
      open: false,
      host: true,
      proxy: {
        '/api': {
          // target: 'http://127.0.0.1:8080',
          // changeOrigin: true,
          // secure: false,
          // rewrite: (path: string) => path.replace('/api', '')
        },
      },
    },
  },
  basConfig
)
