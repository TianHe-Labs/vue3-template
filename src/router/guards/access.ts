import type { Router } from 'vue-router'
import { useStore } from '@/store'

export function createAccessGuard(router: Router) {
  const { auth, dynRoute } = useStore()
  router.beforeEach(async (to, from, next) => {
    const token = auth.userToken?.access_token
    if (token) {
      if (dynRoute.isGeneratedRoutes) {
        if (to.name === 'Auth') return
        else next()
      } else {
        // 根据用户权限，动态生成路由
        const userPermissions = auth.userInfo?.permissions as string[]
        const filteredRoutes = dynRoute.generatedRoutes(userPermissions)
        // 将生成的需要权限认证的路由，添加到路由表中
        filteredRoutes.forEach((filteredRoute) =>
          router.addRoute(filteredRoute)
        )
        // 设置动态路由已经生成的标识
        dynRoute.setFlag4GenRoutes(true)
        // 路由表更新后，跳转目标路由
        next({ ...to, replace: true }) //  生成了新的路由列表，因此需要 replace
      }
    } else {
      if (to.name === 'Auth') next()
      else next({ name: 'Auth', query: { redirect: to.path } })
    }
  })
}
