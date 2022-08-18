import router from './index'

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
