import { useRouteStore, useUserStore, useAppStore } from '@/store'
import router, { resetRouter } from '@/router'

export function useUserLogout() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const routeStore = useRouteStore()

  const logout = () => {
    userStore.logout()
    appStore.resetSettings()
    routeStore.resetUserRoutes()
    resetRouter()
    router.push({ name: 'Auth' })
  }
  return {
    logout,
  }
}
