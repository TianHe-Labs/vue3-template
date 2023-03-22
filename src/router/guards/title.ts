import type { Router } from 'vue-router'

export function createTitleGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 更新 title
    const subtitle = to.meta.title
    if (subtitle) {
      document.title = `${subtitle}丨${document.title}`
    }
  })
}
