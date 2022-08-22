import type { App } from 'vue'
import useAuthStore from './modules/auth'
import useRouteStore from './modules/route'

export const store = createPinia()

// pinia 需要先挂载，才能使用
// （分模块 install，不进行全局 install）

export function setupStore(app: App) {
  app.use(store)
}

export const useStore = () => ({
  auth: useAuthStore(),
  dynRoute: useRouteStore(),
})
