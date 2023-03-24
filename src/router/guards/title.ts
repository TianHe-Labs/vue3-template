import type { Router } from 'vue-router'
import { useAppStore } from '@/store'

export function createTitleGuard(router: Router) {
  router.beforeEach(async (to) => {
    const { appMeta } = useAppStore()
    // 更新 title
    const subtitle = to.meta.title
    if (subtitle) {
      document.title = `${subtitle}丨${appMeta.name}`
    }
  })
}
