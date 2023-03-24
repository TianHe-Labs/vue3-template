import type { Router } from 'vue-router'
import { useUserStore, useRouteStore } from '@/store'
import { getToken } from '@/utils/token'
import { DEFAULT_ROUTE_NAME } from '@/router/constants'

export function createAccessGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const { userInfo, getUserInfo, signOut } = useUserStore()
    const { generateRoutes } = useRouteStore()
    const token = getToken()
    if (token) {
      if (userInfo.roles && userInfo.roles?.length) {
        if (to.name === 'Auth') next({ name: DEFAULT_ROUTE_NAME })
        else next()
      } else {
        try {
          // 获取用户信息（role）
          await getUserInfo()
          // 根据用户权限，动态生成路由
          const addRoutes = generateRoutes(userInfo.roles as string[])
          // 将生成的需要权限认证的路由，添加到路由表中
          addRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // 路由表更新后，跳转目标路由
          // 生成了新的路由列表
          // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html

          next({ ...to, replace: true })
        } catch (err) {
          // getUserInfo 等存在异常，退出登录
          await signOut()
          next({
            name: 'Auth',
            query: { redirect: to.path, ...to.query },
          })
        }
      }
    } else {
      if (to.name === 'Auth') {
        next()
      } else {
        next({
          name: 'Auth',
          query: { redirect: to.path, ...to.query },
        })
      }
    }
  })
}
