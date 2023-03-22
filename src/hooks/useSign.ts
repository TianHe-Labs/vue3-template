import { useMessage } from 'naive-ui'
import { useRouteStore, useUserStore } from '@/store'
import { resetRouter } from '@/router'

export function useSign() {
  const router = useRouter()
  const userStore = useUserStore()
  const routeStore = useRouteStore()
  const messageCtx = useMessage()

  const signOut = () => {
    userStore.signOut()
    routeStore.resetRoutes()
    resetRouter()
    router.push({ name: 'Auth' })
    messageCtx.success('已注销登录！')
  }

  return {
    signOut,
  }
}
