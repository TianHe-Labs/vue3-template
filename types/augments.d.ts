import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    isNavMenu: boolean
    permissions?: string[]
  }
}
