import type { RouteRecordRaw, RouteLocation } from 'vue-router'
import { constRoutes, asyncRoutes } from '@/router/routes'
import router from '@/router'

// 检查路由所需权限
function hasPermission(
  userPermissions: string[],
  route: RouteRecordRaw
): boolean {
  if (route.meta && route.meta.permissions)
    return userPermissions.some((permission) =>
      route.meta?.permissions?.includes(permission)
    )
  return true
}

// 根据权限过滤动态路由
function filterAsyncRoutes(
  asyncRoutes: RouteRecordRaw[],
  userPermissions: string[]
): RouteRecordRaw[] {
  const filteredRoutes: RouteRecordRaw[] = []

  asyncRoutes.forEach((asyncRoute) => {
    const clonedRoute: RouteRecordRaw = { ...asyncRoute }
    if (hasPermission(userPermissions, clonedRoute)) {
      if (clonedRoute.children) {
        clonedRoute.children = filterAsyncRoutes(
          clonedRoute.children,
          userPermissions
        )
      }
      filteredRoutes.push(clonedRoute)
    }
  })

  return filteredRoutes
}

// 筛选出用作导航菜单的路由
function filterMenuRoutes(accessRoutes: RouteRecordRaw[]): RouteLocation[] {
  return accessRoutes.flatMap((accessRoute) => {
    if (accessRoute.name && accessRoute.meta?.isNavMenu) {
      return [router.resolve(accessRoute)]
    } else if (accessRoute.children) {
      return filterMenuRoutes(accessRoute.children)
    }
    return []
  })
}

export const useDynamicRoute = defineStore('dynamicRoute', () => {
  const accessRoutes = shallowRef<RouteRecordRaw[]>(constRoutes)
  const isGeneratedRoutes = ref<boolean>(false) //  flag，标识是否已经生成动态路由

  const menuRoutes = computed(() => filterMenuRoutes(accessRoutes.value))

  function generatedRoutes(userPermissions: string[]) {
    const filteredRoutes = filterAsyncRoutes(asyncRoutes, userPermissions)
    accessRoutes.value = accessRoutes.value.concat(filteredRoutes)
    return filteredRoutes
  }

  function setFlag4GenRoutes(flag: boolean) {
    isGeneratedRoutes.value = flag
  }

  function resetAccessRoutes() {
    accessRoutes.value = constRoutes
  }

  return {
    accessRoutes,
    isGeneratedRoutes,
    menuRoutes,
    generatedRoutes,
    setFlag4GenRoutes,
    resetAccessRoutes,
  }
})
