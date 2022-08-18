import router from './index'
import { useUserAuth } from '@/store/modules/useUserAuth'
import { useDynamicRoute } from '@/store/modules/useDynRoute'

export function createNaviGuards() {
  const userAuthStore = useUserAuth()
  const dynamicRouteStore = useDynamicRoute()
  router.beforeEach(async (to, from, next) => {
    // 更新 title
    const subtitle = to.meta.title
    document.title = `${subtitle}丨${import.meta.env.VITE_APP_NAME}`
    // 权限验证
    const token = userAuthStore.userToken?.access_token
    if (token) {
      if (dynamicRouteStore.isGeneratedRoutes) {
        if (to.name === 'Auth') return
        else next()
      } else {
        // 根据用户权限，动态生成路由
        const userPermissions = userAuthStore.userInfo?.permissions as string[]
        const filteredRoutes =
          dynamicRouteStore.generatedRoutes(userPermissions)
        // 将生成的需要权限认证的路由，添加到路由表中
        filteredRoutes.forEach((filteredRoute) =>
          router.addRoute(filteredRoute)
        )
        // 设置动态路由已经生成的标识
        dynamicRouteStore.setFlag4GenRoutes(true)
        // 路由表更新后，跳转目标路由
        next({ ...to, replace: true }) //  生成了新的路由列表，因此需要 replace
      }
    } else {
      if (to.name === 'Auth') next()
      else next({ name: 'Auth', query: { redirect: to.path } })
    }
  })
}
