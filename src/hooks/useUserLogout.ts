import { createDiscreteApi } from 'naive-ui'
import { useRouteStore, useUserStore, useAppStore } from '@/store'
import router, { resetRouter } from '@/router'

export function useUserLogout() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  // 脱离 setup 上下文使用 message
  const { message: messageCtx } = createDiscreteApi(['message'])

  const logout = () => {
    userStore.logout()
    appStore.resetSettings()
    routeStore.resetUserRoutes()
    resetRouter()
    messageCtx.success('已退出登录！')
    router.push({ name: 'Auth' })
  }
  return {
    logout,
  }
}
