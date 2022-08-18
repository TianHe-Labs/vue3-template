/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESC: string
  readonly VITE_APP_PORT: number
  readonly VITE_APP_PROXY: [string, string][]
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare type ProxyEnv = [string, string][]

declare type ProxyTarget = Record<string, string | import('vite').ProxyOptions>
