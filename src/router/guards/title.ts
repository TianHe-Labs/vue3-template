import type { Router } from 'vue-router'
import { useAppStore } from '@/store'

export function createTitleGuard(router: Router) {
  router.beforeEach(async (to) => {
    const appStore = useAppStore()
    // 更新 title
    const subtitle = to.meta.title
    if (subtitle) {
      document.title = `${subtitle}丨${appStore.name}`
    }
  })
}
