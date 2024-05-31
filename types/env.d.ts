/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESC: string
  readonly VITE_APP_COPR: string

  // https://cn.vitejs.dev/config/server-options.html#server-proxy
  // Vite Dev Server Proxy 环境变量配置，只用于 .env.development
  // 数组中每个子数组项会自动转换为一个开发服务器代理项，可根据需要添加多个子数组项（Proxy）
  // 转换过程使用了 JSON 相关函数，因此数组中字符串须使用双引号
  // 转换过程进行了 Path Rewrite，因此须注意环境变量中配置的地址路径问题，否则会导致404
  // 例如：
  //  [
  //    ["/api", "http://127.0.0.1:3000/api"],
  //    ["/media", "http://127.0.0.1:4000"]
  //  ]
  // 会自动转换为
  // proxy: {
  //   '/api': {
  //     target: 'http://127.0.0.1:3000/api',
  //     changeOrigin: true,
  //     ws: true,
  //     rewrite: (path) => path.replace(new RegExp(^/api), ''),
  //   },
  //   '/media': {
  //     target: 'http://127.0.0.1:4000',
  //     changeOrigin: true,
  //     ws: true,
  //     rewrite: (path) => path.replace(new RegExp(^/media), ''),
  //   }
  // }
  readonly VITE_DEV_PROXY: string[][]
}
