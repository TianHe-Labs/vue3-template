import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: title
    roles?: RoleEnum[] // 路由权限 admin/editor/*
    hideInMenu?: boolean // 是否在导航菜单中隐藏
    hideChildrenInMenu?: boolean // 是否在导航菜单中隐藏子路由
    activeMenu?: string // 路由活跃时高亮指定路由，如子路由活跃时，同时高亮父路由
  }
}
