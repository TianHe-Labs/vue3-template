import { useMessage } from 'naive-ui'
import { useRouteStore, useUserStore, useAppStore } from '@/store'
import { resetRouter } from '@/router'

export function useUserLogout() {
  const router = useRouter()
  const userStore = useUserStore()
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const messageCtx = useMessage()

  const logout = () => {
    userStore.logout()
    appStore.resetSettings()
    routeStore.resetUserRoutes()
    resetRouter()
    router.push({ name: 'Auth' })
    messageCtx.success('已退出登录！')
  }

  return {
    logout,
  }
}
