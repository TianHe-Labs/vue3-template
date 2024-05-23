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

  // 只存在于 .env.development
  // [["/api", "http://127.0.0.1:3000"]] 须使用双引号
  readonly VITE_DEV_PROXY: string[][]
}
