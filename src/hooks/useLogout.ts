import { useRouteStore, useUserStore, useAppStore } from '@/store'
import router, { resetRouter } from '@/router'

export function useLogout() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const routeStore = useRouteStore()

  const logout = (logoutTo?: string) => {
    userStore.logout()
    appStore.resetSettings()
    routeStore.resetUserRoutes()
    resetRouter()
    const currentRoute = router.currentRoute.value
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'Auth',
      query: {
        ...currentRoute.query,
        redirect: currentRoute.path as string,
      },
    })
  }
  return {
    logout,
  }
}
