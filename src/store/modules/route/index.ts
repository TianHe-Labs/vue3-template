import type { RouteRecordRaw } from 'vue-router'
import { constRoutes, asyncRoutes } from '@/router/routes'

// 检查路由所需权限 roles = []
/* function hasPermission(userRoles: RoleEnum[], route: RouteRecordRaw): boolean {
  if (route.meta && route.meta.roles)
    return (
      route.meta.roles.includes('*') ||
      userRoles.some((role) => route.meta?.roles?.includes(role))
    )
  return true
} */

function hasPermission(route: RouteRecordRaw, userRole?: RoleEnum): boolean {
  if (userRole && route.meta && route.meta.roles) {
    return (
      route.meta.roles.includes('*') || route.meta?.roles?.includes(userRole)
    )
  }
  return true
}

// 根据权限过滤动态路由
function filterAsyncRoutes(
  asyncRoutes: RouteRecordRaw[],
  userRole?: RoleEnum
): RouteRecordRaw[] {
  const filteredRoutes: RouteRecordRaw[] = []

  asyncRoutes.forEach((asyncRoute) => {
    const clonedRoute: RouteRecordRaw = { ...asyncRoute }
    if (hasPermission(clonedRoute, userRole)) {
      if (clonedRoute.children) {
        clonedRoute.children = filterAsyncRoutes(clonedRoute.children, userRole)
      }
      filteredRoutes.push(clonedRoute)
    }
  })

  return filteredRoutes
}

export const useRouteStore = defineStore('route', {
  state: (): RouteState => ({
    routes: constRoutes,
  }),
  actions: {
    // 更新可访问路由
    setUserRoutes(addRoutes: RouteRecordRaw[]) {
      this.$state.routes = this.$state.routes.concat(addRoutes)
    },
    // 重置
    resetUserRoutes() {
      this.$reset()
    },
    generateRoutes(userRole?: RoleEnum) {
      const addRoutes = filterAsyncRoutes(asyncRoutes, userRole)
      this.setUserRoutes(addRoutes)
      return addRoutes
    },
  },
})
