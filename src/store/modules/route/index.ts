import type { RouteRecordRaw } from 'vue-router'
import { constRoutes, asyncRoutes } from '@/router/routes'

// 检查路由所需权限
function hasPermission(userRoles: RoleEnum[], route: RouteRecordRaw): boolean {
  if (route.meta && route.meta.roles)
    return (
      route.meta.roles.includes('*') ||
      userRoles.some((role) => route.meta?.roles?.includes(role))
    )
  return true
}

// 根据权限过滤动态路由
function filterAsyncRoutes(
  asyncRoutes: RouteRecordRaw[],
  userRoles: RoleEnum[]
): RouteRecordRaw[] {
  const filteredRoutes: RouteRecordRaw[] = []

  asyncRoutes.forEach((asyncRoute) => {
    const clonedRoute: RouteRecordRaw = { ...asyncRoute }
    if (hasPermission(userRoles, clonedRoute)) {
      if (clonedRoute.children) {
        clonedRoute.children = filterAsyncRoutes(
          clonedRoute.children,
          userRoles
        )
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

  getters: {
    /* routes(state: RouteState): RouteRecordRaw[] {
      return [...state.routes]
    }, */
  },

  actions: {
    // 更新可访问路由
    setRoutes(addRoutes: RouteRecordRaw[]) {
      this.$state.routes = this.$state.routes.concat(addRoutes)
    },
    // 重置
    resetRoutes() {
      this.$reset()
    },
    generateRoutes(userRoles: RoleEnum[]) {
      const addRoutes = filterAsyncRoutes(asyncRoutes, userRoles)
      this.setRoutes(addRoutes)
      return addRoutes
    },
  },
})
