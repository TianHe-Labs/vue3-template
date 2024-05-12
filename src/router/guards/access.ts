import type { Router } from 'vue-router'
import { useUserStore, useRouteStore } from '@/store'
import { DEFAULT_ROUTE_NAME } from '@/router/constants'

export function createAccessGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const userStore = useUserStore()
    const routeStore = useRouteStore()
    if (userStore.accessToken) {
      if (userStore.role) {
        if (to.name === 'Auth') next({ name: DEFAULT_ROUTE_NAME })
        else next()
      } else {
        try {
          // 获取用户信息（role）
          await userStore.queryUserInfo()
          // 根据用户权限，动态生成路由
          const addRoutes = routeStore.generateRoutes(
            userStore.role as unknown as RoleEnum
          )
          // 将生成的需要权限认证的路由，添加到路由表中
          addRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // 路由表更新后，跳转目标路由
          // 生成了新的路由列表
          // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html

          next({ ...to, replace: true })
        } catch (err) {
          // queryUserInfo 等存在异常，退出登录
          await userStore.logout()
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
