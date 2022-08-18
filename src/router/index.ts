import { createRouter, createWebHistory } from 'vue-router'
import { constRoutes } from './routes'

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes: constRoutes,
})

// createNaviGuards(router)

export default router
