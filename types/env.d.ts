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
  readonly VITE_DEV_PROXY: string[][] // 必须使用双引号
}
