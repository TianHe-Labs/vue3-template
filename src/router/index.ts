import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { constRoutes } from './routes'
import { setupRouterGuards } from './guards'

export const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constRoutes,
})

// createNaviGuards(router)

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuards(router)
}

// https://github.com/vuejs/router/issues/1237#issuecomment-990748872
// https://router.vuejs.org/guide/advanced/dynamic-routing.html#removing-routes
// 清除“动态路由”，如退出登录时
export function resetRouter() {
  const routes = router.getRoutes()
  routes.forEach((routeItem) => {
    if (routeItem.meta.permissions && routeItem.meta.permissions.length) {
      if (routeItem.name) router.removeRoute(routeItem.name)
      else {
        // Note that addRoute() returns a method to remove that route
        const removeRoute = router.addRoute(routeItem)
        removeRoute() // 删除路由如果存在的话
      }
    }
  })
}
