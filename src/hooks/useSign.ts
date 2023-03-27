import { useMessage } from 'naive-ui'
import { useRouteStore, useUserStore, useAppStore } from '@/store'
import { resetRouter } from '@/router'

export function useSign() {
  const router = useRouter()
  const userStore = useUserStore()
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const messageCtx = useMessage()

  const signOut = () => {
    userStore.signOut()
    appStore.resetSettings()
    routeStore.resetRoutes()
    resetRouter()
    router.push({ name: 'Auth' })
    messageCtx.success('已退出登录！')
  }

  return {
    signOut,
  }
}
